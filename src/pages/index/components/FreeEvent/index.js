/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 10:42:14
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 18:42:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {
  View,
  Image
} from '@tarojs/components'
import { getImage } from '@assets/cdn'

import './index.scss'

const titleTextImage = getImage(`index/freeEvent/title.png?${Math.random()}`)

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
    const { headerList } = this.props
    return (
      <View className='free-event-wrapper'>
        <View className='btn-wrapper' onClick={this.navigator.bind(this)}>
          <Image src={titleTextImage} className='title-image'></Image>
          <View className='center-text'>看不懂装修报价嘛？让监理给您审审~</View>
          <View className='bottom-wrapper'>
            <View className='header-image-list'>
              {
                headerList.map(item => (
                  <View key='item' className='image-item'>
                    <Image src={item} className='item-image'></Image>
                  </View>
                ))
              }
            </View>
            <View className='text'>12.3万人参与</View>
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

FreeEvent.defaultProps = {
  headerList: [
    getImage('index/freeEvent/mock1.png'),
    getImage('index/freeEvent/mock2.png'),
    getImage('index/freeEvent/mock3.png')
  ]
}