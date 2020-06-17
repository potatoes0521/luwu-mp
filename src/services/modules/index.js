/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 10:07:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 10:22:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import { defaultResourceConfigURL } from "@config/request_config"
import request from "../request"

/**
* 获取首页列表数据
* @return void
*/
// eslint-disable-next-line import/prefer-default-export
export const getIndexListData = () => { 
  return request.get(`${defaultResourceConfigURL}index/indexList.json`, {}, this, false)
}