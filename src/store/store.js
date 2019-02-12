import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    backend_root_url: "http://localhost:8000",
    token: localStorage.getItem("access_token") || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    }
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token;
      localStorage.setItem("access_token", payload.token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("access_token");
    }
  }
});
