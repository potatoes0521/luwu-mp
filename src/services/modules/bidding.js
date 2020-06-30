/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 18:12:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-30 11:35:18
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import request from "../request"

/**
 * 发布招标
 */
export const publishBidding = (data, that) => {
  return request.post(`v1/decoraterequire`, data, that, false)
}

export const getMineBiddingList = (data, that) => {
  return request.get(`v1/decoraterequire`, data, that, false)
}

export const getBiddingDetails = (data, that) => {
  return request.get(`v1/decoraterequire`, data, that, false)
}

export const editBidding = (data, that) => {
  return request.put(`v1/decoraterequire`, data, that, false)
}