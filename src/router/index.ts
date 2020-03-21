import Vue from 'vue'
import VueRouter from 'vue-router'
import BoardView from '../views/Board.vue'
import Task from '../views/Task.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'board',
    component: BoardView,
    children: [
      {
        path: 'task/:id',
        name: 'task',
        component: Task
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
