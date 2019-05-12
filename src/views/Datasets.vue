<template>
  <v-container>
    <v-layout row wrap class="my-5">
      <v-flex class="ma-3" xs12>
        <data-set-editor
          :show="dlgShow"
          @show-data-set="showDataSet"
        ></data-set-editor>
        <v-card>
          <v-speed-dial
            right
            absolute
            v-model="fab"
            direction="left"
            transition="slide-y-reverse-transition"
          >
            <v-btn
              slot="activator"
              v-model="fab"
              color="blue darken-2"
              dark
              fab
            >
              <v-icon>settings</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn color="green" dark fab @click="addDataSet">
              <v-icon>add</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="my-5">
      <v-flex
        class="ma-3"
        xs12
        sm6
        md4
        xl3
        v-for="dataset in datasets"
        :key="dataset.id"
      >
        <v-card>
          <v-card-title>
            <i class="material-icons fa4 ">
              insert_chart
            </i>
          </v-card-title>
          <v-card-text class="headline">
            {{ dataset.display_name }}
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-icon left>calendar_today</v-icon>
            <span class="font-weight-thin">
              Created: {{ dataset.timestamp }}
            </span>
            <v-spacer></v-spacer>
            <v-btn
              small
              flat
              icon
              color="pink"
              @click="deleteDataSet(`${dataset.id}`)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DataSetEditor from "@/components/DataSetEditor";

export default {
  data() {
    return {
      fab: false,
      dlgShow: false
    };
  },
  mounted() {
    this.$store.dispatch("getDataSets");
  },
  computed: {
    datasets() {
      return this.$store.state.datasets;
    }
  },
  components: {
    "data-set-editor": DataSetEditor
  },
  methods: {
    addDataSet() {
      this.showDataSet(true);
    },
    showDataSet(show) {
      this.dlgShow = show;
    }
  }
};
</script>
