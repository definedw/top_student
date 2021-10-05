import axios from 'axios'
import router from '@/router'

import { maskShow, maskHide } from 'utils/helper'
import { ElMessage } from 'element-plus'

import {
  baseUrl,
  contentType,
  requestTimeout,
  timeNum,
  intervalTime,
  resCode,
  reToken
} from '@/common/netconfig'
import { localGet } from './helper'

const PROTECTED = Symbol()

class Request {
  [PROTECTED] = {
    service: axios,
    axiosConfig: {},
    pending: [],
    cancelToken: axios.CancelToken
  }
  static _instance = Request

  constructor() {
    this.requestConfig()
    this[PROTECTED].service = axios.create(this[PROTECTED].axiosConfig)
    this.interceptorsRequest()
    this.interceptorsResponse()
  }
  requestConfig() {
    this[PROTECTED].axiosConfig = {
      baseURL: baseUrl,
      headers: {
        post: {
          'Content-Type': contentType
        }
      },
      timeout: requestTimeout
    }
  }
  interceptorsRequest() {
    this[PROTECTED].service.interceptors.request.use(
      (config) => {
        const keyOfRequest = this.getKeyofRequest(config)
        this.removePending(keyOfRequest, true)
        config.cancelToken = new this[PROTECTED].cancelToken((c) => {
          this[PROTECTED].pending.push({
            url: keyOfRequest,
            cancel: c
          })
        })
        config.headers['authorization'] = localGet('token')
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
  interceptorsResponse() {
    this[PROTECTED].service.interceptors.response.use(
      (response) => {
        maskHide()
        return this.handleResponse(response)
      },
      (error) => {
        const { response } = error
        if (response === undefined) {
          return Promise.reject(error)
        } else {
          return this.handleResponse(response)
        }
      }
    )
  }
  handleResponse(response) {
    this.removePending(this.getKeyofRequest(response.config))

    const { code, msg, result } = response.data

    switch (code) {
      case 204: {
        return Promise.resolve({ result, msg, code })
      }
      case 401:
      case 404:
      case 406:
      case 500: {
        ElMessage({
          type: 'error',
          message: msg,
          duration: 3500
        })
        return Promise.reject({ msg })
      }
      case 403: {
        ElMessage({
          type: 'error',
          message: 'Sorry,you need to login or register first.',
          duration: 3500
        })
        // reToken = true
        router.push('/login')
        return Promise.reject({ msg })
      }
      default: {
        return Promise.reject({ msg })
      }
    }
  }
  removePending(key, request = false) {
    this[PROTECTED].pending.some((item, index) => {
      if (item.url === key) {
        if (request) {
          console.log('==========Cancel repeat request==========', item)
          item.cancel()
          this[PROTECTED].pending.splice(index, 1)
          return true
        }
        return false
      }
    })
  }
  getKeyofRequest(config) {
    let { url: key } = config
    if (config.params) key += JSON.stringify(config.params)
    if (config.data) key += JSON.stringify(config.data)
    key += `&request_type=${config.method}`
    return key
  }
  responseLog(response) {
    if (import.meta.env.MODE === 'development') {
      const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`
      console.log(
        '%c┍------------------------------------------------------------------┑',
        `color:${randomColor};`
      )
      console.log('| 请求地址：', response.config.url)
      console.log('| 请求参数：', JSON.parse(response.config.data))
      console.log('| 返回数据：', response.data)
      console.log(
        '%c┕------------------------------------------------------------------┙',
        `color:${randomColor};`
      )
    }
  }
  post(url, data, config) {
    maskShow()
    return new Promise((resolve, reject) => {
      this[PROTECTED].service.post(url, data, config).then((res) => {
        resolve({
          msg: res.msg,
          data: res.result,
          code: res.code
        })
      }, reject)
    })
  }
  get(url, params, config) {
    return new Promise((resolve, reject) => {
      this[PROTECTED].service.get(url, params, config).then((res) => {
        resolve({
          msg: res.msg,
          data: res.result,
          code: res.code
        })
      }, reject)
    })
  }
  static getInstance() {
    this._instance || (this._instance = new Request())
    return this._instance
  }
}
const MyRequest = new Request()
export default MyRequest
