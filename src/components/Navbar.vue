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
        <v-btn flat class="grey--text" v-if="logged">
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
      <v-layout column align-center v-if="logged">
        <v-flex class="mt-5">
          <v-avatar :size="miniDrawer ? 30 : 100">
            <v-img :src="image"></v-img>
          </v-avatar>
          <p class="white--text subheading mt-1" v-if="!miniDrawer">
            User name
          </p>
        </v-flex>
      </v-layout>
      <v-layout class="fill-height" tag="v-list" column v-if="logged">
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
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "folder", text: "My Projects", route: "/projects" },
        { icon: "person", text: "Team", route: "/team" }
      ],
      logged: false,
      miniDrawer: true,
      image:
        "https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg"
    };
  },
  methods: {
    toggleDrawer() {
      if (this.logged) {
        this.showDrawer = true;
      }
    }
  }
};
</script>
