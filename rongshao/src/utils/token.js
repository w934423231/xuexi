const token = 'AIMIN-TOKEN'
const roles = 'myroles'
export function setToken (tokens) {
  sessionStorage.setItem(token, tokens)
}
export function getToken () {
  return sessionStorage.getItem(token)
}
export function setRoles (tokens) {
  sessionStorage.setItem(roles, tokens)
}
export function getRoles () {
  return sessionStorage.getItem(roles)
}
