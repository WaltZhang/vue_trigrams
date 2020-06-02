<template>
  <v-container fluid class="container" ref="container">
    <SelectorBox></SelectorBox>
    <GraphBox></GraphBox>
  </v-container>
</template>

<script>
import SelectorBox from "@/components/graph/SelectorBox.vue";
import GraphBox from "@/components/graph/GraphBox.vue";

export default {
  name: "Graph",

  components: {
    SelectorBox,
    GraphBox
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.container {
  padding-top: 0;
  padding-bottom: 0;
  /* margin: 0; */
  display: flex;
  height: 100%;
}
</style>
