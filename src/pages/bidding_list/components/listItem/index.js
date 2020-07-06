/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-02 16:52:33
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-06 18:06:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'
import PropTypes from 'prop-types'
import { handleRequestData } from '@config/houseType'
import { getImage } from '@assets/cdn'
import { formatTimeToChinese } from '@utils/timer'
import { handleProgressText } from '@config/biddingState'

import './index.scss'

export default class ListItem extends Component { 
  constructor(props) {
    super(props)
    this.state={}
  }

  navigatorTo() { 
    const { item: { requireId } } = this.props
    Taro.navigateTo({
      url: `/pages/bidding_details/index?requireId=${requireId}`
    })
  }

  render() {
    const { item } = this.props
    const data = handleRequestData(item)
    const {
      bedroom,
      sittingroom,
      cookroom,
      washroom,
      decorateType,
      area,
      budget,
      progress,
      shopNum
    } = data
    const progressText = handleProgressText(progress)
    const imageUrl = (Array.isArray(item.images) && item.images.length) ? item.images[0] : getImage('bidding/list_item_default.png')
    const timerText = formatTimeToChinese(item.createAt)
    return (
      <View className='item-wrapper' onClick={this.navigatorTo.bind(this)}>
        <View className='item-main'>
          <View className='image-wrapper'>
            <Image lazyLoad className='item-image' mode='aspectFill' src={imageUrl}></Image>
          </View>
          <View className='main-wrapper'>
            <View className='item-title-wrapper'>
              <Text className='item-title'>{(bedroom.chinese || '-') + '室' + (sittingroom.chinese || '-') + '厅' + (cookroom.chinese || '-') + '厨' + (washroom.chinese || '-') + '卫'}</Text>
              <Text className='item-time'>{timerText}</Text>
            </View>
            <View className='item-form'>
              <View className='form-item'>类型：{decorateType ? '毛坯房' : '旧房翻新'}</View>
              <View className='form-item'>面积：{area + '㎡'}</View>
              <View className='form-item'>预算：{budget.moneyText || `${item.budgetMin || ''}-${item.budgetMax || ''}万`}</View>
            </View>
          </View>
        </View>
        <View className='bottom-label'>
          <View className='label'>
            {
              shopNum ? (
                <Block>
                  <Text>共有</Text>
                  <Text className='hight-light'>{shopNum}</Text>
                  <Text>家装修公司投标</Text>
                </Block>
              ): (
                <Text>还没有装修公司投标</Text>
              )
            }
          </View>
          <View className='process-text hight-light'>{progressText}</View>
        </View>
      </View>
    )
  }

}

ListItem.defaultProps = {
  item: {},
  onClick: () => {console.error('onClick is not defined')}
}

ListItem.propTypes = {
  onClick: PropTypes.func.isRequired
}