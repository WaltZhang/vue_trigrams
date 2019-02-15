<template>
  <div>
    <v-toolbar app>
      <v-toolbar-side-icon
        class="grey--text"
        @click="miniDrawer = !miniDrawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="grey--text">
        <span>VUE</span>
        <span class="font-weight-light">Trigrams</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat class="grey--text" v-if="loggedIn" @click="logout">
          <span>Logout</span>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      app
      class="warning"
      width="220"
      :mini-variant.sync="miniDrawer"
    >
      <v-layout column align-center v-if="loggedIn">
        <v-flex class="mt-5">
          <v-avatar :size="miniDrawer ? 30 : 100">
            <v-img :src="image"></v-img>
          </v-avatar>
          <p
            class="white--text subheading mt-1 text-xs-center"
            v-if="!miniDrawer"
          >
            {{ username }}
          </p>
        </v-flex>
      </v-layout>
      <v-layout tag="v-list" column v-if="loggedIn">
        <v-list>
          <v-list-tile
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-tile-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">{{
                link.text
              }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.username,
      links: [
        { icon: "home", text: "Home", route: "/" },
        {
          icon: "settings_input_component",
          text: "My Connectors",
          route: "/connectors"
        },
        { icon: "extension", text: "My Drivers", route: "/drivers" },
        { icon: "folder", text: "My Projects", route: "/projects" },
        { icon: "person", text: "Users", route: "/users" }
      ],
      logged: false,
      miniDrawer: true,
      image: "Circled_Male_1.svg"
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    toggleDrawer() {
      if (this.logged) {
        this.showDrawer = true;
      }
    },
    logout() {
      fetch(`${this.$store.state.backend_root_url}/accounts/auth/logout/`, {
        method: "POST",
        headers: new Headers({
          Authorization: `token ${this.$store.state.token}`
        })
      })
        .then(() => {
          this.$store.commit("clearLoggedUser");
          this.$router.push({ name: "login" });
        })
        .catch(error => console.error("Logout failed", error));
    }
  }
};
</script>
