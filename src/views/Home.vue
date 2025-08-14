<template>
  <div class="home">
    <ul>
      <li v-for="book in books" :key="book.id">
        <div class="details">
          <h3>{{ book.book_title }}</h3>
          <p>By {{ book.book_author }}</p>
        </div>
        <div @click="deleteBook(book.id)" class="icon">
          <span class="material-icons">delete</span>
        </div>
      </li>
    </ul>
    <CreateBookForm/>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import Cookies from 'js-cookie'
import CreateBookForm from '../components/CreateBookForm.vue'
import router from "@/router/index.js";
import {supabase} from "@/lib/supabaseClient.js";

const token = Cookies.get('token')
if (token) {
  console.log(token)
} else {
  router.push('/login')
}
const books = ref([])
onMounted(async () => {
  const {data, error} = await supabase.from('books').select('*')
  if (data) books.value = data
  console.log(data)
})
const deleteBook = async (id) => {
  const {error} = await supabase
      .from('books')
      .delete()
      .eq('id', id)
  if (!error) {
    // Remove from local state so UI updates without refresh
    books.value = books.value.filter(book => book.id !== id)
  } else {
    console.error('Error deleting book:', error)
  }
}
</script>

<style>
.home ul {
  padding: 0;
}

.home li {
  list-style-type: none;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
}

.home li .details {
  margin-right: auto;
}

.home li h3 {
  margin: 0;
  margin-bottom: 4px;
}

.home li h3:hover {
  cursor: pointer;
  text-decoration: line-through;
}

.home li p {
  margin: 0;
}

.icon {
  color: #bbbbbb;
  cursor: pointer;
}
</style>