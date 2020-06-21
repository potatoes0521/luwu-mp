/*
 * @Author: liuYang
 * @description: 详情和列表中间form那块 label和值展示
 * @path: 引入路径
 * @Date: 2020-06-21 09:58:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 10:01:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block
} from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class NoteFormMain extends Component {
  render() {
    let { item } = this.props
    const categoryName = item.mainCategory && item.mainCategory.categoryName || ''
    const brandName = item.brand && item.brand.brandName || ''
    const price = item.price || '-'
    const priceUnit = item.priceUnit || '-'
    const model = item.model || '-'
    const time = item.createAt
    return (
      <Block>
        <View className='note-line-details skeleton-square'>
          <View className='note-detail-item'>
            <View className='note-detail-item-label'>品类</View>
            <View className='note-detail-item-content'>{categoryName}</View>
          </View>
          <View className='note-detail-item'>
            <View className='note-detail-item-label'>品牌</View>
            <View className='note-detail-item-content'>{brandName}</View>
          </View>
        </View>
        <View className='note-line-details skeleton-square'>
          <View className='note-detail-item'>
            <View className='note-detail-item-label'>价格</View>
            <View className='note-detail-item-content'>{price}{priceUnit ? '/' : ''}{priceUnit}</View>
          </View>
          <View className='note-detail-item'>
            <View className='note-detail-item-label'>型号</View>
            <View className='note-detail-item-content'>{model}</View>
          </View>
        </View>
        <View className='note-line-details skeleton-square'>
          <View className='note-detail-item'>
            <View className='note-detail-item-label'>记录时间</View>
            <View className='note-detail-item-content'>{time}</View>
          </View>
        </View>
      </Block>
    )
  }

}

NoteFormMain.defaultProps = {
  item: {},
}

NoteFormMain.propTypes = {
  item: PropTypes.object.isRequired
}