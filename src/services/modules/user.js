/*
 * @Author: liuYang
 * @description: 用户信息
 * @path: '@services/modules/user'
 * @Date: 2020-06-17 15:42:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 15:49:48
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import request from "../request"

/**
* 微信授权信息登录
* @return void
*/
export const userLogin = (data) => { 
  return request.post(`user/v1/user/login/wechat`, data, false)
}

/**
* 获取用户手机号
* @return void
*/
export const getUserPhone = (data) => {
  data.appId = 'wx08071be1bdb33e0c'
  data.scene = 'luwuMember'
  return request.post(`user/v1/user/phone/wechat`, data, false)
}