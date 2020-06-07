import Vue from 'vue'
import Vuex from 'vuex'
import { getOrCreateUserToken, deleteUserToken } from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token')
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },

    LOGOUT: state => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      state.user = null
      state.token = null
    }
  },
  actions: {
    async Login ({ commit }, userData) {
      const response = await getOrCreateUserToken(userData)
      try {
        const { token } = response.data
        commit('SET_TOKEN', token)
      } catch (e) {
        console.log('Login Error:', e)
        throw e
      }
    },
    async logout ({ commit }) {
      const response = await deleteUserToken()
      try {
        if (response.status === 200) {
          commit('LOGOUT')
        }
      } catch (e) {
        if (e.response.status === 401) {
          commit('LOGOUT')
        };
      }
    }
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
