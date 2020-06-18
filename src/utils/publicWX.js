/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-18 09:07:52
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 18:26:44
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro from '@tarojs/taro'
import Actions from '@store/actions/index.js'

 /**
  * 获取授权列表查看已授权
  * @return void
  */
export const getSetting = (key) => {
  return new Promise(resolve => {
    Taro.getSetting({
      success(res) {
        if (!key) { 
          resolve(res.authSetting)
        } else {
          if (res.authSetting[`scope.${key}`]) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      }
    })
  })
}

export const openSetting = () => {
  Taro.openSetting({
    success: (res) => {
      console.log('res', res)
    }
  })
}

export const getSystemInfo = () => {
  Taro.getSystemInfo().then(res => {
    res.statusBarHeight *= 2
    res.navHeight = res.statusBarHeight + 90
    Actions.saveSystemInfo(res)
  })
}