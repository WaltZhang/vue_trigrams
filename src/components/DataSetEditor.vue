<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-dialog v-model="show" persistent max-width="1030px">
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
              <connector-selector
                :selectedConnector="selectedConnectorId"
                @select-connector="selectConnector"
                @step-by-step="stepByStep"
                @close-add-data-set-dlg="closeAddDataSetDlg"
              ></connector-selector>
            </v-stepper-content>
            <v-stepper-content step="2">
              <connector-query
                :selectedConnector="selectedConnectorId"
                @step-by-step="stepByStep"
                @close-add-data-set-dlg="closeAddDataSetDlg"
              ></connector-query>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import ConnectorSelector from "@/components/StepConnectorSelector";
import ConnectorQuery from "@/components/StepConnectorQuery";

export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      step: 1,
      connectors: this.$store.state.connectors,
      selectedConnectorId: null,
      dataset: null
    };
  },
  components: {
    "connector-selector": ConnectorSelector,
    "connector-query": ConnectorQuery
  },
  methods: {
    selectConnector(id) {
      this.selectedConnectorId = id;
    },
    closeAddDataSetDlg() {
      this.step = 1;
      this.selectedConnectorId = null;
      this.$emit("show-data-set", false);
    },
    stepByStep(step) {
      this.step += step;
      if (this.step < 1) this.step = 1;
    }
  }
};
</script>
