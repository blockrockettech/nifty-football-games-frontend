<template>
  <div class="row">
    <div class="col">
      <page-title text="Nifty Sheild"></page-title>
      <!--<router-link to="/game">Game</router-link>-->

      <div v-if="loading" class="text-muted">
        Firing up the engines...
      </div>
      <div v-else class="row">
        <div class="col-6 p-4 text-center" v-for="g in competition.games">
            <div class="">GAME {{ g.game + 1}}</div>
            <div class="text-blue-md">{{ g.home.substr(0, 8) + '...' }}</div>
            <div class="">VS</div>
            <div class="text-purple-md">{{ g.away.substr(0, 8) + '...' }}</div>
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
      };
    },
    computed: {
      ...mapState([
        'cardsApiService',
      ]),
    },
    methods: {
      loadComp() {
        this.loading = true;
        this.cardsApiService.loadCompetition('57cfbcd0-8d46-11e9-b7b0-3da076de716d')
          .then(async (competition) => {
            this.competition = competition;
          })
          .finally(() => {
            this.loading = false;
          });
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
