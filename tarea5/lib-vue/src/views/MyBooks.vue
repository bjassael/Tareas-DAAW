<template>
  <div class="home">
    <h1>
      My Books!
      <router-link to="/my-books/new" class="new-button">
        <mu-button>
          + New Book
        </mu-button>
      </router-link>
    </h1>
    <SearchForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from '@/components/SearchForm.vue'

export default {
  name: 'MyBooks',
  components: {
    SearchForm
  }
}
</script>

<style scoped>
  .new-button {
    margin: 0;
  }
</style>
