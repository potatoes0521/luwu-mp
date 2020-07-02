/*
 * @Author: liuYang
 * @description: 单独一个房产
 * @path: 引入路径
 * @Date: 2020-07-01 09:55:00
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 09:50:44
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import PropTypes from 'prop-types'
import { moneyData, timeData } from '@config/chooseOneState'
import { getTimeDate } from '@utils/timer'
import { handleHouseType, oneMouthTimer } from '@/config/houseType'

import './index.scss'

export default class MineHouse extends Component { 
  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }
  navigatorToPublishHouse(type, item) { 
    let url = '/pages/house_publish/index'
    if (type === 'edit') { 
      url += `?pageType=edit&requireId=${item.requireId}`
    }
    Taro.navigateTo({ url })
  }
  renderBottomStyle(index, title = '', tips = '') { 
    return (
      <Block>
        <View className={`renovation-item-box border-color${index}`}>
          <View className='renovation-item-box-title'>{title}</View>
          <View className='renovation-item-box-tips'>{tips}</View>
        </View>
        <View className={`border-dashed border-color${index}`}></View>
        <View className='renovation-item-bottom-wrapper'>
          <View className={`renovation-item-bottom-line bg-color${index}`}></View>
          <View className={`renovation-item-bottom-circular border-color${index} font-color${index}`}>{index}</View>
          <View className={`renovation-item-bottom-triangle iconfont iconsanjiaoxing1 font-color${index}`}></View>
        </View>
      </Block>
    )
  }
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  render() {
    const { houseList } = this.props
    const houseListRender = houseList.map(item => {
      const key = item.requireId
      const roomData = handleHouseType(item)
      const {
        bedroom,
        sittingroom,
        cookroom,
        washroom,
      } = roomData
      const mouth = (getTimeDate(item.decorateTimeBefore) - getTimeDate(item.decorateTimeAfter)) / oneMouthTimer || 0
      const startTime = timeData.filter(ite => ite.timeMouth === mouth)[0]
      const budget = moneyData.filter(ite => ite.min === item.budgetMin)[0]
      return (
        <View className='house-list-wrapper msg-wrapper' key={key}>
          <View className='title-wrapper'>
            <View className='title-left'>
              <View className='icon-public-style iconfangwu iconfont'></View>
              <View className='title-text'>我的房屋</View>
            </View>
            <View className='title-right'>
              <View className='handle-text'>添加新房</View>
              <View className='line'></View>
              <View className='handle-text' onClick={this.navigatorToPublishHouse.bind(this, 'edit', item)}>编辑</View>
              <View className='iconfont iconRectangle title-right-icon rotated'></View>
            </View>
          </View>
          <View className='like-border'></View>
          <View className='house-plain'>
            <View className='house-form-item'>
              <View className='house-form-content'>
                {(bedroom.chinese || '-') + '室' + (sittingroom.chinese || '-') + '厅' + (cookroom.chinese || '-') + '厨' + (washroom.chinese || '-') + '卫'}
              </View>
              <View className='house-form-content margin-left30'>{item.decorateType ? '毛坯房' : '旧房翻新'}</View>
            </View>
              <View className='house-form-item'>
              <View className='house-form-content'>面积: {item.area}㎡</View>
              <View className='house-form-content margin-left30'>装修预算: {budget.moneyText}</View>
            </View>
            <View className='house-form-item'>
              <View className='house-form-content'>{item.address}</View>
            </View>
            {
              startTime && (
                <View className='house-form-item'>
                  <View className='house-form-content'>预计{startTime.substr(0, 7).replace('-', '年')}月装修</View>
                </View>
              )
            }
          </View>
          <View className='like-border'></View>
          <View className='title-wrapper'>
            <View className='title-left'>
              <View className='icon-public-style iconzhuangxiu iconfont'></View>
              <View className='title-text'>我的装修</View>
            </View>
          </View>
          <View className='renovation-plain'>
            <View className='renovation-item'>
              {this.renderBottomStyle(1, '装修招标', '您还未招标')}
            </View>
            <View className='renovation-item'>
              {this.renderBottomStyle(2, '对比装修报价', '您未邀请量房')}
            </View>
            <View className='renovation-item'>
              {this.renderBottomStyle(3, '装修报价审核', '您未提交审核')}
            </View>
            <View className='renovation-item'>
              {this.renderBottomStyle(4, '施工监管', '施工未开始')}
            </View>
          </View>
        </View>
      )
    })
    return houseList && houseList.length ? (
      houseListRender
    ) : (
        <View className='house-list-wrapper msg-wrapper' onClick={this.navigatorToPublishHouse.bind(this, 'new')}>
          <View className='title-wrapper'>
            <View className='title-left'>
              <View className='icon-public-style iconfangwu iconfont'></View>
              <View className='title-text'>我的房屋</View>
            </View>
          </View>
          <View className='like-border'></View>
          <View className='house-wrapper'>
            <View className='form-label house-label'>
              <View className='house-title'>添加房屋信息</View>
              <View className='house-tips'>添加房屋后，您将获得免费招标和3次免费建材比价机会</View>
            </View>
            <View className='from-content'>
              <View className='iconfont iconRectangle rotated right-icon'></View>
            </View>
          </View>
        </View>
    )
  }

}

MineHouse.defaultProps = {
  houseList: [],
  onClick: () => {console.error('onClick is not defined')}
}

MineHouse.propTypes = {
  onClick: PropTypes.func.isRequired
}