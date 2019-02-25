import Vue from "vue";
import Router from "vue-router";
import Datasets from "./views/Datasets";
import Projects from "./views/Projects";
import Connectors from "./views/Connectors";
import Users from "./views/Users";
import Login from "./views/Login";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "datasets",
      component: Datasets,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/connectors",
      name: "connectors",
      component: Connectors,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresVistor: true
      }
    }
  ]
});
