<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs10>
          <v-text-field
            label="data set name"
            v-model="dataSetName"
          ></v-text-field>
          <v-btn small dark>Create</v-btn>
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
        :disabled="dataSetName === null"
      >
        Finish
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    dataSetName: String
  },
  method: {
    finishDataSet() {
      this.finalizedDataSet();
      this.$emit("close-add-data-set-dlg");
    },
    finalizedDataSet() {
      fetch(
        `${this.$store.state.backend_root_url}/datasets/api/v1/${
          this.dataSetName
        }/`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `token ${this.$store.state.token}`
          }),
          body: `{
            "display_name": "${this.dataSetName}"
          }`
        }
      ).catch(error => console.error(error));
    }
  }
};
</script>
