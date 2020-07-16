/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-16 10:48:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 11:49:43
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block, Image } from '@tarojs/components'
import className from 'classnames'

import './index.scss'

const emptyData = ''

export default class Offer extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }
  
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  renderFormItem(label, content, icon = true) { 
    return (
      <Block>
        <View className='form-label'>{label}</View>
        <View className='form-content'>
          <Text>{content}</Text>
          {
            icon && <View className='icon-next iconfont iconRectangle rotated'></View>
          }
        </View>
      </Block>
    )
  }

  render() {
    const { progress } = this.props
    const mainWrapperClassName = className('offer-main-wrapper', {
      'empty-wrapper': progress === 0
    })
    return (
      <View className='offer-wrapper'>
        <View className='title-wrapper'>
          <Text className='title-text'>报价</Text>
          <Text className='link-text'>说明</Text>
        </View>
        <View className={mainWrapperClassName}>
          {
            progress ? (
              <Block>
                <View className='form-item'>
                  {this.renderFormItem('2室1厅1厨1卫', '查看基础施工工程量')}
                </View>
                <View className='form-item'>
                  {this.renderFormItem('2室1厅1厨1卫', '查看')}
                </View>
                <View className='form-item'>
                  {this.renderFormItem('2室1厅1厨1卫', 'sss', false)}
                </View>
              </Block>
            ): (
              <Block>
                <Image className='empty-image' src={emptyData} />
                <View className='empty-text'>使用免费报价系统，报价差异一目了然</View>
                <View className='empty-text'>招标监理在线审核，增项漏项尽收眼底</View>     
              </Block>
            )
          }
        </View>
      </View>
    )
  }

}

Offer.defaultProps = {
  progress: 0,
}
