<template>
  <v-container>
    <v-layout row wrap class="my-5">
      <v-flex class="ma-3" xs12>
        <connector-editor
          :drivers="drivers"
          :connector="instance"
          :dialog="showConnector"
          @show-connector-dlg="showDlg"
        ></connector-editor>
        <v-card>
          <v-speed-dial
            right
            absolute
            v-model="fab"
            direction="left"
            transition="slide-y-reverse-transition"
          >
            <v-btn
              slot="activator"
              v-model="fab"
              color="blue darken-2"
              dark
              fab
            >
              <v-icon>settings</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn color="green" dark fab @click="addConnector">
              <v-icon>add</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="showDelete" max-width="200">
      <v-card>
        <v-card-text>
          Do you want to delete this connector?
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" flat @click="showDelete = false">
            No
          </v-btn>
          <v-btn color="green darken-1" flat @click="deleteConnector">
            Yes
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card flat v-for="connector in connectors" :key="connector.id">
      <v-layout
        row
        wrap
        :class="`pa-3 connector ${connector.database_type_id}`"
      >
        <v-flex xs2 sm4 md2>
          <div class="caption grey--text">Title</div>
          <span>{{ connector.connector_name }}</span>
        </v-flex>
        <v-flex xs6 sm6 md2>
          <div class="caption grey--text">Database</div>
          <span>{{ connector.database }}</span>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">URL</div>
          <span>{{ connector.url }}</span>
        </v-flex>
        <v-flex xs2 sm2 md2>
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
              @click="deleteConfirm(`${connector.id}`)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<script>
import ConnectorEditor from "@/components/ConnectorEditor";

export default {
  data() {
    return {
      fab: false,
      showConnector: false,
      showDelete: false,
      toDeletedId: null,
      instance: {
        id: null,
        connector_name: "",
        host: "",
        port: null,
        username: "",
        database: "",
        database_type_id: 0
      },
      drivers: []
    };
  },
  computed: {
    connectors() {
      return this.$store.state.connectors;
    }
  },
  methods: {
    addConnector() {
      this.instance.id = null;
      this.instance.connector_name = null;
      this.instance.host = "";
      this.instance.port = null;
      this.instance.username = "";
      this.instance.password = "";
      this.instance.database = "";
      this.instance.database_type_id = null;
      this.showDlg(true);
    },
    async editConnector(id) {
      await fetch(
        `${this.$store.state.backend_root_url}/connectors/api/v1/${id}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: `token ${this.$store.state.token}`
          })
        }
      )
        .then(response => response.json())
        .then(data => {
          this.instance = data;
        })
        .catch(error => console.error(error));
      this.showDlg(true);
    },
    showDlg(show) {
      this.showConnector = show;
    },
    async deleteConnector() {
      await fetch(
        `${this.$store.state.backend_root_url}/connectors/api/v1/${
          this.toDeletedId
        }/`,
        {
          method: "DELETE",
          headers: new Headers({
            Authorization: `token ${this.$store.state.token}`
          })
        }
      ).catch(error => console.error(error));

      this.$store.dispatch("getConnectors");
      this.showDelete = false;
    },
    deleteConfirm(id) {
      this.toDeletedId = id;
      this.showDelete = true;
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
    "connector-editor": ConnectorEditor
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
