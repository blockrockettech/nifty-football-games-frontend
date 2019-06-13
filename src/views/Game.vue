<template>
  <div>
    <router-link to="/" class="crackerjack text-left">&lt; HOME</router-link>

    <div v-if="loading">Loading...</div>

    <div v-if="game" class="text-center scoreboard-box ml-5 mr-5">

      <div class="row mt-5">
        <div class="col">
          <div class="text-white">HOME</div>
          <div class="text-orange-lg mt-3">{{ game.home.substr(0, 6) }}</div>
          <div class="text-orange-lg mt-3">{{ lookupName(game.home) }}</div>
        </div>
        <div class="col text-white-lg">
          <img alt="Nifty Football" src="../assets/logo.svg" style="max-width: 100px" class="mt-3">
        </div>
        <div class="col">
          <div class="text-white">AWAY</div>
          <div class="text-orange-lg mt-3">{{game.away.substr(0, 6) }}</div>
          <div class="text-orange-lg mt-3">{{ lookupName(game.away) }}</div>
        </div>
      </div>

      <div class="row mt-5" v-if="stats">
        <div class="col text-lime-xl">
          <span class="bg-dark pl-5 pr-5">{{ filterBy(stats.homeStats.majorEvents, 'goal', 'eventType').length }}</span>
        </div>
        <div class="col text-lime-lg">
          <div v-if="!complete">{{ currentMin }}</div>
          <div v-else>RESULT</div>
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
        loading: false,
        complete: true,
        homeTeam: null,
        awayTeam: null,
        currentMin: 0,
        competition: null,
        stats: null,
        game: null,
      };
    },
    computed: {
      ...mapState([
        'cardsApiService',
        'lookup',
      ]),
    },
    methods: {
      loadTeamsAndStats() {
        this.loading = true;

        this.cardsApiService.loadCompetition(this.$route.params.compId)
          .then(async (competition) => {
            this.competition = competition;
            this.game = _.find(competition.games, (g) => parseInt(g.game) === parseInt(this.$route.params.gameId));
            return this.cardsApiService.loadStats(this.$route.params.compId, this.$route.params.gameId);
          })
          .then(async (stats) => {
            this.stats = stats;
            return this.cardsApiService.loadTopTeam(this.game.home);
          })
          .then(async (home) => {
            this.homeTeam = home;
            return this.cardsApiService.loadTopTeam(this.game.away);
          })
          .then(async (away) => {
            this.awayTeam = away;
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
    },
    async created() {
      this.$store.watch(
        () => this.cardsApiService.network,
        () => this.loadTeamsAndStats()
      );

      if (this.cardsApiService.network) {
        this.loadTeamsAndStats();
      }
    },
  };
</script>
