<template>
  <header>
    <!--    Titre de la page => Layout-->
    <h1><slot>Titre</slot></h1>
    <button>
      <!--      bouton qui redirige vers l'ajoute d'un film-->
      <router-link to="/nouveau-film">Ajouter un film</router-link>
    </button>
  </header>
</template>

<script>
export default {
  name: "Hearder"
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 5px;
}

header > button {
  width: 200px;
  border-radius: 20px;
  padding: 10px;
  background: #9184cc;
  box-shadow: 0 7px 0 0 rgba(0, 0, 0, 0.2);
  color: white;
}
a {
  text-decoration: none !important;
  color: white !important;
}
</style>
