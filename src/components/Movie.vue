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
    }
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
</style>
