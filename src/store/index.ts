import { RootState } from '@/store/types';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    settings: {
      sshPath: '',
      theme: '',
    },
  },
  getters: {},
  mutations: {
    SET_SETTINGS(state, payload) {
      state.settings = payload;
    },
    SET_SSH_PATH(state, payload) {
      state.settings.sshPath = payload;
    },
    SET_THEME(state, payload) {
      state.settings.theme = payload;
    },
  },
  actions: {
    initSettings({ commit }, payload) {
      commit('SET_SETTINGS', payload);
    },
    updateSSHPath({ commit }, payload) {
      commit('SET_SSH_PATH', payload);
    },
    updateTheme({ commit }, payload) {
      commit('SET_THEME', payload);
    },
  },
});
