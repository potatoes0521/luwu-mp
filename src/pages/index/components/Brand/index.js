/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 13:56:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 14:25:05
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.scss'

export default class Brand extends Component { 
  static options = {
    addGlobalClass: true
  }
  render() {
    const { brandList } = this.props
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
                      <Image className='item-image' src={item.brandLogo}></Image>
                    </View>
                    <View className='text-main'>
                      <View className='text-title'>马可波罗-瓷砖</View>
                      <View className='text-tips'>共有38家建材专卖店报价</View>
                    </View>
                  </View>
                )
              })
            }
          </View>
          <View className='bottom-tips'>全城3000家建材商店等您来询价~</View>
        </View>
        <View className='bottom-btn-wrapper'>
          <View className='btn'>
            <View>大家的询价</View>
            {/* <Text className='iconlujing iconfont bottom-icon'></Text> */}
          </View>
          <View className='btn'>
            <View>我也要询价</View>
            <Text className='iconlujing iconfont bottom-icon'></Text>
          </View>
        </View>
      </View>
    )
  }

}

Brand.defaultProps = {
  brandList: [
    {
      brandId: 1,
      brandLogo: ''
    },
    {
      brandId: 2,
      brandLogo: ''
    },
    {
      brandId: 3,
      brandLogo: ''
    },
    {
      brandId: 4,
      brandLogo: ''
    }
  ],
  onClick: () => {console.error('onClick is not defined')}
}

Brand.propTypes = {
  onClick: PropTypes.func.isRequired
}