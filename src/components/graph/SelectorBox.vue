<template>
  <div class="selectors">
    <v-btn small @click="load">load</v-btn>
    <v-btn small @click="dump">dump</v-btn>
    <v-btn class="mx-2" icon large color="primary" @click="addRead">Read</v-btn>
    <v-btn class="mx-2" icon large color="warning" @click="addMerge"
      >Merge</v-btn
    >
    <v-btn class="mx-2" icon large color="error" @click="addWrite">Write</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    load() {
      let graphString = '{"nodes":{"3":{"title":"Read","inputs":0,"outputs":1,"draggable":false,"boxType":"box1","properties":{"name":""},"id":3,"x":158,"y":220},"4":{"title":"Merge","inputs":2,"outputs":1,"draggable":false,"boxType":"box2","properties":{"leftKey":"","rightKey":"","mergeMethod":""},"id":4,"x":396,"y":217},"5":{"title":"Write","inputs":1,"outputs":0,"draggable":false,"boxType":"box7","properties":{"name":""},"id":5,"x":684,"y":304},"7":{"title":"Read","inputs":0,"outputs":1,"draggable":false,"boxType":"box1","properties":{"name":""},"id":7,"x":1001,"y":258},"8":{"title":"Merge","inputs":2,"outputs":1,"draggable":false,"boxType":"box2","properties":{"leftKey":"","rightKey":"","mergeMethod":""},"id":8,"x":1192,"y":34},"9":{"title":"Write","inputs":1,"outputs":0,"draggable":false,"boxType":"box7","properties":{"name":""},"id":9,"x":1301,"y":239},"10":{"title":"Read","inputs":0,"outputs":1,"draggable":false,"boxType":"box1","properties":{"name":""},"id":10,"x":128,"y":22},"11":{"title":"Merge","inputs":2,"outputs":1,"draggable":false,"boxType":"box2","properties":{"leftKey":"","rightKey":"","mergeMethod":""},"id":11,"x":562,"y":11},"12":{"title":"Read","inputs":0,"outputs":1,"draggable":false,"boxType":"box1","properties":{"name":""},"id":12,"x":874,"y":12}},"edges":{"3":{"sourceId":"3","targetId":"4","drawn":true},"4":{"sourceId":"4","targetId":"5","drawn":true},"7":{"sourceId":"7","targetId":"8","drawn":true},"8":{"sourceId":"8","targetId":"9","drawn":true},"10":{"sourceId":"10","targetId":"11","drawn":true},"12":{"sourceId":"12","targetId":"8","drawn":true}},"nodeId":13}';
      let graphData = JSON.parse(graphString);
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
    dump() {
      let coordinates = [];
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
      graphData['nodeId'] = this.$store.getters.nodeId

      console.log(JSON.stringify(graphData));
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
