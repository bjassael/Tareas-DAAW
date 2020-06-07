<script>
// import { mapState } from 'vuex'
export default {
  name: 'LoginForm',
  data () {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      openAlert: false,
      usernameRules: [
        { validate: (val) => !!val, message: 'Username must be filled in' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: 'Password must be filled in' },
        { validate: (val) => val.length >= 3 && val.length <= 10, message: 'Password length must be greater than 3 and less than 10' }
      ]
    }
  },
  // computed: mapState(['email', 'password', 'errors']),
  methods: {
    closeAlertDialog () {
      this.openAlert = false
    },
    handleLogin () {
      this.$refs.loginForm.validate().then((valid) => {
        if (valid) {
          this.loading = true
          const { username, password } = this.loginForm

          // Store
          this.$store.dispatch('Login', { username, password }).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch((error) => {
            // Issues Logging in, show errors (an error is not a 200 http status)
            if (error) {
              this.loading = false
              this.openAlert = true
            }
          })
        }
      })
    }
  }
}
</script>

<template>
  <div class="container">

    <mu-form ref="loginForm" :model="loginForm" class="mu-demo-form">

      <mu-form-item label="username" prop="username" :rules="usernameRules">
        <mu-text-field v-model="loginForm.username" prop="username"></mu-text-field>
      </mu-form-item>

      <mu-form-item label="password" prop="password" :rules="passwordRules">
        <mu-text-field type="password" v-model="loginForm.password" prop="password" id="psw"></mu-text-field>
      </mu-form-item>

      <mu-form-item>
        <button type="submit" class="loginBtn" @click="handleLogin">Sign in</button>
      </mu-form-item>

    </mu-form>

    <mu-dialog title="Check Credentials" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      Username or password not valid.
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">close</mu-button>
    </mu-dialog>

  </div>

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
