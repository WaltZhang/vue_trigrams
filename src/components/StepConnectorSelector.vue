<template>
  <v-card>
    <v-radio-group :value="selectedConnector">
      <v-data-table :headers="headers" :items="connectors">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.connector_name }}</td>
          <td>{{ props.item.url }}</td>
          <td>
            <v-radio
              :key="props.item.id"
              :value="props.item.id"
              @change="`${$emit('select-connector', props.item.id)}`"
            ></v-radio>
          </td>
        </template>
      </v-data-table>
    </v-radio-group>
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
        >Next</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    selectedConnector: Number
  },
  data() {
    return {
      headers: [
        {
          text: "Connector Title",
          value: "connector_name"
        },
        {
          text: "URL",
          sortable: false,
          value: "url"
        },
        {
          sortable: false
        }
      ],
      allConnectors: this.$store.state.connectors
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
