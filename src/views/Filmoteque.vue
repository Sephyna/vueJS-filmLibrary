<template>
  <!--  v-bind pour passé la props title au Layout-->
  <componentLayout title="Filmothèque">
    <div class="background">
      <!--     Recherche (v-model : liaison de donnée bidirectionnelle) -->
      <label for="search"></label>
      <input
        id="search"
        type="text"
        v-model="inputSearch"
        placeholder="Search movie..."
      />
      <br />
      <!--      classement de rechercher : par nom/année et par ordre croissant/décroissant-->
      <div class="sort">
        <label for="sort-by">Trier les résultats par :</label>
        <select id="sort-by" v-model="sortPicked">
          <option value="name">Nom</option>
          <option value="year">Année</option>
        </select>
        <span class="order-by">
          <input
            type="radio"
            id="increasing"
            value="increasing"
            v-model="sortOrderBy"
          />
          <label for="increasing">⮝</label>
          <input
            type="radio"
            id="descending"
            value="descending"
            v-model="sortOrderBy"
          />
          <label for="descending">⮟</label>
        </span>
      </div>
      <br />
      <br />
      <!--      si les data son charger = affiche les films sinon affiche erreur si pas de connexion à bdd sinon affiche chargement-->
      <div v-if="loadedData">
        <div class="wallpaper">
          <!--          v-bind pour passé les props au component enfant-->
          <componentMovie
            v-for="movie in searchMovies"
            v-bind:key="movie.name"
            :idMovie="movie.id"
            :urlMovie="movie.url"
            :yearMovie="movie.year"
            :nameMovie="movie.name"
          >
          </componentMovie>
        </div>
      </div>
      <div v-else-if="loadedError">
        Connexion avec la base de donnée échouée
      </div>
      <div v-else>
        Chargement ....
      </div>
    </div>
  </componentLayout>
</template>

<script>
import axios from "axios";
import _ from "lodash";

import componentMovie from "@/components/Movie";
import componentLayout from "@/components/Layout";

export default {
  name: "Filmoteque",
  data() {
    return {
      movies: [],
      loadedData: false,
      loadedError: false,
      inputSearch: "",
      sortPicked: "name",
      sortOrderBy: "increasing",
      title: ""
    };
  },
  components: { componentMovie, componentLayout },
  methods: {
    // Collecte les film de l'api à la création du component
    collectMovies() {
      axios
        .get("https://movies-api.alexgalinier.now.sh/")
        .then(response => {
          this.movies = response.data;
          this.loadedData = true;
        })
        .catch(error => {
          console.log(error);
          this.loadedError = true;
        });
    }
  },
  computed: {
    //ordonne les films en fonction des choix sélectionnés
    orderMovie() {
      if (this.sortOrderBy === "increasing") {
        return _.orderBy(this.movies, this.sortPicked);
      } else {
        return _.orderBy(this.movies, this.sortPicked).reverse();
      }
    },
    // permet de rechercher les film via l'input search (v-model) en fonction de leur nom
    searchMovies() {
      return this.orderMovie.filter(movie => {
        return (
          movie.name.toLowerCase().includes(this.inputSearch.toLowerCase()) ||
          movie.year.toLowerCase().includes(this.inputSearch.toLowerCase())
        );
      });
    }
  },
  mounted() {
    this.collectMovies();
  }
};
</script>

<style scoped>
.background {
  width: 1200px;
  margin: 0 auto;
}
.wallpaper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}

#search {
  width: 100%;
  padding: 0 20px;
  border-radius: 20px;
  border: 4px solid #353d6d;
  box-shadow: 0 7px 0 0 rgba(0, 0, 0, 0.2);
  height: 56px;
  background: rgba(0, 0, 0, 0.2);
  color: hsla(0, 0%, 100%, 0.7);
  font-size: 16px;
}
.sort {
  text-align: right;
  line-height: 150%;
  margin: 15px;
}
.order-by > input {
  visibility: hidden;
}

.order-by > label {
  font-weight: bold;
  font-size: 200%;
}
.order-by input[type="radio"]:checked + label {
  color: #161a33;
  text-shadow: 0 1px 0 white, 0 -1px 0 white;
}
</style>
