<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs10>
          <v-textarea label="Query SQL" v-model="querySql"></v-textarea>
        </v-flex>
        <v-flex xs2>
          <v-btn dark small @click="fetchSample"><span>Query</span></v-btn>
        </v-flex>
        <v-flex xs12>
          <v-data-table :headers="titles" :items="content">
            <template #headers>
              <th v-for="title in titles" :key="title.pk">
                <span class="headline">{{ title.text }}</span>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn small icon v-on="on">
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(item, i) in ['int', 'float', 'string', 'date']"
                      :key="i"
                      @click="changeDataType(title.text, item)"
                    >
                      <v-list-tile-title>{{ item }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </th>
            </template>
            <template #items="props">
              <td v-for="title in titles" :key="title.pk">
                {{ props.item[title.text] }}
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn color="warning" flat @click="`${$emit('close-add-data-set-dlg')}`">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="green" flat @click="`${$emit('step-by-step', -1)}`">
        Back
      </v-btn>
      <v-btn
        color="green"
        depressed
        @click="nextPage"
        :disabled="selectedConnector === null"
      >
        Next
      </v-btn>
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
      dataSetName: "",
      querySql: "",
      rows: [],
      metadata: {}
    };
  },
  computed: {
    titles() {
      let headers = [];
      for (let column of Object.keys(this.metadata)) {
        headers.push({
          text: column,
          sortable: false,
          value: String(this.metadata[column])
        });
      }
      return headers;
    },
    content() {
      let displayRows = [];
      for (let row of this.rows) {
        let displayRow = {};
        for (let column of Object.keys(this.metadata)) {
          if (this.metadata[column].includes("int")) {
            displayRow[column] = parseInt(row[column]);
          } else if (this.metadata[column].includes("float")) {
            displayRow[column] = parseFloat(row[column]);
          } else if (this.metadata[column].includes("date")) {
            displayRow[column] = new Date(row[column]);
          } else {
            displayRow[column] = new String(row[column]);
          }
        }
        displayRows.push(displayRow);
      }
      return displayRows;
    }
  },
  methods: {
    nextStep() {
      this.$emit("update-step");
    },
    fetchSample() {
      let querySql = this.querySql.replace(/\n/gm, " ");
      fetch(`${this.$store.state.backend_root_url}/datasets/api/v1/create/`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${this.$store.state.token}`
        }),
        body: `{
            "connector_id": ${this.selectedConnector},
            "query_sql": "${querySql}"
          }`
      })
        .then(response => response.json())
        .then(async data => {
          if (data.status == 201) {
            this.dataSetName = data.detail.data_set_name;
            await fetch(
              `${this.$store.state.backend_root_url}/datasets/api/v1/${
                this.dataSetName
              }/metadata/`,
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
                this.metadata = JSON.parse(metadataString);
              });
            fetch(
              `${this.$store.state.backend_root_url}/datasets/api/v1/${
                this.dataSetName
              }/canonical/`,
              {
                method: "GET",
                headers: new Headers({
                  Authorization: `token ${this.$store.state.token}`
                })
              }
            )
              .then(response => response.text())
              .then(data => {
                if (data.slice(-1) === "\n") {
                  data = data.substring(0, data.length - 2);
                }
                this.rows = [];
                for (let line of data.split("\n")) {
                  let row = {};
                  let columns = line.split(",");
                  let headers = Object.keys(this.metadata);
                  for (let i in columns) {
                    row[headers[i]] = columns[i];
                  }
                  this.rows.push(row);
                }
              });
          }
        })
        .catch(error => console.error(error));
    },
    changeDataType(title, type) {
      this.metadata[title] = type;
      let metadata = JSON.stringify(this.metadata).replace(/"/gi, '\\"');
      fetch(
        `${this.$store.state.backend_root_url}/datasets/api/v1/${
          this.dataSetName
        }/metadata/update/`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `token ${this.$store.state.token}`
          }),
          body: `{
            "metadata": "${metadata}"
          }`
        }
      )
        .then(response => response.json())
        .then(data => {
          let metadataString = data["metadata"];
          this.metadata = JSON.parse(metadataString);
        })
        .catch(error => console.error(error));
    },
    nextPage() {
      this.$emit("update-data-set-name", this.dataSetName);
      this.$emit("step-by-step", 1);
    }
  }
};
</script>
