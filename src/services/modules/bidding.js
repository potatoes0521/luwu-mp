/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 18:12:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 13:33:54
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import request from "../request"

/**
 * 发布招标
 */
export const publishBidding = (data, that) => {
  return request.post(`decorate/v1/decoraterequire/${data.requireId}/calling`, data, that, false)
}

export const getBidList = (data, that) => {
  return request.get(`decorate/v1/decoraterequire/${data.requireId}/shop`, data, that, false)
}

export const getBiddingTemplate = (data, that) => {
  return request.get(`decorate/v1/pricetemplate`, data, that, false)
}