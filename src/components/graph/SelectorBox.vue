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
      let graphString =
        '{"nodes":{"1":{"id":1,"title":"Read","inputs":0,"outputs":1,"draggable":false,"boxType":"box1","properties":{"name":""},"x":527,"y":184}},"edges":{}}'; //'{"nodes":{"1":{"id":1,"title":"Read","inputs":0,"outputs":1,"draggable":false,"boxType":"box1","properties":{"name":""},"x":207,"y":185},"2":{"id":2,"title":"Merge","inputs":2,"outputs":1,"draggable":false,"boxType":"box2","properties":{"leftKey":"","rightKey":"","mergeMethod":""},"x":529,"y":329},"3":{"id":3,"title":"Read","inputs":0,"outputs":1,"draggable":false,"boxType":"box1","properties":{"name":""},"x":444,"y":127},"4":{"id":4,"title":"Merge","inputs":2,"outputs":1,"draggable":false,"boxType":"box2","properties":{"leftKey":"","rightKey":"","mergeMethod":""},"x":662,"y":54},"5":{"id":5,"title":"Write","inputs":1,"outputs":0,"draggable":false,"boxType":"box7","properties":{"name":""},"x":800,"y":329}},"edges":{"1":{"sourceId":"1","targetId":"2","drawn":true},"2":{"sourceId":"2","targetId":"5","drawn":true},"3":{"sourceId":"3","targetId":"4","drawn":true}}}'
      let graphData = JSON.parse(graphString);
      this.$store.commit("updateNodeId", 1);
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

      console.log(JSON.stringify(graphData));
    },
    addRead: function(event) {
      let node = {
        id: this.$store.getters.getNodeId,
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
        id: this.$store.getters.getNodeId,
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
        id: this.$store.getters.getNodeId,
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
/* .box1, .box2, .box3, .box4, .box5, .box6, .box7 {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  cursor: pointer;
}
.box1 {
  background: blueviolet;
}
.box2 {
  background: cadetblue;
}
.box3 {
  background: lightsalmon;
}
.box4 {
  background: rgb(137, 16, 148);
}
.box5 {
  background: darkgreen;
}
.box6 {
  background: lightgreen;
}
.box7 {
  background: rgb(235, 144, 238);
} */
</style>
