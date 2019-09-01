import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/recommend'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: () => import(/* webpackChunkName: "singer" */ './views/singer'),
      children: [
        {
          path: ':id',
          component: () => import(/* webpackChunkName: "search" */ './components/singer-detail')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import(/* webpackChunkName: "rank" */ './views/rank')
    },
    {
      path: '/search',
      component: () => import(/* webpackChunkName: "search" */ './views/search')
    }
  ]
})