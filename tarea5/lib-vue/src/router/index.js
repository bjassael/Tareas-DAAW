import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyBooks from '../views/MyBooks.vue'
import Login from '../views/Login.vue'
import NewBook from '../views/NewBook.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/my-books',
    name: 'MyBooks',
    meta: {
      requiresAuth: true
    },
    component: MyBooks
    // beforeEnter: (to, from, next) => {
    //   if (!store.getters.isLoggedIn) {
    //     next({ name: 'Login' })
    //   } else {
    //     next() // go to wherever I'm going
    //   }
    // }
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: 'false'
    },
    component: Login
  },
  {
    path: '/my-books/new',
    name: 'New Book',
    meta: {
      requiresAuth: 'true'
    },
    component: NewBook
  }
]

const router = new VueRouter({
  routes
})

export default router
