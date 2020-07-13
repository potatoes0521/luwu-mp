/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 18:12:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 15:53:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import request from "../request"
/**
 * 发布招标
 */
export const publishBidding = (data) => {
  return request.put(`decorate/v1/decoraterequire/${data.requireId}/calling`, data, false)
}

export const getBidList = (data) => {
  return request.storageGet({
    url: `decorate/v1/decoraterequire/${data.requireId}/shop`,
    data,
    loadingTitle: false,
    storageKey: `bid_list_${data.requireId}`,
    paramsBool: data.requireId
  })
}

export const getBiddingTemplate = async (data) => {
  return request.storageGet({
    url: `decorate/v1/pricetemplate`,
    data,
    loadingTitle: false,
    storageKey: `bidding_template_${data.shopId}`,
    paramsBool: data.shopId
  })
}
/**
 * 获取招标列表例子
 * 详情选择户型
 */
export const getOfferCase = async (data) => {
  return request.storageGet({
    url: `decorate/v1/pricecase`,
    data,
    loadingTitle: false,
    storageKey: `price_case`,
    paramsBool: true
  })
}