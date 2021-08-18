import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/draw1',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../components/draw1')
        }
      },
      {
        path:'/draw2',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../components/draw2')
        }
      },
      // {
      //   path:'/draw3',
      //   component: function () {
      //     return import(/* webpackChunkName: "about" */ '../components/draw3')
      //   }
      // }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About')
    }
  },
  // {
  //   path: '/draw2',
  //   name: 'draw2',
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../components/draw2')
  //   }
  // },
  // {
  //   path: '/draw3',
  //   name: 'draw3',
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../components/draw3')
  //   }
  // },
  // {
  //   path: '/draw3',
  //   name: 'draw3',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/draw3.vue')
  //   }
  // },
]

const router = new VueRouter({
  mode:'history',
  routes,
})

export default router
