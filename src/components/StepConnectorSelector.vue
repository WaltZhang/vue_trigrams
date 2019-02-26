<template>
  <v-stepper-content step="step">
    <v-card>
      <v-card-text>
        <v-layout row wrap v-for="connector in connectors" :key="connector.id">
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Title</div>
            <span>{{ connector.connector_name }}</span>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="dialog = false"
          >Cancel</v-btn
        >
        <v-btn color="indigo darken-1" dark depressed @click="nextStep"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-stepper-content>
</template>

<script>
export default {
  props: {
    step: Number
  },
  computed: {
    connectors() {
      return this.$store.state.connectors;
    }
  },
  async mounted() {
    await this.$store.dispatch("getConnectors");
  },
  methods: {
    nextStep() {
      console.log("current step:" + this.step);
      this.$emit("update:step", this.step + 1);
    }
  }
};
</script>
