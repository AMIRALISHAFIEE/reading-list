<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="container">
    <Navbar />
    <router-view />
  </div>
</template>

<style>

body {
  background: #f2f2f2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  max-width: 560px;
  margin: 0 auto;
}
form label, form input {
  display: block;
}
form input {
  padding: 4px;
  margin-top: 10px;
  margin-bottom: 20px;
}
button {
  background: #0ec58e;
  color: #fff;
  border: 0;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
}
</style>
