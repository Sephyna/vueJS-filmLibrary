<template>
  <ComponentLayout title="Nouveau film">
    <!--    affiche un formulaire en précisant la props du type de formulaire-->
    <ComponentForm
      :dataMovieToEdit="dataMovie"
      @clickFormChecked="addMovieDataBase"
    ></ComponentForm>
    <!--    affichage de différents messages-->
    <div v-if="successMsg">
      <b> {{ successMsg }} </b>
    </div>
    <div v-if="errorMsg">
      <b> {{ errorMsg }} </b>
    </div>
  </ComponentLayout>
</template>

<script>
import ComponentLayout from "@/components/Layout";
import ComponentForm from "@/components/FormMovie";
import axios from "axios";

export default {
  name: "FormMovie",
  data() {
    return {
      title: "",
      errorMsg: null,
      successMsg: null,
      dataMovie: {
        year: null,
        name: null,
        url: null
      }
    };
  },
  components: { ComponentLayout, ComponentForm },
  methods: {
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
    //Permet de rediriger le form. params = nom de la route
    goTo(params) {
      this.$router.push({ name: params });
    }
  }
};
</script>

<style scoped></style>
