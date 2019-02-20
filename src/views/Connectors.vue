<template>
  <v-container>
    <v-layout row wrap class="my-5">
      <v-flex class="ma-3" xs12>
        <connector-toolbar :drivers="drivers"></connector-toolbar>
      </v-flex>
    </v-layout>
    <v-card flat v-for="connector in connectors" :key="connector.id">
      <v-layout row wrap :class="`pa-3 connector ${connector.database_type}`">
        <v-flex xs62 sm4 md2>
          <div class="caption grey--text">Title</div>
          <div>{{ connector.connector_name }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Database</div>
          <div>{{ connector.database_type }}</div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">URL</div>
          <div>
            {{ connector.host }}:{{ connector.port }}/{{ connector.database }}
          </div>
        </v-flex>
        <v-flex xs2 sm4 md2>
          <div class="caption grey--text">User</div>
          <div>{{ connector.username }}</div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import ConnectorToolbar from "@/components/ConnectorsToolbar";

export default {
  data() {
    return {
      drivers: [],
      connectors: []
    };
  },
  watch: {
    allConnectors: function() {
      this.connectors = [];
      for (let i in this.allConnectors) {
        this.connectors.push({
          connector_name: this.allConnectors[i].connector_name,
          host: this.allConnectors[i].host,
          port: this.allConnectors[i].port,
          username: this.allConnectors[i].username,
          database: this.allConnectors[i].datatbase,
          database_type: this.getDatabaseType(
            this.allConnectors[i].database_type
          )
        });
      }
      return this.connectors;
    }
  },
  computed: {
    allConnectors() {
      return this.$store.state.connectors;
    }
  },
  methods: {
    getDatabaseType(database_id) {
      console.log(this.drivers);
      for (let i in this.drivers) {
        if (this.drivers[i].id === database_id) {
          return this.drivers[i].database_type;
        }
      }
    }
    // async getConnectors() {
    //   await this.$store.dispatch("getConnectors");
    // }
  },
  async created() {
    await this.$store.dispatch("getConnectors");
    await fetch(`${this.$store.state.backend_root_url}/drivers/api/v1/`, {
      method: "GET",
      headers: new Headers({
        Authorization: `token ${this.$store.state.token}`
      })
    })
      .then(response => response.json())
      .then(drivers => (this.drivers = drivers))
      .catch(error => console.error(error));
  },
  components: {
    "connector-toolbar": ConnectorToolbar
  }
};
</script>

<style>
.connector.redshift {
  border-left: 4px solid #3cd1c2;
}
.connector.mysql {
  border-left: 4px solid orange;
}
.connector.oracle {
  border-left: 4px solid tomato;
}
</style>
