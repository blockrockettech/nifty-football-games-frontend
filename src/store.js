import Vue from 'vue';
import Vuex from 'vuex';
import CardsApiService from './services/api/cardsApi.service';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: debug ? [createLogger()] : [],
  state: {
    networkId: 1,
    networkName: null,

    // API Services
    cardsApiService: new CardsApiService(),

    compId: null,
    competition: null,
    statsArray: null,

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
  },
  mutations: {
    setCompetition(state, competition) {
      state.competition = competition;
    },
    setStatsArray(state, statsArray) {
      state.statsArray = statsArray;
    },
  },
  actions: {
    async bootstrap({commit, dispatch, state}, compId) {
      console.log(`bootstrapping`, compId);

      state.compId = compId;

      if (!state.competition || state.competition.id !== state.compId) {
        commit('setCompetition', await state.cardsApiService.loadCompetition(state.compId));
        commit('setStatsArray', await state.cardsApiService.loadAllStats(state.compId));
      }
    },
  }
});
