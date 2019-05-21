import Vue from 'vue';
import Router from 'vue-router';
import Init from './views/Init.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'init',
      component: Init,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
    {
      path: '/keys',
      name: 'keys',
      component: () => import(/* webpackChunkName: "keys" */ './views/Keys.vue'),
    },
    {
      path: '/known-hosts',
      name: 'known-hosts',
      component: () => import(/* webpackChunkName: "known-hosts" */ './views/KnownHosts.vue'),
    },
    {
      path: '/config',
      name: 'config',
      component: () => import(/* webpackChunkName: "config" */ './views/Config.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
    },
  ],
});
