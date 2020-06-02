<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>miscellaneous_services</v-icon>
      </v-btn>
      <v-btn icon @click="remove">
        <v-icon>cancel</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Properties
      </v-card-title>
      <v-card-text>
        <div v-for="(value, key) in properties" :key="key">
          <v-text-field :label="key" v-model="properties[key]"></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="save">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    node: Object
  },
  data() {
    return {
      properties: this.node.properties,
      dialog: false
    };
  },
  methods: {
    cancel() {
      this.properties = this.node.properties;
      this.dialog = false;
    },
    save() {
      this.$emit("save", { id: this.node.id, properties: this.properties });
      this.dialog = false;
    },
    remove() {
      this.$emit("remove", this.node.id);
    }
  }
};
</script>
