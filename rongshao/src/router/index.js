import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/register'
Vue.use(Router)

export const myRouter = [
  {
    path: '/product',
    name: 'product',
    meta: {
      title: '产品列表'
    },
    component: () => import('@/view/product')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: '订单列表'
    },
    component: () => import('@/view/oreder')
  }
]
export const asyncRouter = [
  {
    path: '/',
    name: 'HelloWorld',
    meta: {
      title: '登陆'
    },
    component: HelloWorld
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册'
    },
    component: Register
  },
  {
    path: '/',
    redirect: '/'
  }
]
export default new Router({
  routes: asyncRouter
})
