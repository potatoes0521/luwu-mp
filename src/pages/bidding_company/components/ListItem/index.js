/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-06 12:03:06
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-06 13:53:18
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import PropTypes from 'prop-types'
import Upload from '@/components/Upload'

import './index.scss'

export default class ListItem extends Component { 

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  onSelect() { 
    const { item } = this.props
    this.props.onSelect(item)
  }
  renderFormItem(label, content) { 
    return (
      <View className='form-item'>
        <View className='form-label'>{label}</View>
        <View className='form-content'>{content}</View>
      </View>
    )
  }
  render() {
    const { item } = this.props
    return (
      <View className='item-wrapper'>
        <View className='title-wrapper'>
          <View className='company-name'>XXXXXXX</View>
          <View className='right-tips-wrapper'>
            <Text>xxxx</Text>
            <Text className='time'>xxxxx</Text>
          </View>
        </View>
        <View className='item-main'>
          <View className='total-price'>预计总价</View>
          <View className='form-line'>
            {this.renderFormItem('工长数量', 33333)}
            {this.renderFormItem('可同时开工工地', 33333)}
          </View>
          <View className='form-line'>
            {this.renderFormItem('设计师数量', 33333)}
          </View>
          <View className='form-line'>
            {this.renderFormItem('设计师单独收费', '元/㎡')}
          </View>
          <View className='form-line'>
            {this.renderFormItem('公司地址', '元/㎡')}
          </View>
          <View className='form-line form-line-small-margin'>
            {this.renderFormItem('公司介绍', '北京市昌平区北七家镇北京市昌平区北七家镇北京市昌平区北七家镇北京市昌平区北七家镇北京市昌平区北七家镇')}
          </View>
          <View className='form-line form-line-small-margin'>
            {this.renderFormItem('装修建议', '北京市昌平区北七家镇北京市昌平区北七家镇北京市昌平区北七家镇北京市昌平区北七家镇北京市昌平区北七家镇')}
          </View>
          <View className='form-line form-line-small-margin'>
            {this.renderFormItem('建议风格', '北京市昌平区北七家镇北京市昌平区北七家镇北京市昌平区北七家镇北京市昌平区北七家镇北京市昌平区北七家镇')}
          </View>
          <View className='upload-wrapper'>
            <Upload
              marginRightSize={30}
              imageList={item.images || []}
              imageSize={100}
            ></Upload>
          </View>
        </View>
        <View className='choose-btn' onClick={this.onSelect.bind(this)}>
          {
            item.select ? (
              <Text className='text-active'>加入比价</Text>
            ): (
              <Block>
                <Text className='iconfont iconjiahao add-icon'></Text>
                <Text>加入比价</Text>
              </Block>
            )
          }
        </View>
      </View>
    )
  }

}

ListItem.defaultProps = {
  item: {},
  onSelect: () => {console.error('onSelect is not defined in bidding_company/components/ListItem')}
}

ListItem.propTypes = {
  onClick: PropTypes.func.isRequired
}