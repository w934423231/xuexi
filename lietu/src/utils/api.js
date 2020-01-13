import constIpconfig from './constConfig'
import fetch from './request'
export function getCategoryListApi () {
  return fetch({
    url: constIpconfig.path + '/category/categoryList',
    method: 'get'
  })
}
export function getcatetiaozheng (data) {
  return fetch({
    url: constIpconfig.path + '/category/shujutiaozheng',
    method: 'post',
    data
  })
}
export function getshopupload (data, config) {
  return fetch({
    url: constIpconfig.path + '/category/upload',
    method: 'post',
    data,
    config
  })
}

export function zhuangtai (data) {
  return fetch({
    url: constIpconfig.path + '/category/status',
    method: 'post',
    data
  })
}

export function shangpin (data) {
  return fetch({
    url: constIpconfig.path + '/category/shangpin',
    method: 'post',
    data
  })
}

export function getFatCategoryApi () {
  return fetch({
    url: constIpconfig.path + '/category/fatCategoryList',
    method: 'get'
  })
}

export function user () {
  return fetch({
    url: constIpconfig.path + '/category/user',
    method: 'get'
  })
}

export function usernum (data) {
  return fetch({
    url: constIpconfig.path + '/category/usernum',
    method: 'post',
    data
  })
}

export function getshopshuju () {
  return fetch({
    url: constIpconfig.path + '/category/shopshuju',
    method: 'get'
  })
}

export function fenye (data) {
  return fetch({
    url: constIpconfig.path + '/category/fenye',
    method: 'post',
    data
  })
}
export function select (data) {
  return fetch({
    url: constIpconfig.path + '/category/select',
    method: 'post',
    data
  })
}

// 获取子类型列表
export function getSubCategoryApi (params) {
  return fetch({
    url: constIpconfig.path + '/category/subCategoryList',
    method: 'get',
    params
  })
}
export function getshopshujutiaozheng (params) {
  return fetch({
    url: constIpconfig.path + '/category/subCategoryList',
    method: 'get',
    params
  })
}

export function dingdanshuju (data) {
  return fetch({
    url: constIpconfig.path + '/category/dingdanshuju',
    method: 'post',
    data
  })
}

export function userLogin (data) {
  return fetch({
    url: constIpconfig.path + '/user/userlogin',
    method: 'post',
    data
  })
}
