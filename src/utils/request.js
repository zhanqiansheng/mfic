import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = '/mfic-api'
const instance = axios.create({
  baseURL,
  timeout: 20000
})

// 请求拦截器, 携带token
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('mfic-user')).token.token
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    console.log(res.data.code)
    if (res.data.code === 200) {
      return res
    } else {
      // 处理业务失败，给错误提示，抛出异常
      ElMessage.error(res.data.msg || '服务异常')
    }
    return Promise.reject(res.data.data)
  }
  // ,
  // (err) => {
  //   // 错误的特殊情况，权限不足，跳转登录
  //   console.log(err.response)
  //   if (err.response.status === 70001) {
  //     router.push('/login')
  //   }
  //   // 错误的默认情况
  //   ElMessage.error(err.response.data.message || '服务异常')
  //   return Promise.reject(err)
  // }
)

export default instance
export { baseURL }
