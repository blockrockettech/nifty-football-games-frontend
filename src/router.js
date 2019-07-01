import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Comp from './views/Comp.vue';
import Game from './views/Game.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/comp/:compId',
      name: 'comp',
      component: Comp,
    },
    {
      path: '/game/:compId/:gameId',
      name: 'game',
      component: Game,
    },
  ]
});
