/*
 * @Author: liuYang
 * @description: 笔记列表
 * @path: 引入路径
 * @Date: 2020-06-20 12:11:19
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 15:50:32
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import request from "../request"

/**
* 发布笔记
* @return void
*/
export const publishNote = (data) => { 
  return request.post(`materials/v1/note`, data, false)
}

/**
 * 查询笔记详情
 * @return void
 */
export const getNoteDetails = (data) => {
  return request.get(`materials/v1/note/${data.noteId}`, data, false)
}

/**
 * 编辑笔记
 * @return void
 */
export const editNote = (data) => {
  return request.put(`materials/v1/note/${data.noteId}`, data, false)
}

/**
 * 获取笔记列表
 * @return void
 */
export const getNoteList = (data) => {
  return request.get(`materials/v1/note`, data, false)
}
