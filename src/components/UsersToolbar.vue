<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">New Use Profile</v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="User name*"
                    required
                    v-model="username"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Password*"
                    required
                    v-model="password"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Password confirm*"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Email*"
                    required
                    v-model="email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Telephone*"
                    required
                    v-model="phone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Address*"
                    required
                    v-model="city"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialog = false"
              >Cancel</v-btn
            >
            <v-btn color="green darken-1" flat="flat" @click="addUser"
              >Create</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-card>
      <v-speed-dial
        v-model="fab"
        right
        absolute
        direction="left"
        transition="slide-y-reverse-transition"
      >
        <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
          <v-icon>face</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn color="green" dark fab @click="openNewUserDlg">
          <v-icon>add</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      fab: false,
      username: null,
      password: null,
      email: null,
      phone: null,
      city: null
    };
  },
  methods: {
    openNewUserDlg() {
      this.dialog = true;
    },
    addUser() {
      this.$store.commit("addUser", {
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
        city: this.city
      });
      this.dialog = false;
      this.$store.commit("getUsers");
    }
  }
};
</script>
