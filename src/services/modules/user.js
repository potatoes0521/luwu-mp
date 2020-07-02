/*
 * @Author: liuYang
 * @description: 用户信息
 * @path: '@services/modules/user'
 * @Date: 2020-06-17 15:42:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 13:03:13
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import request from "../request"

/**
* 微信授权信息登录
* @return void
*/
export const userLogin = (data, that) => { 
  return request.post(`user/v1/user/login/wechat`, data, that, false)
}

/**
* 获取用户手机号
* @return void
*/
export const getUserPhone = (data, that) => {
  data.appId = 'wx08071be1bdb33e0c'
  data.scene = 'luwuMember'
  return request.post(`user/v1/user/phone/wechat`, data, that, false)
}