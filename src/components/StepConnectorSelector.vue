<template>
  <v-card>
    <v-card-text>
      <v-radio-group v-model="connectorGroup">
        <v-layout row wrap v-for="connector in connectors" :key="connector.id">
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Title</div>
            <span>{{ connector.connector_name }}</span>
          </v-flex>
        </v-layout>
      </v-radio-group>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
      <v-btn color="indigo darken-1" dark depressed @click="nextStep">OK</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      connectorGroup: 1
    };
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
      this.$emit("update-step");
    }
  }
};
</script>
