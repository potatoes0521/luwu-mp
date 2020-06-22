/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-22 09:30:13
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-22 16:14:18
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.scss'

export default class HouseMsg extends Component {
  onClickIdenticalBtn() { 
    Taro.vibrateShort({
      success: (res) => {
        console.log('res', res)
      },
      fail: (error) => {
        console.log('error', error)
      }
    })
    this.props.onClickIdenticalBtn()
  }
  onClickRemarkBtn() { 
    Taro.vibrateShort({
      success: (res) => {
        console.log('res', res)
      },
      fail: (error) => {
        console.log('error', error)
      }
    })
    this.props.onClickRemarkBtn()
  }
  render() {
    const { hiddenIdentical, hiddenRemark } = this.props
    return (
      <View className='house-msg-wrapper'>
        <View className='msg-tips'>
          <Text className='text'>昌平区</Text>
          <Text className='msg-tips-line'></Text>
          <Text className='text'>张先生</Text>
          <Text className='msg-tips-line'></Text>
          <Text className='text'>48㎡</Text>
          <Text className='msg-tips-line'></Text>
          <Text className='text'>一室一厅</Text>
          <Text className='msg-tips-line'></Text>
          <Text className='text'>新房</Text>
        </View>
        <View className='handle-wrapper'>
          <View
            className='options-wrapper'
            onClick={this.onClickIdenticalBtn.bind(this)}
          >
            <View className={classNames('circular', {
              'circular-active': hiddenIdentical
            })}
            ></View>
            <View className='options-label'>隐藏相同项</View>
          </View>
          <View
            className='options-wrapper'
            onClick={this.onClickRemarkBtn.bind(this)}
          >
            <View className={classNames('circular', {
              'circular-active': !hiddenRemark
              })}
            ></View>
            <View className='options-label'>显示工艺说明</View>
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