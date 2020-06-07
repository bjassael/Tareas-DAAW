<template>
  <div class="register">
    <h1>New Book!</h1>
    <NewBookForm />
  </div>
</template>

<script>
// @ is an alias to /src
import NewBookForm from '@/components/NewBookForm.vue'

export default {
  name: 'NewBook',
  components: {
    NewBookForm
  }
}
</script>
