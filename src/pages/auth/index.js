/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 13:32:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 11:51:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 

import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Login from '@utils/login'
import './index.scss'

class Auth extends Component {
  /**
   * 获取用户信息
   * @return void
   */
  getUserInfo() {
    Login.login(true)
  }
  render() {
    const { userInfo } = this.props
    return userInfo && !userInfo.token && (
      <View className='modal'>
        <Button type='button' openType='getUserInfo' lang='zh_CN' onGetUserInfo={this.getUserInfo} className='submit-btn'>授权</Button>
      </View>
    )
  }
}

Auth.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

Auth.propTypes = {
  onClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}

export default connect(mapStateToProps)(Auth);