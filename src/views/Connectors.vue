<template>
  <v-container class="my-5">
    <v-card flat v-for="connector in connectors" :key="connector.id">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <div class="caption grey--text">Connector Title</div>
          <div>{{ connector.title }}</div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">Connector Type</div>
          <div>{{ connector.type }}</div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">Connection URL</div>
          <div>{{ connector.url }}</div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">Connection User</div>
          <div>{{ connector.user }}</div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {}
};
</script>
