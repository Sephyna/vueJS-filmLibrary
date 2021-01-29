<template>
  <ComponentLayout title="Nouveau film">
    <!--    affiche un formulaire en précisant la props du type de formulaire-->
    <ComponentForm
      :dataMovieToEdit="dataMovie"
      @clickFormChecked="addMovieDB"
    ></ComponentForm>
    <!--    affichage de différents messages-->
    <div v-if="this.movies.messagesSuccess.addMovie">
      <b> {{ this.movies.messagesSuccess.addMovie }} </b>
    </div>
    <div v-if="this.movies.errors.addBdd">
      <b> {{ this.movies.errors.addBdd }} </b>
    </div>
  </ComponentLayout>
</template>

<script>
import ComponentLayout from "@/components/Layout";
import ComponentForm from "@/components/FormMovie";
import { mapActions, mapState } from "vuex";

export default {
  name: "FormMovie",
  data() {
    return {
      title: "",
      dataMovie: {
        year: null,
        name: null,
        url: null
      }
    };
  },
  components: { ComponentLayout, ComponentForm },
  methods: {
    //vuex action
    ...mapActions({
      getAddMovie: "getAddMovieDataBase" //ajouter film dans l'api
    }),
    //Permet d'ajouter le nouveau film via vuex au clique du formulaire
    // et retour page d'accueil
    async addMovieDB(data) {
      await this.getAddMovie(data);
      if (this.movies.messagesSuccess.addMovie) {
        await this.goTo("Filmoteque");
      }
    },
    //Permet de rediriger le form. params = nom de la route
    goTo(params) {
      return new Promise(() => {
        setTimeout(() => {
          this.$router.push({ name: params });
        }, 1000);
      });
    }
  },
  computed: {
    //vuex : appel toutes les state de store>modules>movies après les actions
    ...mapState(["movies"])
  }
};
</script>

<style scoped></style>
