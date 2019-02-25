<template>
  <v-container>
    <v-layout row wrap class="my-5">
      <v-flex class="ma-3" xs12>
        <connector-toolbar
          :drivers="drivers"
          :connector="instance"
          :dialog="showConnector"
          @show-connector-dlg="showDlg"
        ></connector-toolbar>
      </v-flex>
    </v-layout>
    <v-card flat v-for="connector in connectors" :key="connector.id">
      <v-layout row wrap :class="`pa-3 connector ${connector.database_type}`">
        <v-flex xs62 sm4 md2>
          <div class="caption grey--text">Title</div>
          <span>{{ connector.connector_name }}</span>
        </v-flex>
        <v-flex xs6 sm6 md2>
          <div class="caption grey--text">Database</div>
          <span>{{ connector.database_type }}</span>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">URL</div>
          <span>
            {{ connector.username }}@{{ connector.host }}:{{
              connector.port
            }}/{{ connector.database }}
          </span>
        </v-flex>
        <v-flex xs2 sm2 md2>
          <!-- <div class="caption grey--text">Edit</div> -->
          <div>
            <v-btn
              class="primary darken-1"
              depressed
              fab
              small
              @click="editConnector(`${connector.id}`)"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              class="error darken-1"
              depressed
              fab
              small
              @click="showDelete = true"
            >
              <v-icon>delete</v-icon>
              <v-dialog v-model="showDelete" max-width="200">
                <v-card>
                  <v-card-text
                    >Do you want to delete this connector?</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      flat
                      @click="showDelete = false"
                      >No</v-btn
                    >
                    <v-btn
                      color="green darken-1"
                      flat
                      @click="deleteConnector(`${connector.id}`)"
                      >Yes</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<script>
import ConnectorToolbar from "@/components/ConnectorsToolbar";

export default {
  data() {
    return {
      showConnector: false,
      showDelete: false,
      instance: {
        id: null,
        connector_name: "",
        host: "",
        port: null,
        username: "",
        database: "",
        database_type: 0
      },
      drivers: [],
      connectors: []
    };
  },
  watch: {
    allConnectors: function() {
      this.connectors = [];
      for (let i in this.allConnectors) {
        this.connectors.push({
          id: this.allConnectors[i].id,
          connector_name: this.allConnectors[i].connector_name,
          host: this.allConnectors[i].host,
          port: this.allConnectors[i].port,
          username: this.allConnectors[i].username,
          database: this.allConnectors[i].database,
          database_type: this.getDatabaseType(
            this.allConnectors[i].database_type
          )
        });
      }
      return this.connectors;
    },
    drivers: function() {
      this.connectors = [];
      for (let i in this.allConnectors) {
        this.connectors.push({
          id: this.allConnectors[i].id,
          connector_name: this.allConnectors[i].connector_name,
          host: this.allConnectors[i].host,
          port: this.allConnectors[i].port,
          username: this.allConnectors[i].username,
          database: this.allConnectors[i].database,
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
      for (let i in this.drivers) {
        if (this.drivers[i].id === database_id) {
          return this.drivers[i].database_type;
        }
      }
    },
    editConnector(id) {
      for (let i in this.allConnectors) {
        if (this.allConnectors[i].id == id) {
          this.instance.id = id;
          this.instance.connector_name = this.allConnectors[i].connector_name;
          this.instance.host = this.allConnectors[i].host;
          this.instance.port = this.allConnectors[i].port;
          this.instance.username = this.allConnectors[i].username;
          this.instance.database = this.allConnectors[i].database;
          this.instance.database_type = this.allConnectors[i].database_type;
        }
        this.showDlg(true);
      }
    },
    showDlg(show) {
      this.showConnector = show;
    },
    async deleteConnector(id) {
      await this.$store.dispatch("deleteConnector", {
        id: id
      });
      this.$store.dispatch("getConnectors");
      this.showDelete = false;
    }
  },
  created() {
    this.$store.dispatch("getConnectors");
    fetch(`${this.$store.state.backend_root_url}/drivers/api/v1/`, {
      method: "GET",
      headers: new Headers({
        Authorization: `token ${this.$store.state.token}`
      })
    })
      .then(response => response.json())
      .then(drivers => {
        this.drivers = drivers;
      })
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
