<template>
  <div class="layout">
    <header>
      <componentHeader>
        {{ title }}
      </componentHeader>
    </header>
    <slot class="background"></slot>
  </div>
</template>

<script>
import componentHeader from "./Header";
export default {
  name: "Layout",
  props: {
    title: {
      type: String,
      require: true
    }
  },
  components: { componentHeader }
};
</script>

<style scoped>
.layout {
  height: 100vh;
  background: linear-gradient(160deg, #2c3159, #161a33);
  color: #fff;
  overflow: auto;
}

header {
  height: 20vh;
}
</style>
