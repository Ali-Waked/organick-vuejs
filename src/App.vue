<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
// sessionStorage.setItem("isAuth", true);
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 100vw;
  // overflow: hidden;
}

nav {
  a {
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
