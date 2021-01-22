<template>
  <ComponentLayout title="Nouveau film">
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
