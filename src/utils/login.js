/*
 * @Author: liuYang
 * @description:登录信息
 * @path: 引入路径
 * @Date: 2020-06-17 16:04:08
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 16:13:37
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro from '@tarojs/taro'
import {userLogin} from '@services/modules/user'
import Actions from '@store/actions/index.js'

export default {
  useUserInfoLogin(params) {
    return new Promise(resolve => {
      const {
        userInfo,
        signature,
        iv,
        encryptedData
      } = params
      Actions.changeUserInfo(
        Object.assign({}, userInfo, {
          signature,
          iv,
          encryptedData
        })
      )
      Taro.login({
        success: (res) => {
          let sendData = {
            appId: "wx08071be1bdb33e0c",
            code: res.code,
            encryptedData,
            iv,
            signature,
          }
          userLogin(sendData).then(data => {
            resolve(data)
          })
        }
      })
    })
  },
  /**
   * 获取用户授权
   * @return void
   */
  getUserInfo() { 
    return new Promise(resolve => {
      Taro.getUserInfo({
        lang: 'zh_CN',
        success: (res) => {
          resolve(res)
        },
        fail: () => {
          resolve(false)
        }
      })
    })
  }
}