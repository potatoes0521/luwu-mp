/*
 * @Author: liuYang
 * @description: 笔记列表
 * @path: 引入路径
 * @Date: 2020-06-20 12:11:19
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-20 12:18:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import request from "../request"

/**
* 发布笔记
* @return void
*/
export const publishNote = (data, that) => { 
  return request.get(``, {}, that, false)
}

/**
 * 查询笔记详情
 * @return void
 */
export const getNoteDetails = (data, that) => {
  return request.get(``, {}, that, false)
}

/**
 * 编辑笔记
 * @return void
 */
export const editNote = (data, that) => {
  return request.get(``, {}, that, false)
}

/**
 * 获取笔记列表
 * @return void
 */
export const getNoteList = (data, that) => {
  return request.get(``, {}, that, false)
}