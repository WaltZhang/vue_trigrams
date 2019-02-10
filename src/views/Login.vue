<template>
  <v-container fill-height fluid class="my-5">
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
                <v-text-field label="User" v-model="username"></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="password"
                ></v-text-field>
                <div class="right">
                  <v-btn class="white--text" color="indigo">Login</v-btn>
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
      valid: false,
      username: "",
      password: ""
    };
  }
};
</script>
