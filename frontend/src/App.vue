<template>
  <div>
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
import Auth from './components/auth/Auth.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    Auth, NavBar
  }
}
</script>

<style src="./assets/style.css"> 
</style>
