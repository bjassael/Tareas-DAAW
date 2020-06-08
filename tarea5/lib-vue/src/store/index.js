import Vue from 'vue'
import Vuex from 'vuex'
import { getOrCreateUserToken, deleteUserToken } from '@/api'
import moduleBooks from './modules/books'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token')
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    logout: state => {
      localStorage.removeItem('token')
      state.token = null
    }
  },
  actions: {
    async Login ({ commit }, userData) {
      const response = await getOrCreateUserToken(userData)
      try {
        const { token } = response.data
        commit('setToken', token)
      } catch (e) {
        console.log('Login Error:', e)
        throw e
      }
    },
    async logout ({ commit }) {
      return await deleteUserToken()
        .then(() => {
          commit('logout')
          router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
    books: moduleBooks
  },
  getters: {
    getToken: state => {
      if (state.token) return state.token
      return null
    },
    isLoggedIn (state) {
      // check if it is logged in
      return state.token
    }
  }
})

export default store
