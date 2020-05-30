import Vue from 'vue'
import VueRouter from 'vue-router'
import ListTutorial from '../components/TutorialsList'
import AddTutorial from '../components/AddTutorial'
import Tutorial from '../components/Tutorial'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'ListTutorial',
    component: ListTutorial
  },
  {
    path: '/tutorials/:id',
    name: 'Tutorial',
    component: Tutorial
  },
  {
    path: '/new-tutorial',
    name: 'AddTutorial',
    component: AddTutorial
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
