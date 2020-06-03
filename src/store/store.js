import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backend_root_url: "http://localhost:8000",
    token: localStorage.getItem("access_token") || null,
    username: localStorage.getItem("username") || null,
    users: [],
    connectors: [],
    datasets: [],
    nodeId: 1,
    graph: {
      nodes: {},
      edges: {}
    }
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    allUsers(state) {
      return state.users;
    },
    nodeId(state) {
      return state.nodeId;
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
    updateNodeId(state, id) {
      state.nodeId = id;
    },
    addNode(state, node) {
      if (typeof node.id === "undefined") {
        node.id = state.nodeId++;
      }
      Vue.set(state.graph.nodes, node.id, node);
    },
    removeNode(state, id) {
      Vue.delete(state.graph.nodes, id);
    },
    setDraggable(state, id) {
      Vue.set(state.graph.nodes[id], "draggable", true);
    },
    addEdge(state, payload) {
      Vue.set(state.graph.edges, payload.sourceId, {
        sourceId: payload.sourceId,
        targetId: payload.targetId,
        drawn: payload.drawn
      });
    },
    removeEdge(state, payload) {
      Vue.delete(state.graph.edges, payload.sourceId);
    },
    drawEdge(state, sourceId) {
      state.graph.edges[sourceId].drawn = true;
    },
    addNodeCoordinates(state, payload) {
      let node = state.graph.nodes[payload.id];
      node["x"] = payload.x;
      node["y"] = payload.y;
    },
    updateProperties(state, payload) {
      state.graph.nodes[payload.id]["properties"] = payload.properties;
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
