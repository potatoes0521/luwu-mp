/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-15 17:40:43
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 16:32:17
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import {SAVESYSTEMINFO} from '../../constants/index'
/**
 * 修改用户信息
 * @param {Object} data 参数描述
 * @return void
 */
// eslint-disable-next-line import/prefer-default-export
export const saveSystemInfo = (data) => {
  return {
    type: SAVESYSTEMINFO,
    data
  }
}

