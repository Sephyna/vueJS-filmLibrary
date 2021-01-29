import axios from "axios";
import _ from "lodash";

export default {
  //Principe : data de notre "class" movies global
  state: {
    movies: [],
    movie: null,
    moviesWithIsFavorite: [],
    arrayIdFavStorage: [],
    errors: {
      loadBdd: "",
      addBdd: "",
      movieNotFound: "",
      editMovie: ""
    },
    messagesSuccess: {
      addMovie: "",
      editMovie: ""
    }
  },
  //Principe : props qui modifie nos states pour l'utilisation
  getters: {
    //fonction qui cherche les films en favoris en fonction des id présent dans idFavoriteMovieTemp
    favoritesMovies(state) {
      return state.arrayIdFavStorage.map(favorite =>
        state.moviesWithIsFavorite.find(movie => movie.id === favorite)
      );
    },
    listMovies: (state, getters) => (
      showFavorites,
      sortOrderBy,
      sortPicked,
      inputSearch
    ) => {
      // choisi la liste des films afficher en fonction de l'option favori coché/décoché
      let listMovieWithOrWithoutFavorite;
      if (showFavorites) {
        listMovieWithOrWithoutFavorite = getters.favoritesMovies;
      } else {
        listMovieWithOrWithoutFavorite = state.moviesWithIsFavorite;
      }
      //ordonne les films en fonction du nom/année et croissant/décroissant sélectionnés
      let listSortsChoices;
      if (sortOrderBy === "increasing") {
        listSortsChoices = _.orderBy(
          listMovieWithOrWithoutFavorite,
          sortPicked
        );
      } else {
        listSortsChoices = _.orderBy(
          listMovieWithOrWithoutFavorite,
          sortPicked
        ).reverse();
      }
      // permet de rechercher les film via l'input search (v-model) en fonction de leur nom OU année
      return listSortsChoices.filter(movie => {
        return (
          movie.name
            .toString()
            .toLowerCase()
            .includes(inputSearch.toLowerCase()) ||
          movie.year
            .toString()
            .toLowerCase()
            .includes(inputSearch.toLowerCase())
        );
      });
    }
  },
  // Principe : modif data : envoie aux mutations les datas que l'on veut màj dans nos states
  actions: {
    //collecte liste des films de la bdd ou renvoie une erreur
    async getMovies({ commit }) {
      try {
        const response = await axios.get(
          "https://movies-api.alexgalinier.now.sh/"
        );
        commit("setMovies", response.data);
      } catch (e) {
        commit(
          "setErrorLoad",
          "Erreur de connexion à la base de donnée : " + e
        );
      }
    },
    // fct qui récupère les data du storage (ancien favoris)
    getInitFavoritesMoviesStorage({ commit }) {
      if (localStorage.getItem("favoritesMovies")) {
        let idFavoriteMovieTemp = localStorage
          .getItem("favoritesMovies")
          .split(",");
        commit("setInitFavoritesMoviesStorage", idFavoriteMovieTemp);
      }
    },
    // Ajoute la key IsFavorite en fonction du tableau temporaires des favs
    // (= à celui du storage)
    // elle va attendre qu'on est récupéré les film et les datas du storage !
    async getMoviesWithIsFavoriteKey({ dispatch, commit, state }) {
      await dispatch("getMovies");
      await dispatch("getInitFavoritesMoviesStorage");
      let idFavs = state.arrayIdFavStorage;
      let movies = state.movies;
      let moviesWithFav = movies.map(function(movie) {
        movie.isFavorite = false;
        idFavs.find(function(idFav) {
          if (movie.id === idFav) {
            movie.isFavorite = true;
          }
        });
        return movie;
      });
      commit("setMoviesWithIsFavoriteKey", moviesWithFav);
    },
    // Collecte data d'un film en fonction de l'id dans l'url
    async getMovie({ commit }, { id }) {
      try {
        const response = await axios.get(
          "https://movies-api.alexgalinier.now.sh/"
        );
        let movies = response.data;
        for (let key in movies) {
          if (movies[key].id === id) {
            let dataMovie = movies[key];
            commit("setMovie", dataMovie);
          }
        }
      } catch (e) {
        commit(
          "setErrorLoad",
          "Erreur de connexion à la base de donnée : " + e
        );
      }
    },
    //Permet d'ajouter le nouveau film dans la base de donnée et renvoie à la filmothèque
    async getAddMovieDataBase({ dispatch, commit }, data) {
      try {
        await axios.post("https://movies-api.alexgalinier.now.sh", data);
        await dispatch("getMovies");
        commit("setAddMovie", "Film bien ajouter dans la base de donnée");
      } catch (e) {
        commit(
          "setErrorAddMovie",
          "Erreur de connexion à la base de donnée : " + e
        );
      }
    },
    //Edit un film dans la BDD
    async getEditMovieDatabase({ dispatch, commit }, { id, data }) {
      console.log(id, data);
      try {
        await axios.put(`https://movies-api.alexgalinier.now.sh/${id}`, data);
        await dispatch("getMovies");
        commit("setEditMovie", "Le film a bien été édité.");
      } catch (e) {
        commit("setErrorEditMovie", "Le film n'a pas pu être édité :" + e);
      }
    }
  },
  // Principe : modifie le state. il passe les modification faites dans action, mais il peut aussi
  //faire des modification seul, par exemple pour ouvrir/fermer des modales au clic
  mutations: {
    setMovies(state, payload) {
      state.movies = payload;
    },
    setMovie(state, payload) {
      state.movie = payload;
    },
    setErrorLoad(state, payload) {
      state.errors.loadBdd = payload;
    },
    setMoviesWithIsFavoriteKey(state, payload) {
      state.moviesWithIsFavorite = payload;
    },
    setInitFavoritesMoviesStorage(state, payload) {
      state.arrayIdFavStorage = payload;
    },
    setAddMovie(state, payload) {
      state.messagesSuccess.addMovie = payload;
    },
    setErrorAddMovie(state, payload) {
      state.errors.addBdd = payload;
    },
    setEditMovie(state, payload) {
      state.messagesSuccess.editMovie = payload;
    },
    setErrorEditMovie(state, payload) {
      state.errors.editMovie = payload;
    }
  }
};
