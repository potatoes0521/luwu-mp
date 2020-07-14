/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: '@services/modules/index'
 * @Date: 2020-06-17 10:07:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 14:57:32
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import { getFile } from "@assets/cdn"
import request from "../request"

/**
* 获取首页列表数据
* @return void
*/
// eslint-disable-next-line import/prefer-default-export
export const getNewsData = () => { 
  return request.get(`${getFile('index/news/news.json')}?a=${Math.random()}`, {}, false)
}