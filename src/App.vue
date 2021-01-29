<template>
  <div id="app">
    <!--    <div id="nav">-->
    <!--      <router-link to="/">Filmothèque</router-link> |-->
    <!--    </div>-->
    <ModaleComponent></ModaleComponent>
    <router-view />
  </div>
</template>

<script>
import ModaleComponent from "./components/Modale";
import { mapActions } from "vuex";

export default {
  components: { ModaleComponent },
  methods: {
    ...mapActions({
      getMoviesWithFav: "getMoviesWithIsFavoriteKey" //films avec les favoris
    })
  },
  mounted() {
    this.getMoviesWithFav();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/*#nav {*/
/*  padding: 30px;*/
/*}*/

/*#nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

/*#nav a.router-link-exact-active {*/
/*  color: #42b983;*/
/*}*/
</style>

<!--SI LE LAYOUT ETAIT DANS TOUTE LES PAGES-->
<!--<template>-->
<!--  <div id="app">-->
<!--    <default-layout>-->
<!--      <router-view @init="dataTitle" />-->
<!--    </default-layout>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  name: "Layout",-->
<!--  data() {-->
<!--    return {-->
<!--      title: ""-->
<!--    };-->
<!--  },-->

<!--  methods:{-->
<!--    dataTitle(params) {-->
<!--      this.title = params;-->
<!--      console.log(params)-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.dataTitle();-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--#nav {-->
<!--  padding: 30px;-->
<!--}-->

<!--#nav a {-->
<!--  font-weight: bold;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--#nav a.router-link-exact-active {-->
<!--  color: #42b983;-->
<!--}-->
<!--</style>-->
