/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-15 11:24:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import {
  CHANGEUSERINFO,
  LOGINOUT
} from '../../constants/index'
/**
 * 修改用户信息
 * @param {Object} data 参数描述
 * @return void
 */
// eslint-disable-next-line import/prefer-default-export
export const changeUserInfo = (data) => {
  return {
    type: CHANGEUSERINFO,
    data
  }
}

export const loginOut = (data) => {
  return {
    type: LOGINOUT,
    data
  }
}

