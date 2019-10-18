<template>
  <div id="outer">

    <!--<pre>{{ statsArray }}</pre>-->

    <div v-if="!competition && !statsArray" class="text-muted">
      There are people on the pitch...
    </div>
    <div v-else class="m-2">
      <div class="row">
        <div class="col-4 pb-4">
          <div class="row bg-dark m-1">
            <div class="col">
              <div class="row">
                <div class="col-12 pt-2 pb-2 text-white-sm bg-black-stripe text-center comp-name">{{ competition.name }}</div>
              </div>
              <div class="row games-list" v-for="(g, i) in games()" @click="setMainGame(i)">
                <div class="col-5 pt-2 pb-2 text-orange-sm text-left team-name">{{ lookupName(g.home) }}</div>
                <div class="col-2 pt-2 pb-2 text-white-sm text-center bg-dark">{{ goals(g.game).homeGoals }} - {{ goals(g.game).awayGoals }}</div>
                <div class="col-5 pt-2 pb-2 text-orange-sm text-right team-name">{{ lookupName(g.away) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 pb-4">
          <div class="row bg-dark m-1">
            <div class="col">
              <div class="row bg-dark">
                <div class="col-3 p-4 text-center bg-lightgray">
                  <img src="../assets/logo.svg"/>
                </div>
                <div class="col">
                  <div class="row">
                    <div class="col-9 text-lime-lg">
                      {{ lookupName(games()[gameIndex].home) }}
                      <div class="row">
                        <div class="col-6 text-white-sm scorer-name" v-for="evt in goalFilter(statsArray[gameIndex].homeStats.majorEvents)">
                          {{ surname(evt.playerFullName) }} <span class="text-orange-sm">{{ evt.time }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-3 bg-black-stripe text-white-lg text-center">
                      {{ goals(games()[gameIndex].game).homeGoals }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row bg-dark">
                <div class="col-3 p-4 text-center bg-lightgray">
                  <img src="../assets/gray_logo.svg"/>
                </div>
                <div class="col">
                  <div class="row">
                    <div class="col-9">
                      <span class="text-blue-lg">{{ lookupName(games()[gameIndex].away) }}</span>
                      <div class="row">
                        <div class="col-6 text-white-sm scorer-name" v-for="evt in goalFilter(statsArray[gameIndex].awayStats.majorEvents)">
                          {{ surname(evt.playerFullName) }} <span class="text-orange-sm">{{ evt.time }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-3 bg-black-stripe text-white-lg text-center">
                      {{ goals(games()[gameIndex].game).awayGoals }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="row bg-dark m-1 pb-4">
            <div class="col">
              <div class="row">
                <div class="col-12 pt-2 pb-2 text-white-sm bg-black-stripe text-center comp-name">Match Stats</div>
              </div>
              <div class="row mt-4">
                <div class="col text-center text-orange-sm">
                  Shots
                </div>
              </div>
              <div class="row">
                <div class="col-2 text-left text-lime-md">
                  2
                </div>
                <div class="col-8 text-right text-lime-md">
                  <div class="row">
                    <div class="col bg-lime">&nbsp;</div>
                    <div class="col bg-blue">&nbsp;</div>
                  </div>
                </div>
                <div class="col-2 text-right text-blue-md">
                  2
                </div>
              </div>
              <div class="row mt-2">
                <div class="col text-center text-orange-sm">
                  Corners
                </div>
              </div>
              <div class="row">
                <div class="col-2 text-left text-lime-md">
                  1
                </div>
                <div class="col-8 text-right text-lime-md">
                  <div class="row">
                    <div class="col-3 bg-lime">&nbsp;</div>
                    <div class="col-9 bg-blue">&nbsp;</div>
                  </div>
                </div>
                <div class="col-2 text-right text-blue-md">
                  3
                </div>
              </div>
              <div class="row mt-2">
                <div class="col text-center text-orange-sm">
                  Yellows
                </div>
              </div>
              <div class="row">
                <div class="col-2 text-left text-lime-md">
                  1
                </div>
                <div class="col-8 text-right text-lime-md">
                  <div class="row">
                    <div class="col-12 bg-lime">&nbsp;</div>
                  </div>
                </div>
                <div class="col-2 text-right text-blue-md">
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" id="bottom">
        <div class="col-4">
          <div class="row bg-dark m-1">
            <div class="col text-center">
              <p class="text-blue-sm">Sponsors</p>
              <img src="../assets/brands/BD_Logo_Full_Smooth_White.png" class="img-fluid p-5" style="max-height: 200px"/>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="row bg-dark m-1">
            <div class="col">
              <div class="row vidi-list" v-for="event in ['GOAL', 'YELLOW', 'GOAL']">
                <div class="col-2 bg-lightgray text-center text-orange-sm">{{ event }}</div>
                <div class="col-8">
                  <span class="text-white-sm mr-3">ATHLETICO DAMICO</span>
                  <span class="text-white-sm mr-3">0</span>
                  <span class="text-white-sm mr-3">WEST VIRGINIA</span>
                  <span class="text-blue-sm mr-3">1</span>
                  <span class="text-blue-sm mr-3">Morgan 12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--<div v-else>-->
    <!--<div class="row scoreboard-box ml-5 mr-5 mb-5">-->
    <!--<div class="col">-->
    <!--<div class="row" v-if="competition.roundClock < 140">-->
    <!--<div class="col text-right text-white-md">-->
    <!--MINS: {{ competition.roundClock }}-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="row">-->
    <!--<div class="col-12 col-sm-6 p-4 text-center mb-5" v-for="g in games()">-->
    <!--<div class="row">-->
    <!--<div class="col-9 text-left">-->
    <!--<span class="text-orange-md">{{ lookupName(g.home) }}</span>-->
    <!--<span class="small text-muted ml-2">-->
    <!--<a :href="`https://niftyfootball.cards/team/${g.home}`" target="_blank">{{ g.home.substr(0, 6) + '...' }}</a>-->
    <!--</span>-->
    <!--<span v-if="competition.roundClock > 139 && g.result && g.result.result && g.result.result === 'home-pens'">-->
    <!--* WIN PENS-->
    <!--</span>-->
    <!--</div>-->
    <!--<div class="col-3">-->
    <!--<div v-if="statsArray" class="bg-dark pl-5 pr-5 text-lime-md">{{ goals(g.game).homeGoals }}</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="row">-->
    <!--<div class="col-9 text-left">-->
    <!--<span class="text-orange-md">{{ lookupName(g.away) }}</span>-->
    <!--<span class="small text-muted ml-2">-->
    <!--<a :href="`https://niftyfootball.cards/team/${g.away}`" target="_blank">{{ g.away.substr(0, 6) + '...' }}</a>-->
    <!--</span>-->
    <!--<span v-if="competition.roundClock > 139 && g.result && g.result.result && g.result.result === 'away-pens'" class="small crackerjack text-right">-->
    <!--* WIN PENS-->
    <!--</span>-->
    <!--</div>-->
    <!--<div class="col-3">-->
    <!--<div v-if="statsArray" class="bg-dark pl-5 pr-5 text-lime-md">{{ goals(g.game).awayGoals }}</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="row text-right">-->
    <!--<div class="col-12">-->
    <!--<router-link class="small" v-if="g.result" :to="{name: 'game', params: {compId: competition.id, gameId: g.game }}">-->
    <!--View match-->
    <!--</router-link>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
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
      return {
        gameIndex: 0,
      };
    },
    computed: {
      ...mapState([
        'cardsApiService',
        'lookup',
        'competition',
        'statsArray',
        'round',
      ]),
    },
    methods: {
      setMainGame(index) {
        console.log('Setting main game index', index);
        this.gameIndex = index;
      },

      lookupName(address) {
        const pair = _.find(this.lookup, (p, k) => p.address.toLowerCase() === address.toLowerCase());
        if (pair) {
          return pair.name;
        }

        return '';
      },

      goalFilter(majorEvents) {
        console.log(majorEvents);
        if (majorEvents) {
          return _.filter(majorEvents, event => event.eventType === 'goal');
        }

        return null;
      },

      surname(fullName) {
        if (fullName) {
          const parts = fullName.trim().split(' ');
          if (parts.length === 2) {
            return parts[1];
          }

          return fullName;
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
          return _.filter(this.competition.games, (g) => g.round === this.round);
        }

        return [];
      },
    },
    async created() {
      this.$store.dispatch('bootstrap', this.$route.params.compId);
    },
  };
</script>

<style lang="scss" scoped>
  @import "../colours";

  #top {
    min-height: 300px;
  }

  #bottom {
    min-height: 300px;
  }

  .team-name, .scorer-name, .comp-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div.games-list:nth-child(odd) {
    background-color: $black-stripe;
  }

  div.games-list:hover {
    background-color: $lime;
    cursor: pointer;
  }

  div.vidi-list:nth-child(odd) {
    background-color: $black-stripe;
  }

  .bg-black-stripe {
    background: $black-stripe;
  }

</style>
