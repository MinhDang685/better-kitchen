import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import NavBar from '@/components/NavBar'
import Statistic from '@/components/Statistic'
import Categories from '@/components/Categories'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard
    },
    {
    	path: '/about',
    	component: About
    },
    {
    	path: '/login',
    	component: Login
    },
    {
      path: '/statistic',
      component: Statistic
    },
    {
      path: '/categories',
      component: Categories
    },

  ]
})
