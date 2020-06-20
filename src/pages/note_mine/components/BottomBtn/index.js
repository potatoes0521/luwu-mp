/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-20 18:12:25
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-20 18:14:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class BottomBtn extends Component {
  navigationTo(key) {
    Taro.navigateTo({
      url: `/pages/${key}/index`
    })
  }
  render() {
    return (
      <View className='fixed-bottom-btn-wrapper'>
        <View className='btn-public share-btn'>分享笔记</View>
        <View className='btn-public plain-btn' onClick={this.navigationTo.bind(this, 'note_publish')}>记笔记</View>
      </View>
    )
  }

}

BottomBtn.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

BottomBtn.propTypes = {
  onClick: PropTypes.func.isRequired
}