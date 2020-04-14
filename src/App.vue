<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,#app{
  height: 100%;
}
body {
	margin: auto 0;
  height: 100%;
}
</style>
