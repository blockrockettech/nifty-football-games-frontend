<template>
  <div>
    <router-link :to="{name: 'comp', params: {compId:$route.params.compId}}" class="crackerjack text-left mb-3">&lt; Back</router-link>

    <div v-if="loading">Loading...</div>

    <div v-if="game" class="text-center scoreboard-box ml-5 mr-5 mb-5">

      <div class="row mt-5">
        <div class="col">
          <div class="text-white">HOME</div>
          <div class="text-orange-md mt-3">{{ game.home.substr(0, 6) }}</div>
          <div class="text-orange-lg mt-3">{{ lookupName(game.home) }}</div>
        </div>
        <div class="col text-white-lg">
          <!--<img alt="Nifty Football" src="../assets/logo.svg" style="max-width: 100px" class="mt-3">-->
          <div v-if="competition.roundClock < 140">
            {{ competition.roundClock }}
          </div>
        </div>
        <div class="col">
          <div class="text-white">AWAY</div>
          <div class="text-orange-md mt-3">{{game.away.substr(0, 6) }}</div>
          <div class="text-orange-lg mt-3">{{ lookupName(game.away) }}</div>
        </div>
      </div>

      <div class="row mt-5" v-if="stats">
        <div class="col text-lime-xl">
          <span class="bg-dark pl-5 pr-5">{{ filterBy(stats.homeStats.majorEvents, 'goal', 'eventType').length }}</span>
        </div>
        <div class="col text-lime-lg">
          <!--<div v-if="game">{{ game }}</div>-->
        </div>
        <div class="col text-lime-xl">
          <span class="bg-dark pl-5 pr-5">{{ filterBy(stats.awayStats.majorEvents, 'goal', 'eventType').length }}</span>
        </div>
      </div>

      <div class="row mt-5 mb-5" v-if="stats">
        <div class="col">
          <div v-for="evt in stats.homeStats.majorEvents" class="text-left ml-5">
            <span v-if="evt.eventType === 'goal'">⚽</span>
            <span v-if="evt.eventType === 'yellow'">🧽</span>

            {{ evt.time }}. {{ evt.playerFullName }} <span class="small">#{{ evt.tokenId }}</span>
          </div>
        </div>
        <div class="col text-blue-md">
          <div class="row">
            <div class="col">{{ filterBy(stats.homeStats.minorEvents, 'shot', 'eventType').length }}</div>
            <div class="col">Shots</div>
            <div class="col">{{ filterBy(stats.awayStats.minorEvents, 'shot', 'eventType').length }}</div>
          </div>
          <div class="row">
            <div class="col">{{ filterBy(stats.homeStats.minorEvents, 'corner', 'eventType').length }}</div>
            <div class="col">Corners</div>
            <div class="col">{{ filterBy(stats.awayStats.minorEvents, 'corner', 'eventType').length }}</div>
          </div>
          <div class="row">
            <div class="col">{{ filterBy(stats.homeStats.majorEvents, 'yellow', 'eventType').length }}</div>
            <div class="col">Yellows</div>
            <div class="col">{{ filterBy(stats.awayStats.majorEvents, 'yellow', 'eventType').length }}</div>
          </div>
        </div>
        <div class="col">
          <div v-for="evt in stats.awayStats.majorEvents" class="text-left ml-5">
            <span v-if="evt.eventType === 'goal'">⚽</span>
            <span v-if="evt.eventType === 'yellow'">🧽</span>
            {{ evt.time }}. {{ evt.playerFullName }} <span class="small">#{{ evt.tokenId }}</span>
          </div>
        </div>
      </div>

      <div class="row mt-5 mb-5 ml-3 mr-3" v-if="stats">
        <div class="col">
          <h5 class="text-secondary">Home Stats</h5>
          <div class="row" v-for="stat in getAllHomeStats">
            <div class="col-8 text-left text-secondary">{{ stat.time}}. {{ stat.playerFullName}} <span class="small">#{{ stat.tokenId }}</span></div>
            <div class="col-4 small text-secondary"><event-emoji :evt="stat.eventType"></event-emoji></div>
          </div>
        </div>
        <div class="col">
          <h5 class="text-secondary">Away Stats</h5>
          <div class="row" v-for="stat in getAllAwayStats">
            <div class="col-8 text-left text-secondary">{{ stat.time}}. {{ stat.playerFullName}} <span class="small">#{{ stat.tokenId }}</span></div>
            <div class="col-4 small text-secondary"><event-emoji :evt="stat.eventType"></event-emoji></div>
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
  import EventEmoji from '../components/EventEmoji';

  export default {
    name: 'game',
    mixins: [Vue2Filters.mixin],
    components: {EventEmoji, PageTitle},
    data() {
      return {
        loading: false,
        complete: true,
        currentMin: 0,
        game: null,
        stats: null,
      };
    },
    computed: {
      ...mapState([
        'cardsApiService',
        'lookup',
        'competition',
        'statsArray',
      ]),
      getAllHomeStats: function () {
        if (this.stats) {
          return _.concat(this.stats.homeStats.minorEvents, this.stats.homeStats.majorEvents);
        }
      },
      getAllAwayStats: function () {
        if (this.stats) {
          return _.sortBy( _.concat(this.stats.awayStats.minorEvents, this.stats.awayStats.majorEvents), ['time']);
        }
      },
    },
    methods: {
      async setGame() {
        if (this.competition) {
          this.game = _.find(this.competition.games, (g) => parseInt(g.game) === parseInt(this.$route.params.gameId));
        }
      },
      async setStats() {
        if (this.statsArray) {
          this.stats = _.find(this.statsArray, (v, k) => parseInt(k) === parseInt(this.$route.params.gameId));
        }
      },
      lookupName(address) {
        const pair = _.find(this.lookup, (p) => p.address.toLowerCase() === address.toLowerCase());
        if (pair) {
          return pair.name;
        }

        return '';
      },
    },
    async created() {
      this.$store.dispatch('bootstrap', this.$route.params.compId);

      this.$store.watch(
        () => this.competition,
        () => this.setGame()
      );

      if (this.competition) {
        this.setGame();
      }

      this.$store.watch(
        () => this.statsArray,
        () => this.setStats()
      );

      if (this.statsArray) {
        this.setStats();
      }
    },
  };
</script>
