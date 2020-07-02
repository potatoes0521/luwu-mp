/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: '@services/modules/index'
 * @Date: 2020-06-17 10:07:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 18:20:43
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import { defaultResourceConfigURL } from "@assets/"
import request from "../request"

/**
* 获取首页列表数据
* @return void
*/
// eslint-disable-next-line import/prefer-default-export
export const getIndexListData = (that) => { 
  return request.get(`${defaultResourceConfigURL}index/indexList.json?a=${Math.random()}`, {}, that, false)
}
