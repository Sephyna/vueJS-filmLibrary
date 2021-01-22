import Vue from "vue";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// SI LE LAYOUT ETAIT DANS TOUTE LES PAGES
// import Layout from "@/components/Layout";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

// SI LE LAYOUT ETAIT DANS TOUTE LES PAGES
// Vue.component("default-layout", Layout);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
