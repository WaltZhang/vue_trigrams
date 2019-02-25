<template>
  <v-container>
    <v-layout row wrap class="my-5">
      <v-flex class="ma-3" xs12>
        <dataset-toolbar></dataset-toolbar>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="my-5">
      <v-flex class="ma-3" xs12></v-flex>
      <v-card v-for="dataset in datasets" :key="dataset.id"></v-card>
    </v-layout>
  </v-container>
</template>

<script>
import DatasetToolbar from "@/components/DatasetsToolbar";

export default {
  data() {
    return {
      datasets: this.$store.state.datasets
    };
  },
  components: {
    "dataset-toolbar": DatasetToolbar
  }
};
</script>
