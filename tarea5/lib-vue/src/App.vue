<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link class="linkNav" to="/">Bookies!</router-link></li>
        <li style="float:right" v-if="$store.getters.isLoggedIn"><router-link to="#"><a class="linkNav" @click="$store.dispatch('logout')">Logout</a></router-link></li>
        <li style="float:right" v-if="$store.getters.isLoggedIn"><router-link class="linkNav" to="/my-books">My Books</router-link></li>
        <li style="float:right" v-if="!$store.getters.isLoggedIn"><router-link class="linkNav" to="/login">Sign In</router-link></li>
        <li style="float:right" v-if="!$store.getters.isLoggedIn"><router-link class="linkNav" to="/register">Sign Up</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 0;
  .linkNav {
    font-weight: bold;
    color: white;
    &.router-link-exact-active {
      background-color: #D22C21;
    }
  }
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(9, 94, 122);
}

li {
  float: left;
}

li .linkNav{
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li .linkNav:hover:not(.active) {
  background-color: rgb(5, 65, 88);
}

.active {
  background-color: #D22C21;
}
</style>
