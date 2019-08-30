import axios from 'axios'

const baseURL = 'http://localhost:3000'
let instance = axios.create({
  baseURL,
  timeout: 5000,
})

instance.interceptors.response.use(
  res => (res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)),
  error => {
    const { response } = error
    return Promise.reject(response)
  },
)

export function get(url, param) {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params: param,
    })
      .then(res => {
        //axios返回的是一个promise对象
        resolve(res) //resolve在promise执行器内部
      })
      .catch(err => {
        console.log(err, '异常')
        reject(err)
      })
  })
}
export function post(url, param) {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data: param,
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err, '异常')
        reject(err)
      })
  })
}
