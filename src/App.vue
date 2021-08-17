<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
  <router-view/> -->

  <div id="main">
    <Home />
  </div>

</template>

<script>
import Home from './views/Home.vue';
export default {
  components: {
    Home
  }
}
</script>

<style scoped lang="scss">
#main {
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
}
</style>
