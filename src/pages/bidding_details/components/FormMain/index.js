/*
 * @Author: liuYang
 * @description: 详情和列表中间form那块 label和值展示
 * @path: 引入路径
 * @Date: 2020-06-21 09:58:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 22:35:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block
} from '@tarojs/components'
// import PropTypes from 'prop-types'

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
    const {
      decorateType,
      bedroom,
      sittingroom,
      cookroom,
      washroom,
      budget,
      address,
      decorateTimeBefore,
      remark,
      area,
      budgetMin,
      budgetMax
    } = this.props
    const houseType = (bedroom.chinese || '-') + '室' + (sittingroom.chinese || '-') + '厅' + (cookroom.chinese || '-') + '厨' + (washroom.chinese || '-') + '卫'
    const areaText = area + '㎡'
    const decorateTypeText = decorateType ? '毛坯房' : '旧房翻新'
    const budgetText = budget.moneyText || `${budgetMin || ''}-${budgetMax || ''}万`
    const addressText = address.address || ''
    const time = decorateTimeBefore.substr(0, 7).replace('-', '年') + '月'
    return (
      <Block>
        <View className='bidding-line-details skeleton-square'>
          {this.renderItem('户型', houseType)}
          {this.renderItem('房型', decorateTypeText)}
        </View>
        <View className='bidding-line-details skeleton-square'>
          {this.renderItem('面积', areaText)}
          {this.renderItem('预算', budgetText)}
        </View>
        <View className='bidding-line-details skeleton-square'>
          {this.renderItem('房屋位置', addressText)}
        </View>
        <View className='bidding-line-details skeleton-square'>
          {this.renderItem('装修时间', time)}
        </View>
        <View className='bidding-line-details skeleton-square'>
          {this.renderItem('其他要求', remark)}
        </View>
      </Block>
    )
  }

}

FormMain.defaultProps = {
  showRemark: false,
  bedroom: {},
  sittingroom: {},
  cookroom: {},
  washroom: {},
  decorateType : 0,
  budget: {},
  address: {},
  decorateTimeBefore: '',
  remark: '',
  area: '',
}

FormMain.propTypes = {
}