/*
 * @Author: liuYang
 * @description: 详情和列表中间form那块 label和值展示
 * @path: 引入路径
 * @Date: 2020-06-21 09:58:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 18:08:17
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

export default class FormMain extends Component {
  renderItem(label, content) { 
    return (
      <View className='bidding-detail-item'>
        <View className='bidding-detail-item-label'>{label}</View>
        <View className='bidding-detail-item-content'>{content}</View>
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
        <View className='bidding-line-details skeleton-square'>
          {this.renderItem('品类', categoryName)}
          {this.renderItem('品牌', brandName)}
        </View>
        <View className='bidding-line-details skeleton-square'>
          {this.renderItem('价格', price + priceUnit ? '/' : '' + priceUnit)}
          {this.renderItem('型号', model)}
        </View>
        <View className='bidding-line-details skeleton-square'>
          {this.renderItem('记录时间', time)}
        </View>
        {
          showRemark && remark && (
            <Block>
              <View className='bidding-line-details skeleton-square'>
                <View className='bidding-detail-item'>
                  <View className='bidding-detail-item-label'>笔记详情:</View>
                </View>
              </View>
              <View className='bidding-form-main-remark' >
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

FormMain.defaultProps = {
  showRemark: false,
  item: {},
}

FormMain.propTypes = {
  item: PropTypes.object.isRequired
}