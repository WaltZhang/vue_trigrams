<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title class="headline" v-if="connector.id === null"
              >New Connector</v-card-title
            >
            <v-card-title class="headline" v-if="connector.id !== null"
              >Edit Connector</v-card-title
            >
            <v-card-title class="subhead" v-if="connectorTested">
              <span class="green--text" v-if="testResult"
                >Connector check OK</span
              >
              <span class="red--text" v-if="!testResult"
                >Connector check failed</span
              >
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-text-field
                      label="Connector name*"
                      :rules="[rules.required]"
                      v-model="connector.connector_name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-select
                      v-model="connector.database_type_id"
                      label="Database Type"
                      :rules="[rules.required]"
                      :items="drivers"
                      item-text="database_type"
                      item-value="id"
                    ></v-select>
                  </v-flex>
                  <v-flex class="xs12 md4">
                    <v-text-field
                      label="Host"
                      v-model="connector.host"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="xs12 md4">
                    <v-text-field
                      label="Port"
                      v-model="connector.port"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="xs12 md4">
                    <v-text-field
                      label="Database"
                      v-model="connector.database"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="xs12 md6">
                    <v-text-field
                      label="User"
                      v-model="connector.username"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="xs12 md6">
                    <v-text-field
                      label="Password"
                      v-model="connector.password"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="warning draken-1" flat @click="testConnector"
                >Test Connector</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="
                  connectorTested = false;
                  `${$emit('show-connector-dlg', false)}`;
                "
                >Cancel</v-btn
              >
              <v-btn color="green darken-1" flat @click="addOrUpdateConnector"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connectorTested: false,
      testResult: false,
      rules: {
        required: v => !!v || "Required"
      }
    };
  },
  props: {
    dialog: Boolean,
    drivers: Array,
    connector: Object
  },
  methods: {
    async addOrUpdateConnector() {
      if (this.connector.id !== null) {
        await this.$store.dispatch("updateConnector", {
          id: this.connector.id,
          connector_name: this.connector.connector_name,
          host: this.connector.host,
          port: this.connector.port,
          database: this.connector.database,
          username: this.connector.username,
          password: this.connector.password,
          database_type_id: this.connector.database_type_id
        });
      } else {
        await this.$store.dispatch("addConnector", {
          connector_name: this.connector.connector_name,
          host: this.connector.host,
          port: this.connector.port,
          database: this.connector.database,
          username: this.connector.username,
          password: this.connector.password,
          database_type_id: this.connector.database_type_id
        });
      }
      this.$store.dispatch("getConnectors");
      this.connectorTested = false;
      this.$emit("show-connector-dlg", false);
    },
    async testConnector() {
      let url = "";
      let theme = this.getDatabaseTheme(this.connector.database_type_id);
      if (this.connector.host) {
        if (this.connector.username)
          url = `${theme}://${this.connector.username}:${
            this.connector.password
          }@${this.connector.host}:${this.connector.port}/${
            this.connector.database
          }`;
        else
          url = `${theme}://${this.connector.username}:${
            this.connector.password
          }@${this.connector.host}:${this.port}/${this.connector.database}`;
      } else {
        url = `${theme}:///${this.connector.database}`;
      }
      await fetch(`${this.$store.state.backend_root_url}/connectors/test/`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${this.$store.state.token}`
        }),
        body: `{
            "url": "${url}"
          }`
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == 200) {
            this.testResult = true;
          } else {
            this.testResult = false;
          }
        })
        .catch(error => console.error(error));
      this.connectorTested = true;
    },
    getDatabaseTheme(id) {
      for (let i in this.drivers) {
        if (this.drivers[i].id == id) {
          return this.drivers[i].database_theme;
        }
      }
    }
  }
};
</script>
