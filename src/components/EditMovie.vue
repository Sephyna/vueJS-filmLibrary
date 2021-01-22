<template>
  <ComponentLayout :title=titlePage>
    <componentMovie
      :idMovie="idMovie"
      :urlMovie="urlMovie"
      :yearMovie="yearMovie"
      :nameMovie="nameMovie"
    >
    </componentMovie>
    <br />
    <br />
<!--    avec Slot-->
<!--    <ComponentMovie v-if="typeForm === 'editMovie'" :idMovie="movieData.id">-->
<!--      <template v-slot:imgMovie>-->
<!--        <div-->
<!--          class="image"-->
<!--          :style="{ 'background-image': 'url(' + movieData.url + ')' }"-->
<!--        ></div>-->
<!--      </template>-->
<!--      <template v-slot:nameMovie> {{ movieData.name }} </template>-->
<!--      <template v-slot:yearMovie> {{ movieData.year }} </template>-->
<!--    </ComponentMovie>-->
    <ComponentForm typeForm="editMovie"></ComponentForm>
  </ComponentLayout>
</template>

<script>
import ComponentLayout from "./Layout";
import ComponentForm from "./FormMovie";
import ComponentMovie from "./Movie"

export default {
  name: "EditMovie",
  data() {
    return {
      title: "",
      idMovie: "",
      nameMovie:"",
      urlMovie:"",
      yearMovie:""
    };
  },
  components: { ComponentLayout, ComponentForm,ComponentMovie },
  computed: {
    titlePage() {
      return "Editer le film" + this.nameMovie;
    }
  },
  created() {
    this.idMovie = this.$route.params.id;
    this.nameMovie = this.$route.params.name;
    this.urlMovie = this.$route.params.url;
    this.yearMovie = this.$route.params.year;
  }
};
</script>
<style scoped>
* {
  margin: 0 auto
}
</style>
