<template>
  <componentLayout title="Filmothèque">
    <div class="background">
      <label for="search"></label>
      <input
        id="search"
        type="text"
        v-model="inputSearch"
        placeholder="Search movie.."
      />
      <br />
      <br />
      <br />
      <div v-if="loadingData">
        <div class="wallpaper">
          <componentMovie
            v-for="movie in searchMovies"
            v-bind:key="movie.name"
            :idMovie="movie.id"
            :urlMovie="movie.url"
            :yearMovie="movie.year"
            :nameMovie="movie.name"
          >
          </componentMovie>
<!--          Avec les templates comme précédemment :-->
<!--          <componentMovie-->
<!--            v-for="movie in searchMovies"-->
<!--            v-bind:key="movie.name"-->
<!--            :idMovie="movie.id"-->
<!--          >-->
<!--            <template v-slot:imgMovie>-->
<!--              <div-->
<!--                class="image"-->
<!--                :style="{ 'background-image': 'url(' + movie.url + ')' }"-->
<!--              ></div>-->
<!--            </template>-->
<!--            <template v-slot:nameMovie> {{ movie.name }} </template>-->
<!--            <template v-slot:yearMovie> {{ movie.year }} </template>-->
<!--          </componentMovie>-->
        </div>
      </div>
      <div v-else>
        Chargement .....
      </div>
    </div>
  </componentLayout>
</template>

<script>
import axios from "axios";
import _ from "lodash";

import componentMovie from "./Movie";
import componentLayout from "./Layout";

export default {
  name: "Filmoteque",
  data() {
    return {
      movies: null,
      loadingData: false,
      loadingError: false,
      inputSearch: "",
      title: ""
    };
  },
  components: { componentMovie, componentLayout },
  methods: {
    collectMovies() {
      axios
        .get("https://movies-api.alexgalinier.now.sh/")
        .then(response => {
          this.movies = response.data;
          this.loadingData = true;
        })
        .catch(error => {
          console.log(error);
          this.loadingError = true;
        });
    }
  },
  computed: {
    orderedMovies: function() {
      return _.orderBy(this.movies, "name");
    },
    searchMovies() {
      return this.orderedMovies.filter(movie => {
        return movie.name
          .toLowerCase()
          .includes(this.inputSearch.toLowerCase());
      });
    }
  },
  created() {
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
</style>
