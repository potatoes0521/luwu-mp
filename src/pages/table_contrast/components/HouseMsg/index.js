/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-22 09:30:13
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-06 16:47:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import SwitchBtn from '@components/Switch'

import './index.scss'

export default class HouseMsg extends Component {
  onClickIdenticalBtn() { 
    this.props.onClickIdenticalBtn()
  }
  onClickRemarkBtn() { 
    this.props.onClickRemarkBtn()
  }
  render() {
    const { hiddenIdentical, hiddenRemark } = this.props
    return (
      <View className='house-msg-wrapper'>
        <View className='handle-wrapper'>
          <View className='options-wrapper'>
            <SwitchBtn checked={hiddenIdentical} onSwitchChange={this.onClickIdenticalBtn.bind(this)} />
            <View className='options-label'>隐藏相同项</View>
          </View>
          <View className='options-wrapper'>
            <SwitchBtn checked={hiddenRemark} onSwitchChange={this.onClickRemarkBtn.bind(this)} />
            <View className='options-label'>显示工艺说明</View>
          </View>
        </View>
        <View className='msg-tips'>
          <View className='tips-line'>
            <Text className='text'>一室一厅</Text>
            <Text className='msg-tips-line'></Text>
            <Text className='text'>新房</Text>
          </View>
          <View className='tips-line'>
            <Text className='text'>48㎡</Text>
            <Text className='msg-tips-line'></Text>
            <Text className='text'>预算3万</Text>
          </View>
        </View>
      </View>
    )
  }

}

HouseMsg.defaultProps = {
  hiddenRemark: false,
  hiddenIdentical: false,
  onClickRemarkBtn: () => {
    console.error('onClickRemarkBtn is not defined')
  },
  onClickIdenticalBtn: () => {
    console.error('onClickIdenticalBtn is not defined')
  }
}

HouseMsg.propTypes = {
  hiddenRemark: PropTypes.bool.isRequired,
  hiddenIdentical: PropTypes.bool.isRequired,
  onClickRemarkBtn: PropTypes.func.isRequired,
  onClickIdenticalBtn: PropTypes.func.isRequired,
}