import Vue from 'vue'
import Router from 'vue-router'
// import Category from '@/components/HelloWorld'
import Layout from '@/views/Layout'
import Login from '@/views/login/login'
import Category from '@/views/category/category'
import shopxiangqing from '@/views/shopxiangqing/shopxiangqing'
import user from '@/views/user/user'
import dingdanguanli from '@/views/dingdanguanli/dingdanguanli'
Vue.use(Router)
export const myRouter = [
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    meta: {
      title: '类型管理',
      left: true,
      roles: 'padding'
    },
    redirect: '/layout/category',
    children: [{
      path: 'category',
      name: 'category',
      meta: {
        title: '类型管理',
        left: true,
        roles: 'padding'
      },
      component: Category
    }, {
      path: 'shopxiangqing',
      name: 'shopxiangqing',
      meta: {
        title: '商品管理',
        left: true
      },
      component: shopxiangqing
    }, {
      path: 'user',
      name: 'user',
      meta: {
        title: '用户管理',
        left: true
      },
      component: user
    },
    {
      path: 'dingdanguanli',
      name: 'dingdanguanli',
      meta: {
        title: '订单管理',
        left: true
      },
      component: dingdanguanli
    }
    ]
  }
]
export const asyncRouter = [
  {
    path: '/',
    name: 'Login',
    meta: {
      title: '登陆'
    },
    component: Login
  },
  {
    path: '/',
    redirect: '/'
  }
]
export default new Router({
  routes: asyncRouter
})

// export default new Router({
//   routes: [{
//     path: '/',
//     name: 'login',
//     component: Login
//   },
//   {
//     path: '/layout',
//     name: 'Layout',
//     component: Layout,
//     redirect: '/layout/category',
//     children: [{
//       path: 'category',
//       name: 'category',
//       meta: {
//         title: '类型管理',
//         left: true
//       },
//       component: Category
//     }, {
//       path: 'shopxiangqing',
//       name: 'shopxiangqing',
//       meta: {
//         title: '商品管理',
//         left: true
//       },
//       component: shopxiangqing
//     }, {
//       path: 'user',
//       name: 'user',
//       meta: {
//         title: '用户管理',
//         left: true
//       },
//       component: user
//     },
//     {
//       path: 'dingdanguanli',
//       name: 'dingdanguanli',
//       meta: {
//         title: '订单管理',
//         left: true
//       },
//       component: dingdanguanli
//     }
//     ]
//   },
//   {
//     path: '*',
//     redirect: '/'
//   }
//   ]
// })
