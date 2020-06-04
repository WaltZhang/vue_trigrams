<template>
  <div class="selectors">
    <v-btn small @click="load(4)">load</v-btn>
    <v-btn small @click="saveGraph">dump</v-btn>
    <v-btn small @click="runGraph">run</v-btn>
    <v-btn class="mx-2" icon large color="primary" @click="addRead">Read</v-btn>
    <v-btn class="mx-2" icon large color="warning" @click="addMerge"
      >Merge</v-btn
    >
    <v-btn class="mx-2" icon large color="error" @click="addWrite">Write</v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    async load(id) {
      let response = await axios(
        `${this.$store.state.backend_root_url}/graphs/api/v1/${id}`,
        {
          method: "GET",
          headers: { Authorization: `token ${this.$store.state.token}` }
        }
      ).catch(error => console.log(error));
      let graphData = JSON.parse(response.data.definition);
      this.$store.commit("updateNodeId", graphData.nodeId);
      for (let [id, node] of Object.entries(graphData.nodes)) {
        this.$store.commit("addNode", node);
      }
      for (let [sourceId, edge] of Object.entries(graphData.edges)) {
        this.$store.commit("addEdge", {
          sourceId: sourceId,
          targetId: edge.targetId,
          drawn: false
        });
      }
    },
    _dumpGraph() {
      let graphEl = document.querySelector("#graph");
      for (let child of graphEl.children) {
        if (child.id !== "") {
          let el = document.getElementById(child.id);
          this.$store.commit("addNodeCoordinates", {
            id: child.id,
            x: el.offsetLeft,
            y: el.offsetTop
          });
        }
      }
      let graphData = JSON.parse(JSON.stringify(this.$store.state.graph));
      Object.values(graphData.nodes).forEach(n => (n.draggable = false));
      graphData["nodeId"] = this.$store.getters.nodeId;
      return graphData;
    },
    saveGraph() {
      let graphData = this._dumpGraph();
      axios(`${this.$store.state.backend_root_url}/graphs/api/v1/`, {
        method: "POST",
        headers: { Authorization: `token ${this.$store.state.token}` },
        data: {
          definition: JSON.stringify(graphData)
        }
      })
        .then(response => console.log(response))
        .catch(error => console.error(error));
    },
    runGraph() {
      let graphData = this._dumpGraph();
      axios(`${this.$store.state.backend_root_url}/graphs/run/`, {
        method: "POST",
        headers: { Authorization: `token ${this.$store.state.token}` },
        data: {
          definition: JSON.stringify(graphData)
        }
      })
        .then(response => console.log(response.data.definition))
        .catch(error => console.error(error));
    },
    addRead: function(event) {
      let node = {
        title: "Read",
        inputs: 0,
        outputs: 1,
        draggable: false,
        boxType: "box1",
        properties: {
          name: ""
        }
      };
      this.$store.commit("addNode", node);
    },
    addMerge: function(event) {
      let node = {
        title: "Merge",
        inputs: 2,
        outputs: 1,
        draggable: false,
        boxType: "box2",
        properties: {
          leftKey: "",
          rightKey: "",
          mergeMethod: ""
        }
      };
      this.$store.commit("addNode", node);
    },
    addWrite: function(event) {
      let node = {
        title: "Write",
        inputs: 1,
        outputs: 0,
        draggable: false,
        boxType: "box7",
        properties: {
          name: ""
        }
      };
      this.$store.commit("addNode", node);
    }
  }
};
</script>

<style scoped>
.selectors {
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  background: grey;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 0.5em;
  justify-items: center;
  align-items: center;
}
</style>
