<template>
  <div>
    <page-title text="Game" class="mt-3"></page-title>



    <div class="row" v-if="!loading && !(home && away)">
      <div class="col">
        <b-form-group id="home" label="Home:" label-for="home">
          <b-form-select v-model="home" :options="topTeamsOptions" required/>
        </b-form-group>
      </div>
      <div class="col">
        <b-form-group id="away" label="Away:" label-for="away">
          <b-form-select v-model="away" :options="topTeamsOptions" required/>
        </b-form-group>
      </div>
    </div>


    <div v-else-if="homeTopTeam && awayTopTeam" class="text-center">
      <div class="row mt-5">
        <div class="col">
          <h1>{{ home.substr(0, 6) }} [{{ homeTopTeam.topTeam.teamAverageFloored }}]</h1>
        </div>
        <div class="col">
          <h1>VS</h1>
        </div>
        <div class="col">
          <h1>{{away.substr(0, 6) }} [{{ awayTopTeam.topTeam.teamAverageFloored }}]</h1>
        </div>
      </div>

      <div class="row mt-5" v-if="homeStats && awayStats">
        <div class="col"><h1>{{ homeStats.goals }}</h1></div>
        <div class="col">
          <h1>{{ currentMin }}</h1>
        </div>
        <div class="col"><h1>{{ awayStats.goals }}</h1></div>
      </div>


      <div class="row mt-5" v-if="homeStats && awayStats">
        <div class="col">
          <div v-for="evt in homeStats.majorEvents" class="text-left ml-5">
            <span v-if="evt.eventType === 'goal'">⚽</span>
            <span v-if="evt.eventType === 'yellow'">🧽</span>
            
            {{ evt.time }}. {{ evt.fullName }}
          </div>
        </div>
        <div class="col">

        </div>
        <div class="col">
          <div v-for="evt in awayStats.majorEvents" class="text-left ml-5">
            <span v-if="evt.eventType === 'goal'">⚽</span>
            <span v-if="evt.eventType === 'yellow'">🧽</span>

            {{ evt.time }}. {{ evt.fullName }}
          </div>
        </div>
      </div>

    </div>

    <b-button variant="outline-primary" @click="start" v-else>Start</b-button>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import PageTitle from '../components/PageTitle';
  import { dotDotDotAccount, waitForMillis } from '../utils';
  import _ from 'lodash';
  import NiftyFootballEngine from '../utils/NiftyFootballEngine';

  export default {
    name: 'game',
    components: {PageTitle},
    mixins: [],
    data() {
      return {
        topTeams: [],
        topTeamsOptions: [],
        loading: false,
        home: null,
        homeTopTeam: null,
        away: null,
        awayTopTeam: null,
        homeStats: null,
        awayStats: null,
        currentMin: 0,
        engine: new NiftyFootballEngine(),
      };
    },
    computed: {
      ...mapState([
        'cardsApiService',
      ]),
    },
    methods: {
      loadTopTeams() {
        this.loading = true;
        this.cardsApiService.loadLeagueTable()
          .then(async (teams) => {
            this.topTeams = teams.results.topTeams;
            this.topTeamsOptions = teams.results.topTeams.map((t) => {
              return {value: t.owner, text: `${dotDotDotAccount(t.owner)} [${t.topTeamAverageFloored}]`};
            });
          })
          .finally(() => {
            this.loading = false;
          });
      },
      async start() {
        this.homeTopTeam = await this.cardsApiService.loadTopTeam(this.home);
        this.awayTopTeam = await this.cardsApiService.loadTopTeam(this.away);

        const HOME = 1;
        const AWAY = 2;
        const DRAW = 3;
        const TOTAL_ITERATIONS = 90 + _.random(2, 7);

        this.engine.init(this.homeTopTeam.topTeam, this.awayTopTeam.topTeam);

        for (; this.currentMin < TOTAL_ITERATIONS; this.currentMin++) {
          const homeAttackFormation = this.engine.attackFormation(HOME);
          const homeDefenceFormation = this.engine.defenceFormation(HOME);

          const awayAttackFormation = this.engine.attackFormation(AWAY);
          const awayDefenceFormation = this.engine.defenceFormation(AWAY);

          this.engine.attack(homeAttackFormation, awayDefenceFormation, HOME, this.currentMin);

          this.engine.attack(awayAttackFormation, homeDefenceFormation, AWAY, this.currentMin);

          this.homeStats = this.engine.getHomeStats();
          this.awayStats = this.engine.getAwayStats();

          await waitForMillis(200);
        }
      }
    },
    async created() {
      this.$store.watch(
        () => this.cardsApiService.network,
        () => this.loadTopTeams()
      );

      if (this.cardsApiService.network) {
        this.loadTopTeams();
      }
    },
  };
</script>
