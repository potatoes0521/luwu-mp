/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:03:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 17:07:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Button
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Login from '@utils/login'

import './index.scss'

class Auth extends Component {
  /**
   * 获取用户信息
   * @return void
   */
  getUserInfo() {
    Login.login()
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
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}

export default connect(mapStateToProps)(Auth);