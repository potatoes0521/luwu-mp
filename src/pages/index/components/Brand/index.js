/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 13:56:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 22:06:57
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { getBrandData } from '@services/modules/index'
import { getImage } from '@assets/cdn'

import './index.scss'

export default class Brand extends Component { 
  constructor(props) {
    super(props) 
    this.state = {
      brandList: []
    }
  }
  componentDidMount() { 
    this.getBrandData()
  }
  getBrandData() { 
    getBrandData().then(res => {
      this.setState({
        brandList: res
      })
    })
  }
  navigator() { 
    Taro.navigateTo({
      url: '/pages/table_contrast/index'
    })
  }
  static options = {
    // addGlobalClass: true
  }
  render() {
    const { brandList } = this.state
    return (
      <View className='card-wrapper brand'>
        <View className='card-plain'>
          <View className='list-wrapper'>
            {
              brandList.map((item, index) => {
                const key = item.brandId
                const itemClassName = classNames('list-item', {
                  'margin-right': (index + 1) % 3 !== 0,
                })
                return (
                  <View
                    className={itemClassName}
                    key={key}
                  >
                    <View className='image-wrapper'>
                      <Image lazyLoad className='item-image' src={getImage(item.brandUrl)}></Image>
                    </View>
                    <View className='text-main'>
                      <View className='text-title'>{item.brandName}</View>
                      <View className='text-tips'>共有{item.num}家建材商店报价</View>
                    </View>
                  </View>
                )
              })
            }
          </View>
          <View className='bottom-tips'>全城3000家建材商店等您来比价~</View>
        </View>
        <View className='bottom-btn-wrapper'>
          <View className='btn'>
            <View>大家的比价</View>
            {/* <Text className='iconlujing iconfont bottom-icon'></Text> */}
          </View>
          <View className='btn'>
            <View>我也要比价</View>
            <Text className='iconlujing iconfont bottom-icon'></Text>
          </View>
        </View>
      </View>
    )
  }

}

Brand.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

Brand.propTypes = {
  onClick: PropTypes.func.isRequired
}