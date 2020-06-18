/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-18 10:55:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 13:04:48
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'

export const setStorage = (key, value) => {
  Taro.setStorageSync(`luwu_${key}`, JSON.stringify(value))
}

export const getStorage = (key) => {
  return new Promise(resolve => {
    try {
      let value = Taro.getStorageSync(`luwu_${key}`)
      if (value) {
        value = JSON.parse(value)
      }
      resolve(value)
    } catch (e) {
      resolve(null)
    }
  })
}