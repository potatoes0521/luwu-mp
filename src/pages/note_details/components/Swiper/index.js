/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-21 10:11:53
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 15:42:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {
  View,
  Swiper,
  SwiperItem,
  Image
} from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class ImageSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}
  // 因为自定组件模式下Swiper指示点的样式写在子组件会不生效 
  // 所以指示点的样式在父组件
  static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  }

  

  onSwiperItemClick(item) {
    Taro.previewImage({
      current: item,
      urls: this.props.imageList
    })
    this.props.onSwiperItemClick(item)
  }
  render() {
    let { imageList } = this.props
    const imageListRender = imageList.map(item => {
      const key = item
      return (
        <SwiperItem key={key}>
          <View className='swiper-item skeleton-square'>
            <Image
              lazyLoad
              className='swiper-item-image'
              src={item}
              mode='aspectFill'
              onClick={this.onSwiperItemClick.bind(this, item)}
            ></Image>
          </View>
        </SwiperItem>
      )
    })
    return (
      <View className='swiper-wrapper'>
        <Swiper
          className='swiper'
          indicatorDots
          circular
          indicatorActiveColor='#ffffff'
          interval='3000'
        >
          {
            imageList.length ?
              imageListRender
              :
              <SwiperItem
                onClick={this.onSwiperItemClick.bind(this, {})}
              ></SwiperItem>
          }
        </Swiper>
      </View> 
    )
  }

}

ImageSwiper.defaultProps = {
  imageList: [1],
  onSwiperItemClick: () => {
    console.error('onSwiperItemClick is not defined in note_details/components/Swiper')
  }
}

ImageSwiper.propTypes = {
  imageList: PropTypes.array.isRequired,
  onSwiperItemClick: PropTypes.func
}