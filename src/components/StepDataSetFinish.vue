<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            label="data set name"
            v-model="displayName"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn color="warning" flat @click="`${$emit('close-add-data-set-dlg')}`">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="green" flat @click="`${$emit('step-by-step', -1)}`">
        Back
      </v-btn>
      <v-btn
        color="green"
        depressed
        @click="finishDataSet"
        :disabled="displayName === null || displayName === ''"
      >
        Finish
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      displayName: null
    };
  },
  props: {
    dataSetName: String
  },
  methods: {
    async finishDataSet() {
      await this.finalizedDataSet();
      this.$emit("close-add-data-set-dlg");
    },
    async finalizedDataSet() {
      await fetch(
        `${this.$store.state.backend_root_url}/datasets/api/v1/${
          this.dataSetName
        }/finalize/`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `token ${this.$store.state.token}`
          }),
          body: `{
            "display_name": "${this.displayName}"
          }`
        }
      ).catch(error => console.error(error));
    },
    previousPage() {
      this.displayName = null;
      this.$emit("step-by-step", -1);
    },
    cancelDlg() {
      this.displayName = null;
      this.$emit("close-add-data-set-dlg");
    }
  }
};
</script>
