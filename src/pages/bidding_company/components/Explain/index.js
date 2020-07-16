/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-16 13:17:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 17:45:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default class Explain extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.data = {}
  }

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  handleClose(e) {
    e.stopPropagation()
    this.props.onClose()
  }
  handleSubmit(e) { 
    e.stopPropagation()
    this.props.onSubmit()
  }
  stop(e) { 
    e.stopPropagation()
  }

  render() {
    const {
      visit,
    } = this.props
    return visit ? (
      <View className='explain-wrapper'>
        <View
          className='explain-bg'
          onTouchMove={this.stop.bind(this)}
          onClick={this.handleClose.bind(this)}
        ></View>
        <View className='explain-main'>
          <View className='explain-plain'>
            <View className='explain-title'>监理审核报价</View>
            <View className='form-item'>
              <View className='form-label'>在线审核报价</View>
              <View className='form-content'>60元/份</View>
            </View>
            <View className='tips'>由于您本次是在2020年7月31日前发布的招标，所以赠送您一次监理免费审核报价的服务~快去审审吧！</View>
            <View className='submit-btn' onClick={this.handleSubmit.bind(this)}>立即审核</View>
            <View className='tips-bottom'>立即审核后，可到我的-在线报价审核页面查看审核结果</View>
          </View>
          <View
            onClick={this.handleClose.bind(this)}
            className='explain-close iconfont iconhuaban'
          ></View>
        </View>
      </View>
    ) : null
  }

}

Explain.defaultProps = {
  showSign: false,
}