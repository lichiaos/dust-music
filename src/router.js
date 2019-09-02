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
      component: Recommend,
      children: [
        {
          path: ':id',
          component: () => import(/* webpackChunkName: "recommend" */ './components/disc/disc')
        }
      ]
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
      component: () => import(/* webpackChunkName: "rank" */ './views/rank'),
      children: [
        {
          path: ':id',
          component: () => import(/* webpackChunkName: "rank" */ './components/top-list/top-list')
        }
      ]
    },
    {
      path: '/search',
      component: () => import(/* webpackChunkName: "search" */ './views/search')
    }
  ]
})
