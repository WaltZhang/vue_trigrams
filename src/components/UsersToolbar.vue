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
                    :rules="[rules.required, rules.nameRule]"
                    v-model="username"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Password*"
                    :rules="[rules.required, rules.passwordRule]"
                    v-model="password"
                    type="password"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Password confirm*"
                    :rules="[rules.required, rules.passwordConfirmRule]"
                    type="password"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Email*"
                    :rules="[rules.required, rules.emailRule]"
                    v-model="email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Telephone*"
                    :rules="[rules.required]"
                    v-model="phone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Address*"
                    :rules="[rules.required]"
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
      rules: {
        required: v => !!v || "Required",
        nameRule: v => v.length > 4 || "Name must be more than 4 characters",
        emailRule: v => /.+@.+/.test(v) || "E-mail address is invalid",
        passwordRule: v =>
          v.length >= 8 || "Password must be not less than 8 characters",
        passwordConfirmRule: v =>
          v === this.passowrd || "Password and confirmed do not matched"
      },
      dialog: false,
      fab: false,
      username: "",
      password: "",
      email: "",
      phone: null,
      city: ""
    };
  },
  methods: {
    openNewUserDlg() {
      this.dialog = true;
    },
    async addUser() {
      this.dialog = false;
      await this.$store.dispatch("addUser", {
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
        city: this.city
      });
      this.$store.dispatch("getUsers");
    }
  }
};
</script>
