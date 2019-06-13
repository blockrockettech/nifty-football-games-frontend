<template>
  <div class="row">
    <div class="col">
      <page-title text="Nifty Sheild"></page-title>
      <div v-if="loading" class="text-muted">
        Firing up the engines...
      </div>
      <div v-else>
        <div class="row bg-light">
          <div class="col-6 p-4 text-center mb-5" v-for="g in competition.games">
            <div class="row">
              <div class="col-8">
                <div class="text-blue-sm">
                  {{ g.home.substr(0, 6) + '...' }}
                </div>
                <div class="text-orange-md">
                  {{ lookupName(g.home) }}
                </div>
              </div>
              <div class="col-4">
                <span v-if="statsArray" class="text-purple-lg ml-5">{{ goals(g.game).homeGoals }}</span>

                <div v-if="g.result && g.result.result && g.result.result === 'home-pens'">
                  * WINS BY PENS
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="text-blue-sm mt-3">
                  {{ g.away.substr(0, 6) + '...' }}
                </div>
                <div class="text-orange-md">
                  {{ lookupName(g.away) }}
                </div>
              </div>
              <div class="col-4">
                <span v-if="statsArray" class="text-purple-lg ml-5">{{ goals(g.game).awayGoals }}</span>

                <div v-if="g.result && g.result.result && g.result.result === 'away-pens'" class="small crackerjack text-right">
                  * WINS BY PENS
                </div>
              </div>
            </div>
            <router-link class="small" v-if="g.result" :to="{name: 'game', params: {compId: competition.id, gameId: g.game }, props: {competition: competition}}">
              View match
            </router-link>
          </div>
        </div>
        <div class="row bg-dark text-centered">
          <div class="col">

          </div>
          <div class="col">

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
    name: 'home',
    components: {PageTitle},
    mixins: [Vue2Filters.mixin],
    data() {
      return {
        loading: true,
        competition: null,
        statsArray: null,
        vidiprinter: [],
      };
    },
    computed: {
      ...mapState([
        'cardsApiService',
        'lookup'
      ]),
    },
    methods: {
      loadComp() {
        this.loading = true;
        const compId = '57cfbcd0-8d46-11e9-b7b0-3da076de716d';
        this.cardsApiService.loadCompetition(compId)
          .then(async (competition) => {
            this.competition = competition;

            const roundId = 1;
            let gamesInRound = _.filter(_.values(competition.games), (g) => parseInt(g.round) === parseInt(roundId));
            return Promise.all(_.map(gamesInRound, (g) => this.cardsApiService.loadStats(compId, g.game)));
          })
          .then(async (statsArray) => {
            this.statsArray = statsArray;

          })
          .finally(() => {
            this.loading = false;
          });
      },
      lookupName(address) {
        const pair = _.find(this.lookup, (p) => p.address.toLowerCase() === address.toLowerCase());
        if (pair) {
          return pair.name;
        }

        return '';
      },
      goals(gameId) {
        if (this.statsArray) {
          const gameStats = _.find(this.statsArray, (v, k) => k === gameId);
          if (gameStats && gameStats.homeStats && gameStats.awayStats) {
            const homeGoalsArray = _.filter(gameStats.homeStats.majorEvents, (e) => e.eventType === 'goal');
            const awayGoalsArray = _.filter(gameStats.awayStats.majorEvents, (e) => e.eventType === 'goal');

            return {homeGoals: homeGoalsArray.length, awayGoals: awayGoalsArray.length};
          }
        }

        return {homeGoals: null, awayGoals: null};
      },
    },
    async created() {
      this.$store.watch(
        () => this.cardsApiService.network,
        () => this.loadComp()
      );

      if (this.cardsApiService.network) {
        this.loadComp();
      }
    },
  };
</script>
