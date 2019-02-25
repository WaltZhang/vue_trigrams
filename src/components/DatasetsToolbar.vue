<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1"
              >Select Connector</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="step > 2"
              >Query Data</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step step="3">Preview</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-card-text>
                  <v-layout
                    row
                    wrap
                    v-for="connector in connectors"
                    :key="connector.id"
                  >
                    <v-flex xs62 sm4 md2>
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
                  <v-btn color="green darken-1" flat @click="dialog = false"
                    >OK</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-dialog>
    </v-flex>
    <v-card>
      <v-speed-dial
        right
        absolute
        v-model="fab"
        direction="left"
        transition="slide-y-reverse-transition"
      >
        <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
          <v-icon>settings</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn color="green" dark fab @click="dialog = true">
          <v-icon>add</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      dialog: false,
      fab: false,
      connectors: this.$store.state.connectors,
      dataset: null
    };
  },
  async mounted() {
    await this.$store.dispatch("getConnectors");
  }
};
</script>
