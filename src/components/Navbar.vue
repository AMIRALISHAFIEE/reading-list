<template>
  <div>
    <nav>
      <h1>My Book List</h1>
      <!-- for logged in users -->
      <div>
        <router-link v-if="token" to="/">Home</router-link>
        <button v-if="token" @click="logout">Logout</button>
      </div>
      <!-- for logged out users -->
      <div>
        <router-link v-if="!token" to="/login">Login</router-link>
        <router-link v-if="!token" to="/signup">Signup</router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {supabase} from "@/lib/supabaseClient.js";
import Cookies from "js-cookie";
import router from "@/router/index.js"
const token = ref(null)

onMounted(() => {
  token.value = Cookies.get('token') || null
})

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  Cookies.remove('token')
  if (!error) {
    router.push('/login') // redirect to login
  }
  location.reload()
}

</script>

<style>
nav {
  display: flex;
  align-items: center;
}
nav h1 {
  margin-right: auto;
  margin-bottom: 0;
}
nav a {
  margin-left: 16px;
  color: #2c3e50;
}
nav button {
  margin-left: 16px;
}
nav a.router-link-exact-active {
  color: #0ec58e;
}
nav + p {
  margin-top: 0;
  margin-bottom: 30px;
}
</style>