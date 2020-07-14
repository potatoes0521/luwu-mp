/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: '@services/modules/index'
 * @Date: 2020-06-17 10:07:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 15:47:37
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
export const getNewsData = () => { 
  return request.get(`${getFile('index/news/news.json')}?a=${Math.random()}`, {}, false)
}

export const getFreeEventData = () => {
  return request.get(`${getFile('index/freeEvent/freeEvent.json')}?a=${Math.random()}`, {}, false)
}