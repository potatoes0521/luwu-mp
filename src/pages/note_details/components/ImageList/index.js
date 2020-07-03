/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-21 10:40:32
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 16:25:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
  ScrollView
} from '@tarojs/components'
import PropTypes from 'prop-types'
import {SectionToChinese} from '@utils/numberToCode'
import './index.scss'

export default class ImageList extends Component { 
  onItemClick(item) {
    Taro.previewImage({
      current: item,
      urls: this.props.imageList
    })
    this.props.onItemClick(item)
  }
  render() {
    let { imageList, title } = this.props
    const imageListRender = imageList.map((item, index) => {
      const itemTitle = title ? (imageList.length > 1 ? title + SectionToChinese(index + 1) : title) : ''
      return (
        <View className='image-item skeleton-square'
          key={item}
        >
          <View className='image-wrapper'>
            <Image
              lazy-load
              onClick={this.onItemClick.bind(this, item)}
              src={item}
              mode='aspectFill'
              className='image'
            ></Image>
          </View>
          <View className='title'>{itemTitle || ''}</View>
        </View>
      )
    })
    return (
      <ScrollView scrollX className='image-vertical-wrapper'>
        {
          imageListRender
        }
      </ScrollView>
    )
  }

}

ImageList.defaultProps = {
  imageList: [],
  onItemClick: () => {
    console.error('onItemClick is not defined')
  }
}

ImageList.propTypes = {
  imageList: PropTypes.array.isRequired,
  onItemClick: PropTypes.func
}