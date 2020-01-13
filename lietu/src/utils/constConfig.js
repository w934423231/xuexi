// 1、开发环境
// 开发域名 http://192.12.34.23:8080
//  2、测试环境
// 测试域名 http://10.32.88.89:9000
// 3 、uat环境
//  http://www.uatapi.com
// 4 、线上环境
//  http://www.laoda.com
let arr = [
  {
    path: 'http://lietu.free.idcfengye.com',
    img: 'http://192.12.34.63:8080'
  },
  {
    path: 'http://www.testapi.com',
    img: 'http://192.12.24.63:8080'
  },
  {
    path: 'http://www.uatapi.com',
    img: 'http://192.12.24.63:8080'
  },
  {
    path: 'http://www.api.com',
    img: 'http://192.12.24.63:8080'
  }
]
const index = 0
export default arr[index]
