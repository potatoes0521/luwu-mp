/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 09:47:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 13:31:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import Upload from '@components/Upload'
import Location from '@components/Location'

import './index.scss'

export default class index extends Component { 
  render() {
    const { item } = this.props
    return (
      <View className='note-item'>
        <Location onlyShow >
          <View className='tips'>
            <Text className='tips-text'>编辑</Text>
            <Text className='text-line'></Text>
            <Text className='tips-text'>询底价</Text>
          </View>
        </Location>
        <View className='note-main'>
          <View className='note-line-details skeleton-square'>
            <View className='note-detail-item'>
              <View className='note-detail-item-label'>品类</View>
              <View className='note-detail-item-content'>1111</View>
            </View>
            <View className='note-detail-item'>
              <View className='note-detail-item-label'>品牌</View>
              <View className='note-detail-item-content'>1111</View>
            </View>
          </View>
          <View className='note-line-details skeleton-square'>
            <View className='note-detail-item'>
              <View className='note-detail-item-label'>价格</View>
              <View className='note-detail-item-content'>111</View>
            </View>
            <View className='note-detail-item'>
              <View className='note-detail-item-label'>型号</View>
              <View className='note-detail-item-content'>1111</View>
            </View>
          </View>
          <View className='note-line-details skeleton-square'>
            <View className='note-detail-item'>
              <View className='note-detail-item-label'>记录时间</View>
              <View className='note-detail-item-content'>11111</View>
            </View>
          </View>
          <View className='upload'>
            <Upload
              imageList={item.goodsImageList || []}
              imageSize={140}
            ></Upload>
          </View>
        </View>
      </View>
    )
  }

}

index.defaultProps = {
  item: {
    goodsImageList: []
  },
}

index.propTypes = {
  item: PropTypes.object.isRequired
}