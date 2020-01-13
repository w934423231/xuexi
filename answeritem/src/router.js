import Vue from 'vue'
import Router from 'vue-router'
import layout from './views/Layout'
import shopList from './views/shopList/shopList'
import user from './views/user/user.vue'
import shoptype from './views/shopType/shopType.vue'
import order from './views/order/order.vue'
import address from './views/address/address.vue'
import login from './views/login/login.vue'

Vue.use(Router)

export const myRouter = [
  {
    path: '/',
    name: '商品管理',
    component: layout,
    meta: {
      title: '类型管理',
      left: true,
      roles: 'padding'
    },
    redirect: '/shopList',
    children: [{
      path: 'shopList',
      name: '商品列表',
      meta: {
        left: true,
        roles: 'padding'
      },
      component: shopList
    }, {
      path: 'user',
      name: '用户管理',
      meta: {
        title: '用户管理',
        left: true,
        roles: 'padding'
      },
      component: user
    }, {
      path: 'shoptype',
      name: '商品类型',
      meta: {
        title: '用户管理',
        left: true,
        roles: 'padding'
      },
      component: shoptype
    },
    {
      path: 'address',
      name: '地址管理',
      meta: {
        title: '用户管理',
        left: true,
        roles: 'padding'
      },
      component: address
    },
    {
      path: 'order',
      name: '订单管理',
      meta: {
        title: '用户管理',
        left: true,
        roles: 'padding'
      },
      component: order
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
    component: login
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
//   // mode: 'history',
//   // base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: '商品管理',
//       component: layout,
//       meta: {
//         title: '类型管理',
//         left: true,
//         roles: 'padding'
//       },
//       redirect: '/shopList',
//       children: [{
//         path: 'shopList',
//         name: '商品列表',
//         meta: {
//           left: true,
//           roles: 'padding'
//         },
//         component: shopList
//       }, {
//         path: 'user',
//         name: '用户管理',
//         meta: {
//           title: '用户管理',
//           left: true,
//           roles: 'padding'
//         },
//         component: user
//       }, {
//         path: 'shoptype',
//         name: '商品类型',
//         meta: {
//           title: '用户管理',
//           left: true,
//           roles: 'padding'
//         },
//         component: shoptype
//       },
//       {
//         path: 'address',
//         name: '地址管理',
//         meta: {
//           title: '用户管理',
//           left: true,
//           roles: 'padding'
//         },
//         component: address
//       },
//       {
//         path: 'order',
//         name: '订单管理',
//         meta: {
//           title: '用户管理',
//           left: true,
//           roles: 'padding'
//         },
//         component: order
//       }
//       ]
//     }
//   ]
// })
