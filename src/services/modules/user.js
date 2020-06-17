/*
 * @Author: liuYang
 * @description: 用户信息
 * @path: '@services/modules/user'
 * @Date: 2020-06-17 15:42:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 17:33:58
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import request from "../request"

/**
* 获取首页列表数据
* @return void
*/
// eslint-disable-next-line import/prefer-default-export
export const userLogin = (data, that) => { 
  return request.post(`user/v1/user/login/wechat`, data, that, false)
}
