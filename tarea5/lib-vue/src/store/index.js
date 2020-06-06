import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 1
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isLoggedIn () {
      // check if it is logged in
      return true
    }
  }
})
