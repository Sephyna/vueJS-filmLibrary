<template>
  <div class="formMovie">
    <form @submit="checkForm" methode="post">
      <!--        Sans les inputwitherror-->
      <!--        <label for="name">Nom :</label>-->
      <!--        <input type="text" name="name" id="name" v-model="form.name" />-->
      <!--        <br />-->
      <!--        <label for="img">Image :</label>-->
      <!--        <input type="text" name="img" id="img" v-model="form.url" />-->
      <!--        <br />-->
      <!--        <label for="year">Année de sortie : </label>-->
      <!--        <input type="number" name="year" id="year" v-model="form.year" />-->
      <!--        <br />-->

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
    <div v-if="successMsg">
      <b> {{ successMsg }} </b>
    </div>
    <div v-if="errorMsg">
      <b> {{ errorMsg }} </b>
    </div>
    idMovie {{ idMovie }}
  </div>
  <!--    for the day that i'll be smart >>" -->
  <!--    <div v-for="(item, key) in form" v-bind:key="item">-->
  <!--      <p>{{item}} {{key}}</p>-->
  <!--      <ComponentInput-->
  <!--        :id= item-->
  <!--      ></ComponentInput>-->
  <!--    </div>-->
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
      newMovieData: null,
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
    checkForm(e) {
      if (this.errors.length > 0);
      {
        this.errors.name = [];
        this.errors.url = [];
        this.errors.year = [];
      }
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
      // Pas d'erreur = envoie du formulaire à la BDD
      if (
        this.errors.name.length === 0 &&
        this.errors.url.length === 0 &&
        this.errors.year.length === 0
      ) {
        this.form.year = parseInt(this.form.year);
        this.newMovieData = {
          name: this.form.name,
          url: this.form.url,
          year: this.form.year
        };
        //SI formulaire sur  la page d'ajout de film
        if (this.typeForm === "addMovie") {
          this.addMovieDataBase(this.newMovieData);
        } else if (this.typeForm === "editMovie") {
          this.editMovieDataBase(this.newMovieData);
        } else {
          this.errorMsg = "Problème sur le site";
        }
      }
      // Sinon rien ne se passe
      else {
        console.log("pasok");
        this.errorMsg = "Erreur dans vos datas";
      }
      e.preventDefault();
    },
    goTo(params) {
      this.$router.push({ name: params });
    },
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
  mounted() {
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
