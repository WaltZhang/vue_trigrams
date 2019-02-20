<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title class="headline">New Connector</v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-text-field
                      label="Connector name*"
                      :rules="[rules.required]"
                      v-model="connector_name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-select
                      v-model="database_type"
                      label="Database Type"
                      :rules="[rules.required]"
                      :items="drivers"
                      item-text="database_type"
                      item-value="id"
                    ></v-select>
                  </v-flex>
                  <v-flex class="xs12 md4">
                    <v-text-field label="Host" v-model="host"></v-text-field>
                  </v-flex>
                  <v-flex class="xs12 md4">
                    <v-text-field label="Port" v-model="port"></v-text-field>
                  </v-flex>
                  <v-flex class="xs12 md4">
                    <v-text-field
                      label="Database"
                      v-model="database"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="xs12 md6">
                    <v-text-field
                      label="User"
                      v-model="username"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="xs12 md6">
                    <v-text-field
                      label="Password"
                      v-model="password"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false"
                >Cancel</v-btn
              >
              <v-btn color="green darken-1" flat="flat" @click="addConnector"
                >Create</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      fab: false,
      rules: {
        required: v => !!v || "Required"
      },
      connector_name: "",
      host: "",
      port: "",
      username: "",
      password: "",
      database: "",
      database_type: 0
    };
  },
  props: {
    drivers: Array
  },
  methods: {
    async addConnector() {
      await this.$store.dispatch("addConnector", {
        connector_name: this.connector_name,
        host: this.host,
        port: this.port,
        database: this.database,
        username: this.username,
        password: this.password,
        database_type: this.database_type
      });
      console.log("Waiting adding connector.");
      this.$store.dispatch("getConnectors");
      this.dialog = false;
    }
  }
};
</script>
