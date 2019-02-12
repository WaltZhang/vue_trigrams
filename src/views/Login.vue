<template>
  <v-container fluid class="my-5">
    <v-layout justify-center wrap>
      <v-flex xs12 md4 xl3>
        <v-card flat class="pa-3">
          <v-card-title class="green white--text">
            <v-icon large left class="white--text">person</v-icon>
            <span>Login</span>
          </v-card-title>
          <v-layout row wrap>
            <v-flex xs12>
              <v-form v-model="valid">
                <span subheading class="red--text">{{ error }}</span>
                <v-text-field label="User" v-model="username"></v-text-field>
                <v-text-field
                  :type="show1 ? 'text' : 'password'"
                  label="Password"
                  :append-icon="show1 ? 'visibility_off' : 'visibility'"
                  v-model="password"
                  @click:append="show1 = !show1"
                ></v-text-field>
                <div class="right">
                  <v-btn
                    class="white--text"
                    color="indigo"
                    @click.prevent="login"
                    >Login</v-btn
                  >
                </div>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      valid: false,
      username: "admin",
      password: "welcome1",
      error: ""
    };
  },
  methods: {
    login() {
      fetch(`${this.$store.state.backend_root_url}/accounts/auth/login/`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: `{"username": "${this.username}", "password": "${this.password}"}`
      })
        .then(response => response.json())
        .then(jsonData => {
          switch (jsonData["status"]) {
            case 200:
              this.$store.commit("setToken", { token: jsonData["token"] });
              this.$router.push({ name: "home" });
              break;
            default:
              this.error = jsonData["detail"];
          }
        })
        .catch(error => console.error("Login failed:", error));
    }
  }
};
</script>
