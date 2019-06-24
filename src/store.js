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
    round: 4,

    lookup: {
      0: {name: 'Xcopy', address: '0x3768225622d53FfCc1E00eaC53a2A870ECd825C8'},
      1: {name: 'Tonys Tigers', address: '0x4cEBaEDCa2570c18520D7383f25700D278C35978'},
      2: {name: 'YNWA', address: '0x3a22282CBd2715E9D302B4A4AB0D6a117D8438B6'},
      3: {name: 'Greece Lightning', address: '0xc9d60680b0945587f78543ff1ff14b49ec41cf16'},
      4: {name: 'Nifty Mondays', address: '0x77350E1152eFD5F2D807A6124015c629a907155E'},
      5: {name: 'Athletico Damico', address: '0xd7E1bc51cd3F30e21b17Bab33D77078E3fB7cC26'},
      6: {name: 'D AFC', address: '0x70bD3045414eBcBAE77EF84505BC6eA6AF48E672'},
      7: {name: '--- Lucky Jack Studs ---', address: '0x41b888be6e9dCCF4316dF7454176F75b72F640dE'},
      8: {name: 'Flogk3', address: '0xDEC00A8DF45f9cF321636340921d3d9C91d23723'},
      9: {name: 'AFC Fletch', address: '0xb628c8C4F2b3434162a9403d3AbCe35973603a41'},
      10: {name: 'West Virginia', address: '0x9e315E9701908501f6dC68A2af6e28a20C75d970'},
      11: {name: 'Cardano City', address: '0x60D29311fdb1Bf848856cA5CaEdD199cFF4229A8'},
      12: {name: 'United Hale', address: '0xc02E60A6728114F6769FED45dEc52eedd1A67Ebc'},
      13: {name: 'Diamond Dogs', address: '0xFA517d2Db855ff27c3388F5122e3693817A107F4'},
      14: {name: 'ABV', address: '0x30602250c5f1fcbA5407E99B1DFaAB992EA4fFD2'},
      15: {name: 'Akii FC', address: '0xC7391970d642fAf65FAbac8f63b0d41c4481d787'},
    }
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
