/*
 * @Author: liuYang
 * @description: 单独一个房产
 * @path: 引入路径
 * @Date: 2020-07-01 09:55:00
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-01 11:10:17
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class MineHouse extends Component { 
  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
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
    const { } = this.props
    const hasHouse = true
    return (
      <View className='house-list-wrapper msg-wrapper'>
        <View className='title-wrapper'>
          <View className='title-left'>
            <View className='icon-public-style iconfangwu iconfont'></View>
            <View className='title-text'>我的房屋</View>
          </View>
          <View className='title-right'>
            <View className='handle-text'>添加新房</View>
            <View className='line'></View>
            <View className='handle-text'>编辑</View>
            <View className='iconfont iconRectangle title-right-icon rotated'></View>
          </View>
        </View>
        <View className='like-border'></View>
        {
          !hasHouse ? (
            <Block>
              <View className='house-wrapper'>
                <View className='form-label house-label'>
                  <View className='house-title'>添加房屋信息</View>
                  <View className='house-tips'>添加房屋后，您将获得免费招标和3次免费建材比价机会</View>
                </View>
                <View className='from-content'>
                  <View className='iconfont iconRectangle rotated right-icon'></View>
                </View>
              </View>
            </Block>
          ) : (
            <Block>
              <View className='house-plain'>
                <View className='house-form-item'>
                  <View className='house-form-content'>一室二厅二厨二卫</View>
                  <View className='house-form-content margin-left30'>一室二厅二厨二卫</View>
                </View>
                  <View className='house-form-item'>
                  <View className='house-form-content'>面积: ㎡</View>
                  <View className='house-form-content margin-left30'>装修预算: 10-15万</View>
                </View>
                <View className='house-form-item'>
                  <View className='house-form-content'>北京市昌平区</View>
                </View>
                <View className='house-form-item'>
                  <View className='house-form-content'>预计 装修</View>
                </View>
              </View>
            </Block>
          )
        }
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
  }

}

MineHouse.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

MineHouse.propTypes = {
  onClick: PropTypes.func.isRequired
}