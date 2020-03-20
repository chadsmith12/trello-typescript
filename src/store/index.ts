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
  getters: {
    getTask(state) {
      return (id: string) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id == id) {
              return task;
            }
          }
        }
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [saveStatePlugin]
})

