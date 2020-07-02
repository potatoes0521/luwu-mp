/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 10:21:54
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 10:23:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import { defaultResourceImgURL, defaultResourceConfigURL } from '@config/request_config'

export const getImage = (path) => {
  return `${defaultResourceImgURL}${path}`
}

export const getFile = (path) => {
  return `${defaultResourceConfigURL}${path}`
}
