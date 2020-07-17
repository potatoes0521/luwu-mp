/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-17 11:50:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-17 11:50:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'

import './index.scss'

class index extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }

  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    return (
      <SafeAreaView
        title=''
        back
        home
      >
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo,
  }
}
export default connect(mapStateToProps)(index)