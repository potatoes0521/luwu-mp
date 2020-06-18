/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 18:16:31
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 18:21:36
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro from '@tarojs/taro'
/**
 * 获取用户地理位置信息
 * @return void
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    Taro.getLocation({
      type: 'gcj02'
    }).then(res => {
      console.log(res)
      resolve(res)
    }).catch((err) => {
      reject(err);
    })
  })
}
 /**
  * 打开地图选择位置 参数与微信文档一样
  * @return void
  */
export const chooseLocation = ({
  latitude,
  longitude,
  }) => {
  return new Promise((resolve, reject) => {
    Taro.chooseLocation({
      latitude,
      longitude,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
