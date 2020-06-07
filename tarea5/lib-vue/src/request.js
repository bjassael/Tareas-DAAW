import axios from 'axios'
import humps from 'lodash-humps'
import store from '@/store'

const service = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

service.interceptors.request.use((config) => {
  const token = store.getters.getToken
  console.log(token)
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }

  return config
})

// response interceptor
service.interceptors.response.use(

  response => {
    response.data = humps(response.data)
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
