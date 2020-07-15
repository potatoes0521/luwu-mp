/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 18:12:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 14:19:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import { getFile } from "@assets/cdn"
import request from "../request"
/**
 * 查看招标信息
 * 有userId是指定userId的  没有userId是没有userId的
 * @return void
 */
export const getBiddingList = (data) => {
  return request.get(`decorate/v1/decoraterequire`, data, false)
}

/**
 * 发布招标
 */
export const publishBidding = (data) => {
  return request.put(`decorate/v1/decoraterequire/${data.requireId}/calling`, data, false)
}

/**
* 获取投标列表
* @return void
*/
export const getBidList = (data) => {
  return request.storageGet({
    url: `decorate/v1/decoraterequire/${data.requireId}/shop`,
    data,
    loadingTitle: false,
    storageKey: `bid_list_${data.requireId}`,
    paramsBool: data.requireId
  })
}
/**
* 获取报价模板
* @return void
*/
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

export const getBiddingActive = () => {
  return request.get(getFile(`bidding/biddingActivity.json?a=${Math.random()}`))
} 