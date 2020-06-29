/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 11:19:15
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 14:58:29
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class Bidding extends Component { 
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  render() {  
    let {  } = this.props
    return (
      <View className='card-wrapper bidding'>
        <View className='card-plain'>
          <View className='plain-wrapper'>
            <View className='big-wrapper big-item color1' >
              <View className='title big-margin-bottom'>三室二厅二厨二卫</View>
              <View className='middle-title'>
                <Text className='label'>类型</Text>
                <Text>老房</Text> 
              </View>
              <View className='middle-title'>
                <Text className='label'>面积</Text>
                <Text>老房</Text> 
              </View>
              <View className='middle-title'>
                <Text className='label'>预算</Text>
                <Text>老房</Text> 
              </View>
              <View className='big-margin-top small-tips'>共有38家装修公司投标</View>
              <View className='backgroundImage1'></View>
            </View>
            <View className='big-wrapper right-wrapper'>
              <View className='small-item color2'>
                <View className='title'>三室二厅二厨二卫</View>
                <View className='big-margin-top small-tips'>共有38家装修公司投标</View>
                <View className='backgroundImage2'></View>
              </View>
              <View className='small-item color3'>
                <View className='title'>三室二厅二厨二卫</View>
                <View className='big-margin-top small-tips'>共有38家装修公司投标</View>
                <View className='backgroundImage3'></View>
              </View>
            </View>
          </View>
          <View className='plain-wrapper margin-bottom'>
            <View className='big-item color4' >
              <View className='title'>三室二厅二厨二卫</View>
              <View className='big-margin-top small-tips'>共有38家装修公司投标</View>
              <View className='backgroundImage4'></View>
            </View>
            <View className='small-item right-item color5'>
              <View className='title'>三室二厅二厨二卫</View>
              <View className='big-margin-top small-tips'>共有38家装修公司投标</View>
              <View className='backgroundImage5'></View>
            </View>
          </View>
        </View>
        <View className='bottom-btn-wrapper'>
          <View className='btn'>
            <View>大家的招标</View>
            {/* <Text className='iconlujing iconfont bottom-icon'></Text> */}
          </View>
          <View className='btn'>
            <View>我也要招标</View>
            <Text className='iconlujing iconfont bottom-icon'></Text>
          </View>
        </View>
      </View>
    )
  }

}

Bidding.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

Bidding.propTypes = {
  onClick: PropTypes.func.isRequired
}