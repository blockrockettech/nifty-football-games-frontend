<template>
  <div>
    <div v-if="loading">Loading...</div>

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
    <div v-else-if="!homeTopTeam && !awayTopTeam && home && away" class="text-center">
      <b-button variant="outline-primary" @click="start">Start</b-button>
    </div>

    <div v-if="home && away" class="text-center scoreboard-box m-5">

      <div class="row mt-5">
        <div class="col">
          <div class="text-white">HOME</div>
          <div class="text-orange-lg mt-3">{{ home.substr(0, 6) }}</div>
          <div v-if="homeTopTeam" class="text-white">{{ homeTopTeam.topTeam.teamAverageFloored }}</div>
        </div>
        <div class="col text-white-lg">
          <img alt="Nifty Football" src="../assets/logo.svg" style="max-width: 100px" class="mt-3">
        </div>
        <div class="col">
          <div class="text-white">AWAY</div>
          <div class="text-orange-lg mt-3">{{away.substr(0, 6) }}</div>
          <div v-if="awayTopTeam" class="text-white">{{ awayTopTeam.topTeam.teamAverageFloored }}</div>
        </div>
      </div>

      <div class="row mt-5" v-if="homeStats && awayStats">
        <div class="col text-lime-xl">
          <span class="bg-dark pl-5 pr-5">{{ homeStats.goals }}</span>
        </div>
        <div class="col text-lime-lg">

          <div v-if="!complete">{{ currentMin }}</div>
          <div v-else>RESULT</div>
        </div>
        <div class="col text-lime-xl">
          <span class="bg-dark pl-5 pr-5">{{ awayStats.goals }}</span>
        </div>
      </div>

      <div class="row mt-5 mb-5" v-if="homeStats && awayStats">
        <div class="col">
          <div v-for="evt in homeStats.majorEvents" class="text-left ml-5">
            <span v-if="evt.eventType === 'goal'">⚽</span>
            <span v-if="evt.eventType === 'yellow'">🧽</span>

            {{ evt.time }}. {{ evt.fullName }}
          </div>
        </div>
        <div class="col text-blue-md">
          <div class="row">
            <div class="col">{{ filterBy(homeStats.minorEvents, 'shot', 'eventType').length }}</div>
            <div class="col">Shots</div>
            <div class="col">{{ filterBy(awayStats.minorEvents, 'shot', 'eventType').length }}</div>
          </div>
          <div class="row">
            <div class="col">{{ filterBy(homeStats.minorEvents, 'corner', 'eventType').length }}</div>
            <div class="col">Corners</div>
            <div class="col">{{ filterBy(awayStats.minorEvents, 'corner', 'eventType').length }}</div>
          </div>
          <div class="row">
            <div class="col">{{ filterBy(homeStats.majorEvents, 'yellow', 'eventType').length }}</div>
            <div class="col">Yellows</div>
            <div class="col">{{ filterBy(awayStats.majorEvents, 'yellow', 'eventType').length }}</div>
          </div>
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
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import PageTitle from '../components/PageTitle';
  import { dotDotDotAccount, waitForMillis } from '../utils';
  import _ from 'lodash';
  import Vue2Filters from 'vue2-filters';

  export default {
    name: 'game',
    mixins: [Vue2Filters.mixin],
    components: {PageTitle},
    data() {
      return {
        topTeams: [],
        topTeamsOptions: [],
        loading: false,
        complete: false,
        home: null,
        homeTopTeam: null,
        away: null,
        awayTopTeam: null,
        homeStats: null,
        awayStats: null,
        currentMin: 0,
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
        this.loading = true;
        this.homeTopTeam = await this.cardsApiService.loadTopTeam(this.home);
        this.awayTopTeam = await this.cardsApiService.loadTopTeam(this.away);

        this.loading = false;

        this.complete = true;
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
