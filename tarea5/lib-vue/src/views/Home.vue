<template>
  <div class="home">
    <h1>Books!</h1>
    <SearchForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from '@/components/SearchForm.vue'

export default {
  name: 'Home',
  components: {
    SearchForm
  }
}
</script>
