<template>
  <div class="row">
    <div class="col">
      <page-title text="Nifty Sheild"></page-title>
      <!--<router-link to="/game">Game</router-link>-->

      <div v-if="loading" class="text-muted">
        Firing up the engines...
      </div>
      <div v-else class="row bg-light">
        <div class="col-6 p-4 text-center" v-for="g in competition.games">
          <div class="text-purple-lg">#{{ g.game + 1}}</div>
          <div class="text-blue-sm mt-3">
            {{ g.home.substr(0, 12) + '...' }}
          </div>
          <div class="text-orange-md">
            {{ lookupName(g.home) }}
          </div>
          <div class="text-purple-md mt-3">VS</div>
          <div class="text-blue-sm mt-3">
            {{ g.away.substr(0, 12) + '...' }}
          </div>
          <div class="text-orange-md">
            {{ lookupName(g.away) }}
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
        lookup: [
          {
            name: 'Xcopy',
            address: '0x3768225622d53FfCc1E00eaC53a2A870ECd825C8'
          },
          {
            name: 'Tonys Tigers',
            address: '0x4cEBaEDCa2570c18520D7383f25700D278C35978'
          },
          {
            name: 'YNWA',
            address: '0x3a22282CBd2715E9D302B4A4AB0D6a117D8438B6'
          },
          {
            name: 'Lightning',
            address: '0xc9d60680b0945587f78543ff1ff14b49ec41cf16'
          },
          {
            name: '@artonymousartifakt',
            address: '0x77350E1152eFD5F2D807A6124015c629a907155E',
          },
          {
            name: 'Athletico Brad',
            address: '0xd7E1bc51cd3F30e21b17Bab33D77078E3fB7cC26',
          },
          {
            name: 'D AFC',
            address: '0x70bD3045414eBcBAE77EF84505BC6eA6AF48E672',
          },
          {
            name: '---LuckyJackStuds---',
            address: '0x41b888be6e9dCCF4316dF7454176F75b72F640dE',
          },
        ],
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
        () => this.loadComp()
      );

      if (this.cardsApiService.network) {
        this.loadComp();
      }
    },
  };
</script>
