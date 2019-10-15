import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Comp from './views/Comp';
import Game from './views/Game';
import Vidiprinter from './views/Vidiprinter';

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
      path: '/vidiprinter/:compId',
      name: 'vidiprinter',
      component: Vidiprinter,
    },
    {
      path: '/game/:compId/:gameId',
      name: 'game',
      component: Game,
    },
    {
      path: '/game/:compId/:gameId',
      name: 'game',
      component: Game,
    },
  ]
});
