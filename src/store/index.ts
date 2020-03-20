import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '@/data/default-board'
import BoardState from '@/store/BoardState';
import { saveStatePlugin } from "@/utils/utils";

Vue.use(Vuex)

const boardString = localStorage.getItem('board');
const board = boardString != null ? JSON.parse(boardString) : defaultBoard;

export default new Vuex.Store<BoardState>({
  state: {
    board
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [saveStatePlugin]
})

