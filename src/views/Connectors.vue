<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex class="ma-3" xs12>
        <connector-toolbar></connector-toolbar>
      </v-flex>
    </v-layout>
    <v-card flat v-for="connector in connectors" :key="connector.id">
      <v-layout row wrap>
        <v-flex xs62 sm4 md2>
          <div class="caption grey--text">Connector Title</div>
          <div>{{ connector.connector_name }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Connector Type</div>
          <div>{{ connector.database_type }}</div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">Connection URL</div>
          <div>
            {{ connector.host }}:{{ connector.port }}/{{ connector.database }}
          </div>
        </v-flex>
        <v-flex xs2 sm4 md2>
          <div class="caption grey--text">Connection User</div>
          <div>{{ connector.username }}</div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import ConnectorToolbar from "@/components/ConnectorsToolbar";

export default {
  computed: {
    connectors: function() {
      return this.$store.state.connectors;
    }
  },
  methods: {
    getConnectors() {
      this.$store.dispatch("getConnectors");
    }
  },
  components: {
    "connector-toolbar": ConnectorToolbar
  },
  mounted() {
    this.getConnectors();
  }
};
</script>
