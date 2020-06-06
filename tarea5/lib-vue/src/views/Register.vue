<template>
  <div class="register">
    <h1>Create your account!</h1>
    <RegisterForm />
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'Register',
  components: {
    RegisterForm
  }
}
</script>
