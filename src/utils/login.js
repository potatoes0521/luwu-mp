/*
 * @Author: liuYang
 * @description:登录信息
 * @path: "@utils/login"
 * @Date: 2020-06-17 16:04:08
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-20 13:32:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro from '@tarojs/taro'
import {userLogin} from '@services/modules/user'
import Actions from '@store/actions/index.js'

export default {
  async login(back){
    const userInfo = await this.getUserInfo();
    userInfo && await this.useUserInfoLogin(userInfo)
    if (back && userInfo) {
      this.handleBack()
    }
  },
  useUserInfoLogin(params, back) {
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
            Actions.changeUserInfo(
              Object.assign({}, data)
            )
            resolve(data)
            if (back) {
              this.handleBack()
            }
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
          Taro.navigateTo({
            url: '/pages/auth/index'
          })
          resolve(false)
        },
      })
    })
  },
  handleBack() {
    let pages = Taro.getCurrentPages() //  获取页面栈
    let prevPage = pages[pages.length - 2] // 上一个页面
    if(!prevPage) { 
      return 
    }
    prevPage.onLoad()
    Taro.navigateBack()
  }
}

