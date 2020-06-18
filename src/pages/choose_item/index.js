/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-18 18:18:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 18:26:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import {} from '@services/modules/index'
import Nav from '@components/Nav'

import './index.scss'

class ChooseItem extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  render() {
    const { system } = this.props
    console.log('system', system)
    const navHeight = system && system.navHeight || 120
    return (
      <View
        style={{paddingTop: navHeight}}
        className=''
      >
        <Nav title='选择品类' back home />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    system: state.system.systemInfo,
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(ChooseItem)