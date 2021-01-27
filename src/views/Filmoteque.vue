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
      <!--      classement de rechercher : par nom/année et par ordre croissant/décroissant et checkbox favoris-->
      <div class="sort">
        <label for="sort-by">Trier les résultats :</label>
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
        <br />
        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            id="favorites"
            name="favorites"
            value="favorites"
            v-model="checkedFavorites"
          />
          <label class="custom-control-label" for="favorites">favoris</label>
        </div>
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
            :isFavorite="movie.isFavorite"
            @checked="toggleFavorites"
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
      title: "",
      idFavoriteMovieTemp: [],
      checkedFavorites: false
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
    },
    // Fonction qui ajoute les films cochés et supprime les décochés du component Movies dans idFavoriteMovieTemp
    // Fait attention si le film n'est pas déjà présent dans le tableau idFavoriteMovieTemp
    // Ajoute ce tableau modifié dans le localStorage
    toggleFavorites(movieChecked) {
      let indexMovieInArray = this.idFavoriteMovieTemp.indexOf(movieChecked.id);
      if (movieChecked.value === true && indexMovieInArray < 0) {
        this.idFavoriteMovieTemp.push(movieChecked.id);
      } else if (movieChecked.value === false && indexMovieInArray >= 0) {
        this.idFavoriteMovieTemp.splice(indexMovieInArray, 1);
      }
      localStorage.setItem("favoritesMovies", this.idFavoriteMovieTemp);
    }
  },
  computed: {
    //function pour initialiser le tableau idFavoriteMovieTemp et qui soit égale à storage.favoritesMovies
    idFavoriteMovieStorage() {
      if (localStorage.getItem("favoritesMovies")) {
        return localStorage.getItem("favoritesMovies").split(",");
      } else {
        return [];
      }
    },
    //Ajouter la key isFavorite en fonction du tableau temporaire des favoris (= à celui du storage)
    moviesWithIsFavoriteKey() {
      let idFavs = this.idFavoriteMovieTemp;
      let movies = this.movies;
      return movies.map(function(movie) {
        movie.isFavorite = false;
        idFavs.find(function(idFav) {
          if (movie.id === idFav) {
            movie.isFavorite = true;
          }
        });
        return movie;
      });
    },
    //fonction qui cherche les films en favoris en fonction des id présent dans idFavoriteMovieTemp
    favoritesMovies() {
      return this.idFavoriteMovieTemp.map(favorite =>
        this.moviesWithIsFavoriteKey.find(movie => movie.id === favorite)
      );
    },
    // choisi la liste des films afficher en fonction de l'option favori coché/décoché
    listMovies() {
      if (this.checkedFavorites) {
        return this.favoritesMovies;
      } else {
        return this.moviesWithIsFavoriteKey;
      }
    },
    //ordonne les films en fonction du choix croissant/décroissant sélectionnés
    orderMovie() {
      if (this.sortOrderBy === "increasing") {
        return _.orderBy(this.listMovies, this.sortPicked);
      } else {
        return _.orderBy(this.listMovies, this.sortPicked).reverse();
      }
    },
    // permet de rechercher les film via l'input search (v-model) en fonction de leur nom OU année
    searchMovies() {
      return this.orderMovie.filter(movie => {
        return (
          movie.name
            .toString()
            .toLowerCase()
            .includes(this.inputSearch.toLowerCase()) ||
          movie.year
            .toString()
            .toLowerCase()
            .includes(this.inputSearch.toLowerCase())
        );
      });
    }
  },
  //après le template réalisé et les vm :
  //recherche les films dans la bdd
  //initie le tableau idFavoriteMovieTemp
  mounted() {
    this.collectMovies();
    this.idFavoriteMovieTemp = this.idFavoriteMovieStorage;
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

.custom-switch .custom-control-label {
  padding-left: 1rem;
  padding-bottom: 1.5rem;
}

.custom-switch .custom-control-label::before {
  height: 1.5rem;
  width: calc(2rem + 1rem);
  border-radius: 3rem;
  background-color: rgba(0, 0, 0, 0.2);
}

.custom-switch .custom-control-label::after {
  width: calc(1.5rem - 5px);
  height: calc(1.5rem - 5px);
  border-radius: calc(2rem - (1.5rem / 2));
  background-color: #aaa;
}

.custom-control-input:focus ~ .custom-control-label::before {
  border: 2px solid #353d6d !important;
  box-shadow: 0 0 0 0 #42b983 !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #42b983 !important;
  background-color: #42b983 !important;
}

.custom-control-input:active ~ .custom-control-label::before {
  background-color: #42b983 !important;
  border: 2px solid #353d6d !important;
}

.custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
  border: 2px solid #353d6d !important;
}
.custom-switch .custom-control-input:checked ~ .custom-control-label::after {
  transform: translateX(1.45rem);
}
.custom-control-label {
  padding-top: 5px;
  font-size: 20px;
  text-transform: uppercase;
}
.custom-control-input:checked + .custom-control-label {
  font-weight: bold;
}
</style>
