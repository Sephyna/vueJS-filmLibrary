import Vue from "vue";
import VueRouter from "vue-router";
import Filmoteque from "@/views/Filmoteque.vue";
import NewMovie from "@/views/NewMovie";
import EditMovie from "@/views/EditMovie";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Filmoteque",
    component: Filmoteque
  },
  {
    path: "/nouveau-film",
    name: "NewMovie",
    component: NewMovie
  },
  {
    path: "/editer-film/:id",
    name: "EditMovie",
    component: EditMovie,
    props: true
  }
  // ,
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
