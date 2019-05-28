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
  },
  mutations: {},
  actions: {}
});
