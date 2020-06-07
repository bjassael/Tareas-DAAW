<script>
import { mapState } from 'vuex'
export default {
  name: 'LoginForm',
  computed: mapState(['email', 'password', 'errors']),
  methods: {
    updateEmail (e) {
      this.$store.commit('MUT_EMAIL', { email: e.target.value })
    },
    updatePassword (e) {
      this.$store.commit('MUT_PASSWORD', { password: e.target.value })
    }
  }
}
</script>

<template>
<form>
  <div class="container">
    <hr>

    <label for="email"><b>Email</b></label>
    <input v-bind:class="{ hasError: errors.email }" type="text" placeholder="Enter Email" id="email" @input="updateEmail" :value="email">

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password"  @input="updatePassword" :value="password" id="psw" >

    <hr>

    <button type="submit" class="loginBtn" @click="$store.dispatch('login')">Sign in</button>
  </div>

  <div class="container signIn">
    <p>You don't have an account? <router-link to="Register">Sign up</router-link>.</p>
  </div>
</form>
</template>

<style scoped>
* {box-sizing: border-box}

/* Add padding to containers */
.container {
  padding: 16px;
}

.hasError{
  background-color: rgb(201, 92, 92)!important;
  border-radius: 10px;
  color: white;
  font-weight: bold;
}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.loginBtn {
  background-color: rgb(2, 125, 173);
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.loginBtn:hover {
  opacity:1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signIn {
  background-color: #f1f1f1;
  text-align: center;
}
</style>
