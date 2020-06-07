import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: localStorage.getItem('user')
  },
  mutations: {
    MUT_LOGOUT: state => {
      localStorage.removeItem('user')
      state.user = null
    },
    MUT_LOGIN: state => {
      localStorage.setItem('user', true)
      state.user = true
    }
  },
  actions: {
    logout ({ commit }) {
      commit('MUT_LOGOUT')
    },
    login ({ commit }) {
      commit('MUT_LOGIN')
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
