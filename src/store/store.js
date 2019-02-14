import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    backend_root_url: "http://localhost:8000",
    token: localStorage.getItem("access_token") || null,
    username: localStorage.getItem("username") || null,
    users: []
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
    },
    getUsers(state) {
      fetch(`${state.backend_root_url}/accounts/api/v1/`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${state.token}`
        })
      })
        .then(response => response.json())
        .then(data => {
          state.users = data;
        })
        .catch(error => console.error(error));
    },
    addUser(state, payload) {
      fetch(`${state.backend_root_url}/accounts/api/v1/`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${state.token}`
        }),
        body: `{
          "user": {
            "username": "${payload.username}",
            "password": "${payload.password}",
            "email": "${payload.email}",
          },
          "phone": ${payload.phone},
          "city": "${payload.city}"
        }`
      }).catch(error => console.error("User adding failed", error));
    }
  }
});
