
import fetch from './requst'
import requsturl from './requsturl'

// 查看商品数据

export function shopdataselect () {
  return fetch({
    url: requsturl.path + '/vue/shopdata/select',
    method: 'get'
  })
}

// 添加商品数据

export function shopdatainert (data) {
  return fetch({
    url: requsturl.path + '/vue/shopdata/insert',
    method: 'post',
    data
  })
}

// 更改商品数据

export function shopdataupdata (data) {
  return fetch({
    url: requsturl.path + '/vue/shopdata/updata',
    method: 'post',
    data
  })
}

// 商品数据删除

export function shopdatadelete (data) {
  return fetch({
    url: requsturl.path + '/vue/shopdata/delete',
    method: 'post',
    data
  })
}
// 查看商品数据类型

export function selectshoptype () {
  return fetch({
    url: requsturl.path + '/vue/shoptype/select',
    method: 'get'
  })
}

// 添加商品数据类型

export function addshoptype (data) {
  return fetch({
    url: requsturl.path + '/vue/shoptype/append',
    method: 'post',
    data
  })
}

// 更改商品数据类型

export function updateshoptype (data) {
  return fetch({
    url: requsturl.path + '/vue/shoptype/update',
    method: 'post',
    data
  })
}

// 删除商品数据类型

export function delshoptype (data) {
  return fetch({
    url: requsturl.path + '/vue/shoptype/delete',
    method: 'post',
    data
  })
}

// 查询商品订单数据

export function selectorderdata () {
  return fetch({
    url: requsturl.path + '/vue/order/select',
    method: 'get'
  })
}
// 查询用户信息
export function userselect () {
  return fetch({
    url: requsturl.path + '/vue/user/select',
    method: 'get'
  })
}
// 查询地址信息
export function addressselect () {
  return fetch({
    url: requsturl.path + '/vue/address/select',
    method: 'get'
  })
}

// vue页面登录
export function userLogin (data) {
  return fetch({
    url: requsturl.path + '/vue/login/userlogin',
    method: 'post',
    data
  })
}

export function updataorder (data) {
  return fetch({
    url: requsturl.path + '/vue/order/updata',
    method: 'post',
    data
  })
}
