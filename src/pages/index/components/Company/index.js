/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 13:20:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 13:21:54
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class Company extends Component { 

  // static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  // }

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }


  render() {
    let {  } = this.props
    return (
      <View></View>
    )
  }

}

index.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

index.propTypes = {
  onClick: PropTypes.func.isRequired
}