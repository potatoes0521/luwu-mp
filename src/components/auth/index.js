/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:03:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 15:26:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import React, { Component } from 'react'
import {
  View,
  Button
} from '@tarojs/components'
import { connect } from 'react-redux'
import Login from '@utils/login'

import './index.module.scss'

class Auth extends Component {
  constructor(props) { 
    super(props)
  }
  /**
   * 获取用户信息
   * @return void
   */
  async getUserInfo() {
    await Login.login()
    this.props.onLogin && this.props.onLogin()
  }
  render() {
    const { userInfo } = this.props
    return userInfo && !userInfo.token ? (
      <View className='modal'>
        <Button type='button' openType='getUserInfo' lang='zh_CN' onGetUserInfo={this.getUserInfo} className='btn'></Button>
      </View>
    ) : null
  }
}

Auth.defaultProps = {
  onLogin: () => {
    console.log('onLogin is not defined in @components/Auth')
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}

export default connect(mapStateToProps)(Auth);