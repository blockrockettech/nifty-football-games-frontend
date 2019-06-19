<template>
  <div class="row">
    <div class="col">
      <page-title :text="competition.name" v-if="competition"></page-title>
      <div v-if="!competition && !statsArray" class="text-muted">
        There are people on the pitch...
      </div>
      <div v-else>
        <div class="row scoreboard-box ml-5 mr-5 mb-5">
          <div class="row">
            <div class="col text-right text-white-md">
              MINS: {{ competition.roundClock }}
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-6 p-4 text-center mb-5" v-for="g in games()">
              <div class="row">
                <div class="col-8 text-left">
                  <span class="text-orange-md">{{ lookupName(g.home) }}</span>
                  <span class="small text-muted ml-2">
                    <a :href="`https://niftyfootball.cards/team/${g.home}`" target="_blank">{{ g.home.substr(0, 6) + '...' }}</a>
                  </span>
                </div>
                <div class="col-4">
                  <div v-if="statsArray" class="bg-dark pl-5 pr-5 text-lime-md">{{ goals(g.game).homeGoals }}</div>

                  <!--<div v-if="g.result && g.result.result && g.result.result === 'home-pens'">-->
                  <!--* WINS BY PENS-->
                  <!--</div>-->
                </div>
              </div>
              <div class="row">
                <div class="col-8 text-left">
                  <span class="text-orange-md">{{ lookupName(g.away) }}</span>
                  <span class="small text-muted ml-2">
                  <a :href="`https://niftyfootball.cards/team/${g.away}`" target="_blank">{{ g.away.substr(0, 6) + '...' }}</a>
                </span>
                </div>
                <div class="col-4">
                  <div v-if="statsArray" class="bg-dark pl-5 pr-5 text-lime-md">{{ goals(g.game).awayGoals }}</div>

                  <!--<div v-if="g.result && g.result.result && g.result.result === 'away-pens'" class="small crackerjack text-right">-->
                  <!--* WINS BY PENS-->
                  <!--</div>-->
                </div>
              </div>
              <div class="row text-right">
                <div class="col-12">
                  <router-link class="small" v-if="g.result" :to="{name: 'game', params: {compId: competition.id, gameId: g.game }}">
                    View match
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import PageTitle from '../components/PageTitle';
  import _ from 'lodash';
  import Vue2Filters from 'vue2-filters';

  export default {
    name: 'comp',
    components: {PageTitle},
    mixins: [Vue2Filters.mixin],
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'cardsApiService',
        'lookup',
        'competition',
        'statsArray',
      ]),
    },
    methods: {
      lookupName(address) {
        const pair = _.find(this.lookup, (p, k) => p.address.toLowerCase() === address.toLowerCase());
        if (pair) {
          return pair.name;
        }

        return '';
      },
      goals(gameId) {
        if (this.statsArray) {
          const gameStats = this.statsArray[gameId];
          if (gameStats && gameStats.homeStats && gameStats.awayStats) {
            const homeGoalsArray = _.filter(gameStats.homeStats.majorEvents, (e) => e.eventType === 'goal');
            const awayGoalsArray = _.filter(gameStats.awayStats.majorEvents, (e) => e.eventType === 'goal');

            return {homeGoals: homeGoalsArray.length, awayGoals: awayGoalsArray.length};
          }
        }

        return {homeGoals: null, awayGoals: null};
      },

      games(round) {
        if (this.competition) {
          return _.filter(this.competition.games, (g) => g.round === 2);
        }

        return [];
      },
    },
    async created() {
      this.$store.dispatch('bootstrap', this.$route.params.compId);
    },
  };
</script>
