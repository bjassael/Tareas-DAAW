import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: localStorage.getItem('user'),
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {
      email: false,
      passwordConfirmation: false
    }
  },
  mutations: {
    MUT_LOGOUT: state => {
      localStorage.removeItem('user')
      state.user = null
    },
    MUT_LOGIN: state => {
      if (!validateEmail(state.email)) {
        state.errors = { ...state.errors, email: true }
        return
      } else {
        state.errors = { ...state.errors, email: false }
      }
      localStorage.setItem('user', true)
      state.user = true
      state.password = ''
      state.passwordConfirmation = ''
      router.push('Home')
    },
    MUT_REGISTER: state => {
      if (state.password !== state.passwordConfirmation) {
        state.errors = { ...state.errors, passwordConfirmation: true }
        if (!validateEmail(state.email)) {
          state.errors = { ...state.errors, email: true }
          return
        }
        return
      } else {
        state.errors = { ...state.errors, passwordConfirmation: false }
      }
      if (!validateEmail(state.email)) {
        state.errors = { ...state.errors, email: true }
        return
      } else {
        state.errors = { ...state.errors, email: false }
      }
      localStorage.setItem('user', true)
      state.user = true
      state.password = ''
      state.passwordConfirmation = ''
      router.push('Home')
    },
    MUT_EMAIL: (state, payload) => {
      state.email = payload.email
    },
    MUT_PASSWORD: (state, payload) => {
      state.password = payload.password
    },
    MUT_PASSWORD_CONFIRMATION: (state, payload) => {
      state.passwordConfirmation = payload.passwordConfirmation
    }
  },
  actions: {
    logout ({ commit }) {
      commit('MUT_LOGOUT')
    },
    login ({ commit }) {
      commit('MUT_LOGIN')
    },
    register ({ commit }) {
      commit('MUT_REGISTER')
    }
  },
  modules: {},
  getters: {
    isLoggedIn (state) {
      // check if it is logged in
      return state.user
    }
  }
})

// store.subscribe((mutation, state) => {
//   // Store the state object as a JSON string
//   localStorage.setItem('store', JSON.stringify(state))
// })

export default store

function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
