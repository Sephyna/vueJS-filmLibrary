<template>
  <div class="movie">
    <!--    rendu d'un film + id passé en parametre de la route-->
    <router-link :to="{ name: 'EditMovie', params: { id: idMovie } }">
      <div
        class="image"
        :style="{ 'background-image': 'url(' + urlMovie + ')' }"
      ></div>
      <div class="infos">
        <p class="title">{{ nameMovie }}</p>
        <p class="date">{{ yearMovie }}</p>
      </div>
    </router-link>
    <!--    checkbox pour ajouter dans les favoris -->
    <span class="favorite">
      <input
        type="checkbox"
        :id="idMovie"
        :name="idMovie"
        :value="idMovie"
        :checked="isFavorite"
        v-on:change="checkedMovie"
        v-model="checked"
      />
      <label :for="idMovie"> 🟊 </label>
    </span>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: {
    idMovie: {
      type: String,
      require: true
    },
    nameMovie: {
      type: String,
      require: true
    },
    urlMovie: {
      type: String,
      require: true
    },
    yearMovie: {
      // type: String,
      require: true
    },
    isFavorite: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {
      checked: null
    };
  },
  methods: {
    //fonction qui créer un tableau avec l'id du film et la valeur bool du check. Elle est envoyé aux parents lors de l'evenement check
    checkedMovie() {
      let dataFavoriteMovie = {
        id: this.idMovie,
        value: this.checked
      };
      this.$emit("checked", dataFavoriteMovie);
      // this.$emit('checked', this.value);
    }
  },
  // watch permet d'attribué la valeur de la props value (issues des parents) à checked pour le v-model qui permet la liaison sur le champs de façon bidirectionnelle dans le component
  watch: {
    isFavorite(newVal) {
      this.checked = newVal;
    }
  },
  // Attribut la valeur parent(value) à la valeur enfant(checked) pour donnée le style
  mounted() {
    this.checked = this.isFavorite;
  }
};
</script>

<style scoped>
.movie {
  width: 380px;
  border-radius: 20px;
  padding: 10px;
  background: #353d6d;
  box-shadow: 0 7px 0 0 rgba(0, 0, 0, 0.2);
}

.infos {
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 5px;
}

.image {
  border-radius: 15px;
  height: 300px;
  width: 100%;
  background-position: 50%;
  background-size: cover;
}

.title {
  font-family: Alfa Slab One, cursive;
  font-size: 22px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  font-size: 20px;
  line-height: 22px;
  color: hsla(0, 0%, 100%, 0.4);
  margin-left: 10px;
}
.favorite {
  -moz-user-select: none; /* Firefox */
  -webkit-user-select: none; /* Chrome, Safari, Opéra depuis la version 15 */
  -ms-user-select: none; /* Internet explorer depuis la version 10 et Edge */
  user-select: none; /* Propriété standard */
}
.favorite input {
  visibility: hidden;
}
.favorite > label {
  font-weight: bold;
  font-size: 200%;
}
.favorite input[type="checkbox"]:checked + label {
  color: #161a33;
  text-shadow: 0 1px 0 white, 0 -1px 0 white;
}
</style>
