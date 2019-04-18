import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    username: 'vineckb',
    repository: 'citartech-frontend',
    issues: [],
    issue: {},
  },

  mutations,
  actions,
});
