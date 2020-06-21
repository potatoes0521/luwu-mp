/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-21 10:40:32
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 11:01:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 

import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image
} from '@tarojs/components'
import PropTypes from 'prop-types'
import {SectionToChinese} from '@utils/numberToCode'
import './index.scss'

export default class ImageVerticalList extends Component { 

  render() {
    let { imageList, title } = this.props
    const imageListRender = imageList.map((item, index) => {
      const itemTitle = title ? (imageList.length > 1 ? title + SectionToChinese(index + 1) : title) : ''
      return (
        <View className='image-item' key={item}>
          <View className='image-wrapper'>
            <Image
              lazy-load
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
      <View className='image-vertical-wrapper'>
        {
          imageListRender
        }
      </View>
    )
  }

}

ImageVerticalList.defaultProps = {
  imageList: [],
  onClick: () => {console.error('onClick is not defined')}
}

ImageVerticalList.propTypes = {
  imageList: PropTypes.array.isRequired,
  onClick: PropTypes.func
}