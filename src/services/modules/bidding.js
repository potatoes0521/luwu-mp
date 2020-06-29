/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 18:12:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 18:13:07
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import request from "../request"

/**
 * 发布笔记
 * @return void
 */
export const getBiddingDetails = (data, that) => {
  return request.get(`materials/v1/note`, data, that, false)
}

export const getBiddingDetails2 = (data, that) => {
  return request.get(`materials/v1/note`, data, that, false)
}
