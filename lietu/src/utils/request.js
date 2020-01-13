import axios from 'axios'

const service = axios.create({
  // baseURL:'http://localhost/api',
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // request timeout
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  // config.headers.CorpCode='23445'
  // config.headers.Authorization = 'abc'
  // config.headers.Token='tokenskfl'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
