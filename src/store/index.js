import Vue from 'vue';
import Vuex from 'vuex';
import { autoRequireModule, createPersistedstate } from '~/assets/js/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedstate()],
  modules: autoRequireModule()
});
