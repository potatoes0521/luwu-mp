/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-20 13:19:36
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-20 14:21:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

import request from "../request"

/**
 * 获取类别列表
 * @return void
 */
export const getCategory = (that) => {
  return request.get(`goods/v1/category`, {}, that, false)
}
/**
 * 获取对应品类的品牌列表
 * @return void
 */
export const getBrandList = (data, that) => {
  return request.get(`goods/v1/brand`, data, that, false)
}
