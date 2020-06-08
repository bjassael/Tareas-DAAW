
<template>
  <form>
    <div class="container">
      <p>Please fill in this form to add a new book to your library.</p>
      <hr />

      <label for="name">
        <b>Name</b>
      </label>
      <input type="text" placeholder="Enter Book Name" @input="setName" id="name" :value="newName" required />

      <label for="authors">
        <b>Author</b>
      </label>
      <input type="text" placeholder="Author First Name" @input="setAuthorsFirstname" id="authorsFirstname" :value="newAuthorsFirstname" required />
      <input type="text" placeholder="Author Last Name" @input="setAuthorsLastname" id="authorsLastname" :value="newAuthorsLastname" required />

      <label for="genres">
        <b>Genre</b>
      </label>
      <input type="text" placeholder="Enter Book Genre" @input="setGenres" id="genres" :value="newGenres" required />
      <hr />

      <button type="submit" class="registerBtn" @click="$store.dispatch('postBook')">Add Book</button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NewBook',
  computed: mapState(['newName', 'newAuthorsFirstname', 'newAuthorsLastname', 'newGenres']),
  methods: {
    setName (e) {
      this.$store.commit('setBookName', { newName: e.target.value })
    },
    setAuthorsFirstname (e) {
      this.$store.commit('setBookAuthorsFirstname', { newAuthorsFirstname: e.target.value })
    },
    setAuthorsLastname (e) {
      this.$store.commit('setBookAuthorsLastname', { newAuthorsLastname: e.target.value })
    },
    setGenres (e) {
      this.$store.commit('setBookGenres', { newGenres: e.target.value })
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
/* Add padding to containers */
.container {
  padding: 16px;
}
/* Full-width input fields */
input[type="text"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}
/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
/* Set a style for the submit/register button */
.registerBtn {
  background-color: rgb(2, 125, 173);
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}
.registerBtn:hover {
  opacity: 1;
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
