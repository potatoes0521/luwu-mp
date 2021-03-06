/*
 * @Author: liuYang
 * @description: 公共请求处理
 * @path: 引入路径
 * @Date: 2020-06-15 10:13:50
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 16:07:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import Actions from '@store/actions'
import {
  HTTP_STATUS,
  defaultApiURL
} from '@config/request_config'
import store from '@store/index'
import { getStorage, setStorage } from '@utils/storage'

let token = ''
store.subscribe(() => {
  let state = store.getState(); //Redux数据state tree，由于使用了subscribe，当数据更改时会重新获取
  token = state.user_msg.userInfo.token
})
// import createSignData from './secret'
const isProd = process.env.NODE_ENV === "production";

// const signId = 'wx90c791e28c3c7d4d'
const contentType = 'application/json;charset=UTF-8'
export const appVersion = '1.0.1'

export default {
  baseOptions(url, data, loadingTitle, method) {
    let loadingTimer = null
    for (const i in data) {
      if (data[i] === '' && i !== 'locationId') {
        delete data[i]
      }
    }
    let requestURL = url.startsWith('http') ? url : defaultApiURL + url
    console.log(data, '接口是' + url)
    if (loadingTitle) {
      if (method === 'POST') {
        Taro.showLoading({
          title: loadingTitle,
          mask: true
        })
      } else {
        loadingTimer = setTimeout(() => {
          Taro.showLoading({
            title: loadingTitle,
            mask: true
          })
        }, 350)
      }
    }
    return new Promise((resolve, reject) => {
      Taro.request({
        url: requestURL,
        data: data,
        method,
        header: {
          'content-type': contentType,
          "X-Ca-Stage": isProd ? "release" : "test",
          // "X-Ca-Stage": "test",
          Authorization: token || ''
          // 'sign': sign || '',
        },
        success(res) {
          if (loadingTitle) {
            Taro.hideLoading()
            clearTimeout(loadingTimer)
            loadingTimer = null
          }
          if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            Taro.showToast({
              title: '请求资源不存在',
              icon: 'none',
              duration: 2000
            })
            reject(url + '接口出现问题 404')
          } else if (res.statusCode === HTTP_STATUS.CLIENT_ERROR) {
            Taro.showToast({
              title: '参数缺失',
              icon: 'none',
              duration: 2000
            })
            reject(url + '接口出现问题 参数缺失')
          } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            Taro.showToast({
              title: '服务端出现了问题',
              icon: 'none',
              duration: 2000
            })
            reject(url + '接口出现问题, 500')
          } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
            Taro.showToast({
              title: '无权限访问',
              icon: 'none',
              duration: 2000
            })
            reject(url + '接口出现问题, 403')
          } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
            if (res.data) {
              const resData = res.data
              // '200002' 是未注册
              console.log(resData, '接口是' + url)
              if (resData){
                resolve(resData)
              } else {
                if (+resData.code === 200003) {
                  console.log('token 无效')
                  Actions.loginOut({});
                  Taro.reLaunch({
                    url: '/pages/register/index?pageType=token'
                  })
                } else {
                  Taro.showToast({
                    title: resData.message,
                    icon: 'none',
                    duration: 2000
                  })
                  reject(url + '接口出现问题')
                  // backReload(1800)
                }
              }
            } else {
              reject(url + '接口出现问题')
            }
          }
        },
        fail(error) {
          clearTimeout(loadingTimer)
          Taro.showToast({
            title: '网络连接超时',
            icon: 'none'
          })
          reject(url + '接口出现问题' + error)
        }
      })
    })
  },
  get(url, data, loadingTitle = '加载中...') {
    return this.baseOptions(url, data, loadingTitle, 'GET')
  },
  post(url, data, loadingTitle = '提交中...') {
    return this.baseOptions(url, data, loadingTitle, 'POST')
  },
  put(url, data, loadingTitle = '提交中...') {
    return this.baseOptions(url, data, loadingTitle, 'PUT')
  },
  /**
   * 处理缓存的
   * @param {String} url 要请求的URL
   * @param {Object} data 参数
   * @param {Sting || Boolean} loadingTitle='加载中...' loading
   * @param {String} storageKey 缓存名字
   * @param {Boolean} paramsBool 额外参数
   * @param {Number} timer 缓存是几分钟
   * @param {Number} notStorage 这次请求是否不走缓存  如果是true就直接去请求
   * @return void
   */
  async storageGet({
      url,
      data,
      loadingTitle = '加载中...',
      storageKey,
      paramsBool,
      timer = 5,
      notStorage = false
    }) {
    const storageData = await getStorage(storageKey)
    let dataArr = null
    if (!notStorage && paramsBool && storageData && +storageData.timer && +storageData.timer - (+new Date) < timer * 60000) {
      dataArr = storageData.data
    } else {
      dataArr = await this.get(url, data, loadingTitle)
      setStorage(storageKey, {
        timer: +new Date(),
        data: dataArr
      })
    }
    return dataArr
  }
}