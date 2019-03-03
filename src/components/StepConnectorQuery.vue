<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            label="Query SQL"
            v-model="query_sql"
            @keypress.enter="fetchSample"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-data-table :headers="titles" :items="content">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.connector_id }}</td>
              <td>{{ props.item.query }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
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
      query_sql: "",
      columns: [],
      content: []
    };
  },
  computed: {
    titles() {
      let headers = [];
      for (let i in this.columns) {
        headers.push({
          text: this.columns[i],
          sortable: false,
          value: this.columns[i]
        });
      }
      console.log(headers);
      return headers;
    }
  },
  methods: {
    nextStep() {
      this.$emit("update-step");
    },
    fetchSample() {
      fetch(`${this.$store.state.backend_root_url}/datasets/database/query/`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${this.$store.state.token}`
        }),
        body: `{
            "connector_id": ${this.selectedConnector},
            "query_sql": "${this.query_sql}"
          }`
      })
        .then(response => response.json())
        .then(data => {
          let metadata = data["detail"]["metadata"];
          console.log(metadata);
          this.columns = Object.keys(metadata);
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
