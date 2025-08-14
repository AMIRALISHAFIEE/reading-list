<template>
  <form @submit.prevent="handleSubmit">
    <h3>Add a New Book</h3>

    <label for="title">Book title:</label>
    <input type="text" name="title" v-model="title" required>

    <label for="author">Book author:</label>
    <input type="text" name="author" v-model="author" required>

    <button @click="handleSubmit">Add Book</button>
  </form>
</template >
<script setup>
import {ref, onMounted} from 'vue'
import {supabase} from "@/lib/supabaseClient.js";
const success = ref(false)
const errorMessage = ref('')
const title = ref('')
const author = ref('')

const handleSubmit = async () => {
  const { data, error } = await supabase
      .from('books')
      .insert([
        { book_title: title.value, book_author: author.value }
      ])
  if (error) {
    errorMessage.value = error.message
  } else {
    console.log(data)
    success.value = true
    title.value = ''
    author.value = ''
  }
}


</script>

<style>
form {
  padding: 10px;
  margin-top: 10px;
  border: 1px dashed #c3c8ce;
}
</style>