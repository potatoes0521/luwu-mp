/*
 * @Author: liuYang
 * @description: 提交报价单 审报价
 * @path: 引入路径
 * @Date: 2020-06-24 13:29:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 15:50:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import request from "../request"

/**
* 发布免费报价
* @return void
*/
export const publishOffer = (data) => { 
  return request.post(`decorate/v1/outquotation`, data, false)
}
/**
 * 获取报价列表
 * @return void
 */
export const getOfferList = (data) => {
  return request.get(`decorate/v1/outquotation/page`, data, false)
}
/**
 * 获取报价详情
 * @return void
 */
export const getOfferDetails = (data) => {
  return request.get(`decorate/v1/outquotation/${data.quotationId}`, data, false)
}
