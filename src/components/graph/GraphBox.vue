<template>
  <v-container class="graph" id="graph">
    <v-card
      class="box"
      :class="node.boxType"
      v-for="node in nodes"
      :key="node.id"
      :id="node.id"
    >
      <v-card-text>
        <h3>{{ node.title }}</h3>
        <!-- <v-btn icon @click="remove(node.id)">
          <v-icon>cancel</v-icon> 
        </v-btn> -->
        <PropertyBox
          :node="node"
          @save="saveProps"
          @remove="remove(node.id)"
        ></PropertyBox>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import PropertyBox from "./PropertyBox";
import { jsPlumb } from "jsplumb";

export default {
  components: {
    PropertyBox
  },
  created() {
    this.plumb = jsPlumb.getInstance();
    this.plumb.importDefaults({
      Connector: ["Flowchart", { cornerRadius: 10 }],
      Anchors: ["Right", "Left"],
      ConnectionOverlays: [["Arrow", { location: 1 }]]
    });

    let vm = this;
    this.plumb.bind("connection", function(info, originalEvent) {
      vm.$store.commit("addEdge", {
        sourceId: info.sourceId,
        targetId: info.targetId,
        drawn: true
      });
    });

    this.plumb.bind("connectionMoved", function(info, originalEvent) {
      vm.$store.commit("removeEdge", { sourceId: info.originalSourceId });
      vm.$store.commit("addEdge", {
        sourceId: info.newSourceId,
        targetId: info.newTargetId,
        drawn: true
      });
    });

    this.plumb.bind("connectionDetached", function(info, originalEvent) {
      vm.$store.commit("removeEdge", { sourceId: info.sourceId });
    });
  },
  computed: {
    nodes() {
      let vm = this;
      this.$nextTick(function() {
        vm.plumb.setContainer(document.querySelector(".graph"));
        for (let [id, node] of Object.entries(vm.$store.state.graph.nodes)) {
          let element = document.getElementById(id);
          if (!node.draggable) {
            vm.plumb.draggable(element);
            vm.$store.commit('setDraggable', node.id)
            if (node.outputs > 0) {
              let endpoint = vm.plumb.addEndpoint(element, {
                isSource: true,
                anchor: "Right"
              });
            }
            if (node.inputs > 0) {
              vm.plumb.makeTarget(element, {
                isTarget: true,
                anchor: "Continuous",
                allowLoopback: false,
                maxConnections: node.inputs
              });
            }
          }
          element.style.left = node.x + "px";
          delete node.x;
          element.style.top = node.y + "px";
          delete node.y;
          vm.plumb.revalidate(element);
        }
        for (let [sourceId, edge] of Object.entries(
          vm.$store.state.graph.edges
        )) {
          if (!edge.drawn) {
            vm.plumb.connect({
              source: sourceId,
              target: edge.targetId
            });
            this.$store.commit("drawEdge", sourceId);
          }
        }
      });
      let arr = Object.values(this.$store.state.graph.nodes);
      return arr;
    }
  },
  data() {
    return {
      plumb: null
    };
  },
  methods: {
    saveProps(payload) {
      this.$store.commit("updateProperties", payload);
    },
    remove(id) {
      this.$nextTick(() => {
        this.plumb.removeAllEndpoints(document.getElementById(id));
        this.plumb.unmanage(id);
      });
      this.$store.commit("removeNode", id);
    }
  }
};
</script>

<style scoped>
.graph {
  /* width: 100%;
  height: 100vh; */
  position: relative;
  border: 0px solid black;
  box-sizing: border-box;
  margin: 0 auto;
}
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
.box {
  width: 150px;
  height: 150px;
  border: 1px solid black;
  cursor: pointer;
  position: absolute;
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
}
</style>
