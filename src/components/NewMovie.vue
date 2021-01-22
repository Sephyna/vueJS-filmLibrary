<template>
  <ComponentLayout title="Nouveau film">
    <!--    affiche un formulaire en précisant la props du type de formulaire-->
    <ComponentForm typeForm="addMovie"></ComponentForm>
  </ComponentLayout>
</template>

<script>
import ComponentLayout from "./Layout";
import ComponentForm from "./FormMovie";

export default {
  name: "FormMovie",
  data() {
    return {
      title: ""
    };
  },
  components: { ComponentLayout, ComponentForm }
};
</script>

<style scoped></style>
