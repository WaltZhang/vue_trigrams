<template>
  <v-container fill-height fluid class="my-5">
    <v-layout justify-center wrap>
      <v-flex xs12 md4 xl3>
        <v-card flat class="pa-3">
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn @click="addUser">Add User</v-btn>
              <v-btn @click="deleteUser">Delete User</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    addUser() {
      fetch(`${this.$store.state.backend_root_url}/accounts/api/v1/`, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `token ${this.$store.state.token}`
        }),
        body: `{
            "user": {
              "username": "user01",
              "password": "welcome1",
              "email": "user01@email.com"
            },
            "city": "Shanghai",
            "phone": 13000000000
        }`
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("User adding failed:", error));
    },
    deleteUser() {
      fetch(`${this.$store.state.backend_root_url}/accounts/api/v1/7/`, {
        method: "delete",
        headers: new Headers({
          Authorization: `token ${this.$store.state.token}`
        })
      })
        .then(response => console.log(response))
        // .then(data => console.log(data))
        .catch(error => console.error(error));
    }
  }
};
</script>
