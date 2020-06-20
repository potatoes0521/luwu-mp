/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 09:47:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 00:15:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import Upload from '@components/Upload'
import Location from '@components/Location'
import {setStorage, removeStorage} from '@utils/storage'
import './index.scss'

export default class NoteItem extends Component { 
  componentWillUnmount() { 
    removeStorage('note_details')
  }
  HandleEditData(e) { 
    e && e.stopPropagation();
    const { item } = this.props
    setStorage('note_details', item)
    Taro.navigateTo({
      url: `/pages/note_publish/index?noteId=${item.noteId}&pageType=edit`
    })
  }
  navigatorToDetails() { 
    const { item } = this.props
    Taro.navigateTo({
      url: `/pages/note_details/index?noteId=${item.noteId}`
    })
  }
  render() {
    const { item } = this.props
    const categoryName = item.mainCategory && item.mainCategory.categoryName || ''
    const brandName = item.brand && item.brand.brandName || ''
    const price = item.price || '-'
    const priceUnit = item.priceUnit || '-'
    const model = item.model || '-'
    const time = item.createAt
    return (
      <View className='note-item'>
        <Location onlyShow address={item.address} >
          <View className='tips'>
            <Text className='tips-text' onClick={this.HandleEditData.bind(this)}>编辑</Text>
            <Text className='text-line'></Text>
            <Text className='tips-text'>询底价</Text>
          </View>
        </Location>
        <View className='note-main' onClick={this.navigatorToDetails.bind(this)}>
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
          <View className='upload'>
            <Upload
              marginRightSize={42}
              imageList={item.goodsImageList || []}
              imageSize={140}
            ></Upload>
          </View>
        </View>
      </View>
    )
  }

}

NoteItem.defaultProps = {
  item: {
    goodsImageList: []
  },
}

NoteItem.propTypes = {
  item: PropTypes.object.isRequired
}