<template>
  <form style="margin-bottom: 15px" @submit.prevent="handleSubmit">
    <h2>Sign up</h2>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" autocomplete="current-password" v-model="password" required>

    <label for="phone">Phone:</label>
    <input type="phone" name="phone" v-model="phone" required>

    <button>Sign up</button>
  </form>
  <span v-if="errorMessage" style="background-color: #dc3545;padding: 12px 6px ;border-radius: 10px">{{ errorMessage }}</span>
  <span v-if="successMessage" style="background-color: #ffc107;padding: 12px 6px ;border-radius: 10px" >{{ successMessage }}</span>
</template>

<script setup>
import {ref , onMounted} from 'vue'
import Cookies from 'js-cookie'
import router from "../router/index.js"
import {supabase} from "@/lib/supabaseClient.js";

const token = Cookies.get('token')
if (token) {
  router.push('/')
}

const email = ref('')
const password = ref('')
const phone = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  const {data, error} = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
  if (error) {
    errorMessage.value = error.message
  } else {
    console.log(data)
    successMessage.value = 'Check your email'
  }
}
</script>