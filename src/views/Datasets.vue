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
        :key="dataset.data_set_name"
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
              @click="showDeleteDialog(`${dataset.data_set_name}`)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
            <v-dialog v-model="showDelete" max-width="200">
              <v-card>
                <v-card-text>
                  Do you want to delete this data set?
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="green darken-1"
                    flat
                    @click="showDelete = false"
                  >
                    No
                  </v-btn>
                  <v-btn color="green darken-1" flat @click="deleteDataSet">
                    Yes
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
      dlgShow: false,
      showDelete: false,
      toDeletedId: -1
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
    },
    showDeleteDialog(id) {
      this.toDeletedId = id;
      this.showDelete = true;
    },
    async deleteDataSet() {
      if (this.toDeletedId != -1) {
        await fetch(
          `${this.$store.state.backend_root_url}/datasets/api/v1/${
            this.toDeletedId
          }/`,
          {
            method: "DELETE",
            headers: new Headers({
              Authorization: `token ${this.$store.state.token}`
            })
          }
        ).catch(error => console.error(error));
        this.$store.dispatch("getDataSets");
        this.showDelete = false;
      }
    }
  }
};
</script>
