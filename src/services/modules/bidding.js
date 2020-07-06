/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 18:12:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-06 17:39:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import { getStorage, setStorage } from '@utils/storage'
import request from "../request"
/**
 * 发布招标
 */
export const publishBidding = (data, that) => {
  return request.put(`decorate/v1/decoraterequire/${data.requireId}/calling`, data, that, false)
}

export const getBidList = (data, that) => {
  return request.get(`decorate/v1/decoraterequire/${data.requireId}/shop`, data, that, false)
}

export const getBiddingTemplate = (data, that) => {
  return request.get(`decorate/v1/pricetemplate`, data, that, false)
}
/**
 * 获取招标列表例子
 * 详情选择户型
 */
export const getOfferCase = async (data, that) => {
  const storageData = await getStorage('price_case')
  console.log('storageData', storageData)
  let dataArr = []
  if (storageData && +storageData.timer && +storageData.timer - (+new Date) < 600000) {
    dataArr = storageData.data
  } else {
    dataArr = await request.get(`decorate/v1/pricecase`, data, that, false)
    setStorage('price_case', {
      timer: +new Date(),
      data: dataArr
    })
  }
  return dataArr
}