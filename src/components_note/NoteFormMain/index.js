/*
 * @Author: liuYang
 * @description: 详情和列表中间form那块 label和值展示
 * @path: 引入路径
 * @Date: 2020-06-21 09:58:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 21:52:57
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
  renderItem(label, content) { 
    return (
      <View className='note-detail-item'>
        <View className='note-detail-item-label'>{label}</View>
        <View className='note-detail-item-content'>{content}</View>
      </View>
    )
  }
  render() {
    let { item, showRemark } = this.props
    const categoryName = item.mainCategory && item.mainCategory.categoryName || '-'
    const brandName = item.brand && item.brand.brandName || '-'
    const price = item.price || '-'
    const priceUnit = item.priceUnit || ''
    const model = item.model || '-'
    const time = item.createAt
    const remark = item.remark
    return (
      <Block>
        <View className='note-line-details skeleton-square'>
          {this.renderItem('品类', categoryName)}
          {this.renderItem('品牌', brandName)}
        </View>
        <View className='note-line-details skeleton-square'>
          {this.renderItem('价格', price + priceUnit ? ' -' : '' + priceUnit)}
          {this.renderItem('型号', model)}
        </View>
        <View className='note-line-details skeleton-square'>
          {this.renderItem('记录时间', time)}
        </View>
        {
          showRemark && remark && (
            <Block>
              <View className='note-line-details skeleton-square'>
                <View className='note-detail-item'>
                  <View className='note-detail-item-label'>笔记详情:</View>
                </View>
              </View>
              <View className='note-form-main-remark' >
                {
                  remark
                }
              </View>
            </Block>
          )
        }
      </Block>
    )
  }

}

NoteFormMain.defaultProps = {
  showRemark: false,
  item: {},
}

NoteFormMain.propTypes = {
  item: PropTypes.object.isRequired
}