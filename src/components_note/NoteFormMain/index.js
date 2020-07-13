/*
 * @Author: liuYang
 * @description: 详情和列表中间form那块 label和值展示
 * @path: 引入路径
 * @Date: 2020-06-21 09:58:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 17:31:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block,
  Text
} from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { formatTimeToChinese } from '@utils/timer'

import './index.scss'

export default class NoteFormMain extends Component {
  handleEditData() {
    const { noteId } = this.props
    Taro.navigateTo({
      url: `/pages/note_publish/index?pageType=edit&noteId=${noteId}`
    })
  }
  renderFormItem(label, content) { 
    return (
      <View className='form-item skeleton-cylinder' >
        <View className='form-label'>{label}</View>
        <View className='form-content'>{content}</View>
      </View>
    )
  }
  render() {
    const {
      time,
      brand,
      model,
      price,
      isShare,
      updateAt,
      priceUnit,
      rightType,
      mainCategory,
      childCategory,
    } = this.props
    const titleClassName = classNames('title-wrapper', {
      'little-title': !time
    })
    const categoryName = (mainCategory.categoryName ? mainCategory.categoryName : '') + (childCategory.categoryName ? ` | ${childCategory.categoryName}` : '')
    const timeText = formatTimeToChinese(updateAt)
    return (
      <Block>
        <View className={titleClassName}>
          <View className='note-msg-title skeleton-cylinder'>{brand.brandName} {childCategory.categoryName || mainCategory.categoryName || ''}</View>
          {
            !isShare && rightType === 'edit' && (
              <View className='tips'>
                <Text className='tips-text skeleton-cylinder' onClick={this.handleEditData.bind(this)}>编辑</Text>
              </View>
            )
          }
          {
            rightType === 'time' && (
              <Text className='time-text'>{timeText}</Text>
            )
          }
        </View>
        {
          time && <View className='time'>{updateAt}</View>
        }
        <View className='form-item-line'>
          {this.renderFormItem('品类', categoryName)}
        </View>
        <View className='form-item-line'>
          {this.renderFormItem('价格', price + priceUnit ? ' -' : '' + priceUnit)}
          {this.renderFormItem('型号', model || '无')}
        </View>
      </Block>
    )
  }

}

NoteFormMain.defaultProps = {
  mainCategory: {},
  childCategory: {},
  brand: {},
  isShare: false,
  price: '',
  priceUnit: '',
  updateAt: '',
  model: '',
}

NoteFormMain.propTypes = {
  mainCategory: PropTypes.object,
  childCategory: PropTypes.object,
  brand: PropTypes.object,
  isShare: PropTypes.bool,
  price: PropTypes.string,
  priceUnit: PropTypes.string,
  updateAt: PropTypes.string,
  model: PropTypes.string
}