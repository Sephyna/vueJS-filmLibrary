<template>
  <!--  titre passé au layout-->
  <ComponentLayout title="Editer un film">
    <!--    affichage du film à editer-->
    <componentMovie
      v-if="dataMovie"
      :idMovie="dataMovie.id"
      :urlMovie="dataMovie.url"
      :yearMovie="dataMovie.year"
      :nameMovie="dataMovie.name"
    >
    </componentMovie>
    <br />
    <br />
    <!--    affichage du formulaire en lui passant en props le type de formulaire (action différente) et des datas d'un seul film-->
    <ComponentForm
      typeForm="editMovie"
      :dataMovieToEdit="dataMovie">
    </ComponentForm>
  </ComponentLayout>
</template>

<script>
import ComponentLayout from "./Layout";
import ComponentForm from "./FormMovie";
import ComponentMovie from "./Movie";
import axios from "axios";

export default {
  name: "EditMovie",
  data() {
    return {
      title: "",
      dataMovie: null
    };
  },
  components: { ComponentLayout, ComponentForm, ComponentMovie },
  methods: {
    // Collecte data d'un film en fonction de l'id dans l'url
    collectMovie() {
      axios
        .get("https://movies-api.alexgalinier.now.sh/")
        .then(response => {
          let movies = response.data;
          for (let key in movies) {
            if (movies[key].id === this.idMovie) {
              this.dataMovie = movies[key];
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  // DOTO : modifier l'édition à la création du formulaire : donne idMovie en fonction url et collecte le film
  created() {
    this.idMovie = this.$route.params.id;
    this.collectMovie();
  }
};
</script>
<style scoped>
* {
  margin: 0 auto;
}
</style>
