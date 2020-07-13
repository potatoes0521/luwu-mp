/*
 * @Author: liuYang
 * @description: 房屋信息
 * @path: 引入路径
 * @Date: 2020-07-01 16:51:28
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 15:51:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import request from "../request"

/**
 * 创建一个房屋信息
 * @return void
 */
export const publishHouse = (data) => {
  return request.post(`decorate/v1/decoraterequire`, data, false)
}
/**
 * 查看房屋信息详情
 * @return void
 */
export const getHouseList = (data) => {
  return request.get(`decorate/v1/decoraterequire`, data, false)
}
/**
 * 查看房屋列表
 * @return void
 */
export const getHouseDetails = (data) => {
  return request.get(`decorate/v1/decoraterequire/${data.requireId}`, data, false)
}
/**
 * 编辑房屋信息
 * @return void
 */
export const editHouse = (data) => {
  return request.put(`decorate/v1/decoraterequire/${data.requireId}`, data, false)
}
