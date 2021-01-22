<template>
  <div class="formMovie">
    <!--    au submit = lance la fonction checkForm-->
    <form @submit="checkForm" methode="post">
      <!--      On passe à chaque componentInput son label (affichage) ses erreurs, son id(code), son type, et
      le v-model permet de modifier en temps réel la valeur entrée dans le componentinput pour le traiter dans ce component-->
      <ComponentInput
        label="Nom"
        :errors="errors.name"
        idInput="name"
        type="text"
        v-model="form.name"
      ></ComponentInput>
      <ComponentInput
        label="Image"
        :errors="errors.url"
        idInput="url"
        type="text"
        v-model="form.url"
      ></ComponentInput>
      <ComponentInput
        label="Année de sortie"
        :errors="errors.year"
        idInput="year"
        type="text"
        v-model="form.year"
      ></ComponentInput>
      <input type="submit" value="Ajouter" />
    </form>
    <!--    affichage de différents messages-->
    <div v-if="successMsg">
      <b> {{ successMsg }} </b>
    </div>
    <div v-if="errorMsg">
      <b> {{ errorMsg }} </b>
    </div>
    data {{ dataMovieToEdit }}
  </div>
</template>

<script>
import axios from "axios";

import ComponentInput from "./InputWithError";

export default {
  name: "FormMovie",
  props: {
    typeForm: {
      type: String,
      require: true
    },
    dataMovieToEdit: {
      type: Object,
    }
  },
  data() {
    return {
      errors: {
        name: [],
        url: [],
        year: []
      },
      successMsg: "",
      errorMsg: "",
      idMovie: "",
      movieNewData: null,
      movieData: null,
      form: {
        name: null,
        url: null,
        year: null
      }
    };
  },
  components: { ComponentInput },
  methods: {
    //fonction qui check les datas du formulaire
    checkForm(e) {
      // si des erreurs préexiste (déjà réaliser une tentative) => le vide
      if (this.errors.length > 0);
      {
        this.errors.name = [];
        this.errors.url = [];
        this.errors.year = [];
      }
      // différents checks et messages d'erreurs
      if (!this.form.name) {
        this.errors.name.push("Un nom de film est requis.");
      }
      if (!this.form.url) {
        this.errors.url.push("Une image pour le film est requise.");
      }
      if (!this.form.year) {
        this.errors.year.push("Une année pour le film est requise.");
      }
      if (
        typeof this.form.name === !Text ||
        this.form.name <= 0 ||
        this.form.name > 50
      ) {
        this.errors.name.push(
          "Le titre du film doit être du texte ente 0 et 50 caractères."
        );
      }
      if (typeof this.form.url === !Text) {
        this.errors.url.push("L'image doit être un lien.");
      }
      if (typeof this.form.year === !Number || this.form.year < 1891) {
        this.errors.year.push("L'année doit être une année valide.");
      }
      // Pas d'erreur = créer un object movieNewData et l'envoie  pour la suite
      if (
        this.errors.name.length === 0 &&
        this.errors.url.length === 0 &&
        this.errors.year.length === 0
      ) {
        this.form.year = parseInt(this.form.year);
        this.movieNewData = {
          name: this.form.name,
          url: this.form.url,
          year: this.form.year
        };
        //SI formulaire sur  la page d'ajout de film
        if (this.typeForm === "addMovie") {
          this.addMovieDataBase(this.movieNewData);
        }
        // Si formulaire sur la page d'édition d'un film
        else if (this.typeForm === "editMovie") {
          this.editMovieDataBase(this.movieNewData);
          // Sinon problème car il manque la props typeForm
        } else {
          this.errorMsg = "Problème sur le site";
        }
      }
      // Sinon rien ne se passe
      else {
        console.log("pasok");
        this.errorMsg = "Erreur dans vos datas";
      }
      //Permet d'éviter au form de ne pas réaliser ses évenements par défaut
      e.preventDefault();
    },
    //Permet de rediriger le form. params = nom de la route
    goTo(params) {
      this.$router.push({ name: params });
    },
    //Permet d'ajouter le nouveau film dans la base de donnée et renvoie à la filmothèque
    addMovieDataBase(data) {
      axios
        .post("https://movies-api.alexgalinier.now.sh", data)
        .then(() => {
          this.successMsg = "Film bien ajouter";
          this.goTo("Filmoteque");
        })
        .catch(error => {
          console.log(error);
          this.errorMsg = "Erreur du serveur";
        });
    },
    //Permet d'éditer un film et renvoie à la filmothèque
    editMovieDataBase(data) {
      console.log(data, this.idMovie);
      axios
        .put("https://movies-api.alexgalinier.now.sh" + this.idMovie, data)
        .then(() => {
          this.successMsg = "Film bien modifié";
          this.goTo("Filmoteque");
        })
        .catch(error => {
          console.log(error);
          this.errorMsg = "Erreur du serveur";
        });
    }
  },
  // MODIFY IDMOVIE à la création du component : si page d'éditier, récupère l'id dans l'url
  created() {
    if (this.typeForm === "editMovie") {
      this.idMovie = this.$route.params.id;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0 auto;
}
</style>
