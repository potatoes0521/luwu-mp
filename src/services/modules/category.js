/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-20 13:19:36
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 15:51:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

import request from "../request"

/**
 * 获取类别列表
 * @return void
 */
export const getCategory = () => {
  return request.get(`goods/v1/category`, {}, false)
}
/**
 * 获取对应品类的品牌列表
 * @return void
 */
export const getBrandList = (data) => {
  return request.get(`goods/v1/brand`, data, false)
}
