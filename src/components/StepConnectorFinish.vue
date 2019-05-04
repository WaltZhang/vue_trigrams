<template>
  <v-card>
    <v-card-actions>
      <v-btn color="warning" flat @click="`${$emit('close-add-data-set-dlg')}`"
        >Cancel</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn color="green" flat @click="`${$emit('step-by-step', -1)}`"
        >Back</v-btn
      >
      <v-btn
        color="green"
        depressed
        @click="`${$emit('step-by-step', 1)}`"
        :disabled="selectedConnector === null"
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
  }
};
</script>
