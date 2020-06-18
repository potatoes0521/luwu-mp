/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-15 10:25:25
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 16:32:01
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import {
  bindActionCreators
} from 'redux'
import store from '../index'
import { changeUserInfo, loginOut } from './modules/user_msg'  // 用户信息
import { saveSystemInfo } from './modules/system'
  
const createAction = (actionType) => {
  return (payload) => ({
    type: actionType,
    payload
  })
}

// 把多个action绑定到dispatch上
export default bindActionCreators({
  createAction,
  changeUserInfo,
  loginOut,
  saveSystemInfo
}, store.dispatch)