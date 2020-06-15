/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-05 15:02:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-15 11:37:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import {
  CHANGEUSERINFO,
  LOGINOUT
} from '../../constants'

// import api from '@api/index'

const INITIAL_STATE = {
  userInfo: {},
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGEUSERINFO:  // 修改用户信息
      if (!action.data) return
      // if (env === 'development') {
      //   let newUserInfoData = Object.assign({}, state.userInfo)
      //   if (action.data.token) {
      //     newUserInfoData = Object.assign({}, state.userInfo, {
      //       token: action.data.token
      //     })
      //   }
      //   return {
      //     ...state,
      //     userInfo: newUserInfoData
      //   }
      // }
      const newUserInfoData = Object.assign({}, state.userInfo, action.data)
      return {
        ...state,
        userInfo: newUserInfoData
      }
    case LOGINOUT:
      return {
        ...state,
        userInfo: {}
      }
    default:
      return state
  }
}
