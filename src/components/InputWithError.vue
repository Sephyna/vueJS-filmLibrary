<template>
  <!--  récupère les data du form et écoute l'input pour emettre sa valeur au component formMovie-->
  <div class="inputWithError">
    <label v-bind:for="idInput">{{ label }}</label>
    <input
      v-bind:type="type"
      v-bind:name="idInput"
      v-bind:id="idInput"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
    <div v-if="errors.length">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputWithError",
  props: {
    idInput: {
      type: String,
      require: true
    },
    label: {
      type: String,
      require: true
    },
    errors: {
      type: Array,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    value: {
      default: ""
    }
  }
};
</script>

<style scoped></style>
