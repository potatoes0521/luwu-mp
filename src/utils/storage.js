/*
 * @Author: liuYang
 * @description: 缓存
 * @path: import { getStorage, setStorage, removeStorage } from '@utils/storage'
 * @Date: 2020-06-18 10:55:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 09:37:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
/**
* 缓存数据 建议以下划线方式编写key  如 name_name
* @param {String} key 要缓存数据的key
* @param {Any} value 要缓存的数据
* @return void
*/
export const setStorage = (key, value) => {
  Taro.setStorageSync(`luwu_${key}`, JSON.stringify(value))
}
/**
* 获取缓存 
* @param {String} key 要获取的缓存的key
* @return void
*/
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
/**
* 删除指定key的数据
* @param {String} key 要删除的缓存的key
* @return void
*/
export const removeStorage = (key) => {
  Taro.removeStorageSync(`luwu_${key}`)
}