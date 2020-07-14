/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 10:42:14
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 15:36:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image
} from '@tarojs/components'
import { getImage } from '@assets/cdn'

import './index.scss'

const titleTextImage = getImage(`index/freeEvent/ad.png?${Math.random()}`)

export default class FreeEvent extends Component {
  navigator() { 
    const { offerData } = this.props
    const pageName = offerData && offerData.quotationId ? 'offer_examine_details' : 'offer_examine_publish'
    const url = `/pages/${pageName}/index?quotationId=${offerData.quotationId || ''}`
    Taro.navigateTo({
      url
    })
  }
  render() {
    return (
      <View className='free-event-wrapper'>
        <View className='btn-wrapper' onClick={this.navigator.bind(this)}>
          <Image src={titleTextImage} className='title-image'></Image>
          <View className='bottom-wrapper'>
            <View className=''>活动时间：2020.7.1~2020.7.31</View>
            <View className='remark'>活动说明：每个家庭限领1份</View>
          </View>
          <View className='go-btn-wrapper'>
            <View className='after-btn'></View>
            <View className='before-btn'>GO</View>
          </View>
        </View>
      </View>
    )
  }
}

FreeEvent.defaultProps = {}