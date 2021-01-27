<template>
  <div class="formMovie">
    <!--    au submit = lance la fonction checkForm-->
    <form @submit.prevent="checkForm" methode="post">
      <!--      On passe à chaque componentInput son label (affichage) ses erreurs, son id(code), son type, et
      le v-model permet de modifier en temps réel la valeur entrée dans le componentinput pour le traiter dans ce component-->
      <ComponentInput
        label="Nom"
        :errors="errors.name"
        idInput="name"
        type="text"
        v-model="form.name"
        :content="dataMovieToEdit.name"
      ></ComponentInput>
      <ComponentInput
        label="Image"
        :errors="errors.url"
        idInput="url"
        type="text"
        v-model="form.url"
        :content="dataMovieToEdit.url"
      ></ComponentInput>
      <ComponentInput
        label="Année de sortie"
        :errors="errors.year"
        idInput="year"
        type="number"
        v-model="form.year"
        :content="dataMovieToEdit.year"
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
  </div>
</template>

<script>
import ComponentInput from "./InputWithError";

export default {
  name: "FormMovie",
  props: {
    dataMovieToEdit: {
      type: Object,
      require: false
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
      form: {
        name: null,
        url: null,
        year: null
      }
    };
  },
  components: { ComponentInput },
  methods: {
    //petit fonction js pour savoir si une valeur est vraiment numérique
    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    //fonction qui check les datas du formulaire
    checkForm() {
      // si des erreurs préexiste (déjà réaliser une tentative) => le vide
      if (this.errors) {
        this.errors.name = [];
        this.errors.url = [];
        this.errors.year = [];
      }
      //Pour chaque prop du formulaire => si des préexiste (dataMovieToEdit) et que l'input du form est vide, alors attribué la valeur préexistante
      for (const prop in this.form) {
        if (this.dataMovieToEdit[prop] && !this.form[prop]) {
          this.form[prop] = this.dataMovieToEdit[prop];
        }
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
        typeof this.form.name != "string" ||
        this.form.name.length <= 0 ||
        this.form.name.length > 50
      ) {
        this.errors.name.push(
          "Le titre du film doit être du texte ente 0 et 50 caractères."
        );
      }
      if (typeof this.form.url != "string") {
        this.errors.url.push("L'image doit être un lien.");
      }
      if (
        this.isNumeric(this.form.year) === false ||
        this.form.year < 1891 ||
        this.form.year > 2100
      ) {
        this.errors.year.push("L'année doit être une année valide.");
      }

      // Pas d'erreur = créer un object movieNewData et l'envoie au component parent (edit ou new movie)
      if (
        this.errors.name.length === 0 &&
        this.errors.url.length === 0 &&
        this.errors.year.length === 0
      ) {
        this.form.year = parseInt(this.form.year);
        const movieNewData = {
          name: this.form.name,
          url: this.form.url,
          year: this.form.year
        };
        console.log(movieNewData);
        this.$emit("clickFormChecked", movieNewData);
      } else {
        this.form = {
          name: null,
          url: null,
          year: null
        };
        this.errorMsg = "Data non envoyé";
      }
      //Permet d'éviter au form de ne pas réaliser ses évenements par défaut
      // e.preventDefault();
    }
  }
};
</script>

<style scoped>
* {
  margin: 0 auto;
}
</style>
