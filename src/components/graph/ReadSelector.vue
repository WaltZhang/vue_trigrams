<template>
  <div class="selector" :class="boxStyle">
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      title: "Read",
      inputs: 1,
      properties: { "source name": null },
      nextpoint: null,
      boxStyle: "box1"
    };
  }
};
</script>

<style scoped>
.box1 {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  cursor: pointer;
  position: absolute;
}
.box1 {
  background: blueviolet;
}
</style>
