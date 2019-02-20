<template>
  <v-container>
    <v-layout row wrap class="my-5">
      <v-flex class="ma-3" xs12>
        <user-toolbar></user-toolbar>
      </v-flex>
      <!-- <v-flex xs12 sm6 md4 lg3 v-for="user in users" :key="user.user.id"> -->
      <v-card class="text-right ma-3" v-for="user in users" :key="user.user.id">
        <v-layout row pa-3>
          <v-flex xs5 mt-3>
            <v-avatar size="100">
              <v-img :src="user.avatar" v-if="user.user.is_active"></v-img>
              <v-img
                src="Person_Deactived.svg"
                v-if="!user.user.is_active"
              ></v-img>
            </v-avatar>
          </v-flex>
          <v-flex xs7 ml-3>
            <v-card-title primary-title>
              <div class="headline">
                <span>{{ user.user.username }}</span>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-card-text>
            <div>
              <v-icon left>email</v-icon>
              <span>{{ user.user.email }}</span>
            </div>
            <div>
              <v-icon left>contact_phone</v-icon>
              <span>{{ user.phone }}</span>
            </div>
            <div>
              <v-icon left>location_city</v-icon>
              <span>{{ user.city }}</span>
            </div>
          </v-card-text>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            fab
            depressed
            dark
            small
            @click="toggleUserActive(user.user.id, !user.user.is_active)"
          >
            <i class="material-icons orange600">face</i>
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import UserToolbar from "@/components/UsersToolbar";

export default {
  data() {
    return {
      //
    };
  },
  mounted() {
    this.fetchUsers();
  },
  components: {
    "user-toolbar": UserToolbar
  },
  computed: {
    users: function() {
      return this.$store.state.users;
    }
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch("getUsers");
    },
    async toggleUserActive(id, active) {
      await this.$store.dispatch("toggleUserActive", {
        user_id: id,
        active: active
      });
      this.fetchUsers();
    }
  }
};
</script>
