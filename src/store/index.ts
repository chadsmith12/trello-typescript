import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '@/data/default-board'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: defaultBoard
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
