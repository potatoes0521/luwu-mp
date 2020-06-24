/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-24 13:29:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-24 13:32:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import request from "../request"

/**
* 发布免费报价
* @return void
*/
export const publishOffer = (data, that) => { 
  return request.post(`decorate/v1/outquotation`, data, that, false)
}
/**
 * 获取报价列表
 * @return void
 */
export const getOfferList = (data, that) => {
  return request.get(`decorate/v1/outquotation/page`, data, that, false)
}
/**
 * 获取报价详情
 * @return void
 */
export const getOfferDetails = (data, that) => {
  return request.get(`decorate/v1/outquotation/${data.quotationId}`, data, that, false)
}
