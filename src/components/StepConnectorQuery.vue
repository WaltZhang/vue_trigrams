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
            <template #headers>
              <th v-for="title in titles" :key="title.value">
                {{ title.value }}
                <v-btn flat fab>...</v-btn>
              </th>
            </template>
            <template #items="props">
              <td v-for="header in titles" :key="header.id">
                {{ props.item[header.value] }}
              </td>
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
      rows: []
    };
  },
  computed: {
    titles() {
      let headers = [];
      for (let column of this.columns) {
        headers.push({
          text: column,
          sortable: false,
          value: column
        });
      }
      return headers;
    },
    content() {
      return this.rows;
    }
  },
  methods: {
    nextStep() {
      this.$emit("update-step");
    },
    fetchSample() {
      fetch(`${this.$store.state.backend_root_url}/datasets/api/v1/create/`, {
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
        .then(async data => {
          if (data.status == 201) {
            let dataSetName = data.detail.data_set_name;
            await fetch(
              `${
                this.$store.state.backend_root_url
              }/datasets/api/v1/${dataSetName}/metadata/`,
              {
                method: "GET",
                headers: new Headers({
                  Authorization: `token ${this.$store.state.token}`
                })
              }
            )
              .then(response => response.json())
              .then(data => {
                let metadataString = data["detail"]["metadata"];
                let metadata = JSON.parse(metadataString);
                this.columns = Object.keys(metadata);
              });
            fetch(
              `${
                this.$store.state.backend_root_url
              }/datasets/api/v1/${dataSetName}/canonical/`,
              {
                method: "GET",
                headers: new Headers({
                  Authorization: `token ${this.$store.state.token}`
                })
              }
            )
              .then(response => response.text())
              .then(data => {
                for (let line of data.split("\n")) {
                  let row = {};
                  let columns = line.split(",");
                  for (let i in columns) {
                    row[this.columns[i]] = columns[i];
                  }
                  this.rows.push(row);
                }
              });
          }
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
