<template>
  <form style="margin-bottom: 17px" @submit.prevent="handleSubmit">
    <h2>Login</h2>

    <label for="email">Email:</label>
    <input id="email" type="email" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input id="password" type="password" name="password" v-model="password" required>

    <button>Login</button>
  </form>
    <span v-if="errorMessage" style="color: white; background-color: #dc3545;padding: 12px 6px ;border-radius: 10px">{{ errorMessage }}</span>
    <span v-if="successMessage" style="color : white;background-color: #198754;padding: 12px 6px ;border-radius: 10px">{{ successMessage }}</span>
</template>

<script setup>
import Cookies from "js-cookie";
import {ref, onMounted} from 'vue'
import router from "../router/index.js"
import {supabase} from '../lib/supabaseClient.js'

const token = ref(Cookies.get('token') || null)

if (token.value) {
  router.push('/')
}
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  const {data, error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    errorMessage.value = error.message
    console.error('Login failed:', error)
  } else {
    successMessage.value = 'Login successful!'
    if (data?.session) {
      Cookies.set('token', data.session.access_token)
      token.value = Cookies.get('token') // reactive آپدیت می‌شود
      router.push('/')
      location.reload()
    }
  }
}

</script>