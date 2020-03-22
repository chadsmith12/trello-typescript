import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '@/data/default-board'
import BoardState from '@/store/BoardState';
import { saveStatePlugin, uuid } from "@/utils/utils";

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
    CREATE_TASK(_state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        tasks: [],
        name: name
      });
    },
    UPDATE_TASK(_state, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(_state, { fromColumn, toColumn, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromColumn.splice(fromTaskIndex, 1)[0];
      toColumn.splice(toTaskIndex, 0, taskToMove);
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];

      columnList.splice(toColumnIndex, 0, columnToMove);
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [saveStatePlugin]
})

