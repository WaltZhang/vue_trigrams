import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    backend_root_url: "http://localhost:8000",
    token: localStorage.getItem("access_token") || null,
    username: localStorage.getItem("username") || null,
    users: [],
    connectors: [],
    datasets: []
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    allUsers(state) {
      return state.users;
    }
  },
  mutations: {
    setLoggedUser(state, payload) {
      state.token = payload.token;
      state.username = payload.username;
      localStorage.setItem("access_token", payload.token);
      localStorage.setItem("username", payload.username);
    },
    clearLoggedUser(state) {
      state.token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
    }
  },
  actions: {
    getUsers(context) {
      fetch(`${context.state.backend_root_url}/accounts/api/v1/`, {
        method: "GET",
        headers: new Headers({
          Authorization: `token ${context.state.token}`
        })
      })
        .then(response => response.json())
        .then(data => {
          context.state.users = data;
        })
        .catch(error => console.error(error));
    },
    toggleUserActive(context, payload) {
      fetch(
        `${context.state.backend_root_url}/accounts/api/v1/${
          payload.user_id
        }/active/`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `token ${context.state.token}`
          }),
          body: `{
            "is_active": "${payload.active}"
          }`
        }
      ).catch(error => console.error("User adding failed", error));
    },
    getConnectors(context) {
      fetch(`${context.state.backend_root_url}/connectors/compact/api/v1/`, {
        method: "GET",
        headers: new Headers({
          Authorization: `token ${context.state.token}`
        })
      })
        .then(response => response.json())
        .then(data => {
          context.state.connectors = data;
        })
        .catch(error => console.error(error));
    },
    getDataSets(context) {
      fetch(`${context.state.backend_root_url}/datasets/api/v1/`, {
        method: "GET",
        headers: new Headers({
          Authorization: `token ${context.state.token}`
        })
      })
        .then(response => response.json())
        .then(data => {
          context.state.datasets = data;
        })
        .catch(error => console.error(error));
    }
  }
});
