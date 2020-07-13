/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: '@services/modules/index'
 * @Date: 2020-06-17 10:07:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 15:50:58
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import { getFile } from "@assets/cdn"
import request from "../request"

/**
* 获取首页列表数据
* @return void
*/
export const getStoreData = () => { 
  return request.get(`${getFile('index/store/store.json')}?a=${Math.random()}`, {}, false)
}

export const getBrandData = () => {
  return request.get(`${getFile('index/brand/brand.json')}?a=${Math.random()}`, {}, false)
}

export const getCompanyData = () => {
  return request.get(`${getFile('index/company/company.json')}?a=${Math.random()}`, {}, false)
}