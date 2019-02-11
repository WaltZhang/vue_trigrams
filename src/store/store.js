import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: ""
  },
  // getter: {
  //   updatedToken(state) {
  //     return state.token;
  //   }
  // },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token;
    }
  }
});
