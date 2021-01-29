<template>
  <!--  titre passé au layout-->
  <ComponentLayout title="Editer un film">
    <!--    affichage du film à editer-->
    <componentMovie
      v-if="this.movies.movie"
      :idMovie="this.idMovie"
      :urlMovie="this.movies.movie.url"
      :yearMovie="this.movies.movie.year"
      :nameMovie="this.movies.movie.name"
    >
    </componentMovie>
    <div v-if="this.movies.errors.loadBdd">
      {{ this.movies.errors.loadBdd }}
    </div>
    <br />
    <br />
    <!--    affichage du formulaire en lui passant en props le type de formulaire (action différente) et des datas d'un seul film-->
    <ComponentForm
      v-if="this.movies.movie"
      :dataMovieToEdit="this.movies.movie"
      @clickFormChecked="editMovieDatabase"
    >
    </ComponentForm>
    <!--    affichage de différents messages-->
    <div v-if="this.movies.messagesSuccess.editMovie">
      <b> {{ this.movies.messagesSuccess.editMovie }} </b>
    </div>
    <div v-if="this.movies.errors.editMovie">
      <b> {{ this.movies.errors.editMovie }} </b>
    </div>
  </ComponentLayout>
</template>

<script>
import ComponentLayout from "@/components/Layout";
import ComponentForm from "@/components/FormMovie";
import ComponentMovie from "@/components/Movie";

import { mapActions, mapState } from "vuex";

export default {
  name: "EditMovie",
  data() {
    return {
      idMovie: null,
      title: ""
    };
  },
  components: { ComponentLayout, ComponentForm, ComponentMovie },
  methods: {
    ...mapActions({
      getMovie: "getMovie", //film
      getEditMovie: "getEditMovieDatabase"
    }),
    //Permet de rediriger le form. params = nom de la route
    goTo(params) {
      this.$router.push({ name: params });
    },
    //Permet d'éditer un film et renvoie à la filmothèque et retour page d'accueil
    async editMovieDatabase(data) {
      await this.getEditMovie({ id: this.idMovie, data: data });
      if (this.movies.messagesSuccess.editMovie) {
        this.goTo("Filmoteque");
      }
    }
  },
  computed: {
    //vuex : appel toutes les state de store>modules>movies après les actions
    ...mapState(["movies"])
  },
  // modifier l'édition à la création du formulaire :
  // donne idMovie en fonction url et collecte le film
  created() {
    this.idMovie = this.$route.params.id;
    this.getMovie({ id: this.idMovie });
  }
};
</script>
<style scoped>
* {
  margin: 0 auto;
}
</style>
