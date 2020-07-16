/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-06 12:03:06
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 17:50:36
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import PropTypes from 'prop-types'
import { formatTimeToChinese } from '@utils/timer'
import { connect } from '@tarojs/redux'

import './index.scss'

class ListItem extends Component { 
  constructor(props) { 
    super(props)
  }
  onSelectContrast(shopName) {
    const {
      shopId,
      selectContrast,
    } = this.props
    if(selectContrast) return
    this.props.onSelectContrast({
      shopId,
      shopName
    })
  }
  onClickSign() {
    const {
      shopId,
      selectCollection,
    } = this.props
    if (selectCollection) return
    this.props.onClickSign(shopId)
  }
  renderTitle(title, content) {
    return (
      <View className='form-title-wrapper'>
        <View className='form-title-left'>
          <View className='form-title-line'></View>
          <View className='form-title'>{title}</View>
        </View>
        <View className='form-title-content'>{content}</View>
      </View>
    )
  }
  renderFormItem(label, content, className) {
    return (
      <View className='form-company-item'>
        <View className={`image ${className}`}></View>
        <View className='form-label'>{label}</View>
        <View className='form-content'>{content}</View>
      </View>
    )
  }
  render() {
    const { 
      index,
      userId,
      address,
      createAt,
      shopName,
      userInfo,
      totalPrice,
      captainNum,
      designerNum,
      concurrentNum,
      selectContrast,
      selectCollection,
    } = this.props
    const showNameText = userInfo.userId === userId ? shopName : `${index + 1}号装修公司`
    return (
      <View className='item-wrapper'>
        <View className='title-wrapper'>
          <View className='company-name'>{showNameText}</View>
          <View className='right-tips-wrapper'>
            <Text className='time'>{formatTimeToChinese(createAt)}</Text>
          </View>
        </View>
        <View className='item-main'>
          {this.renderTitle('预计总价', totalPrice)}
          {this.renderTitle('公司地址', address)}
          {this.renderTitle('公司规模', '')}
          <View className='form-company'>
            {this.renderFormItem(designerNum + '人', '设计师数量', 'designer')}
            {this.renderFormItem(captainNum + '人', '工长数量', 'captain')}
            {this.renderFormItem(concurrentNum + '个', '可同时开工工地', 'site')}
          </View>
        </View>
        <View className='choose-btn'>
          {
            userInfo.userId === userId ? (
              <Block>
                {
                  selectContrast ? (
                    <View className='text-active'>已加入</View>
                  ): ( 
                    <View
                      className='btn-public'
                      onClick={this.onSelectContrast.bind(this, showNameText)}
                    >加入比价</View>
                  )
                }
                {
                  selectCollection ? (
                    <View className='text-active'>已加入收藏</View>
                  ): (
                    <View
                      className='btn-public'
                      onClick={this.onClickSign.bind(this)}
                    >人工审核</View>
                  )
                }
              </Block>
            ) : (
              selectContrast ? (
                <View className='text-active'>已加入</View>
              ): ( 
                <View
                  className='other-btn'
                  onClick={this.onSelectContrast.bind(this, showNameText)}
                >加入比价</View>
              )
            )
          }
        </View>
      </View>
    )
  }

}

ListItem.defaultProps = {
  address: '',
  captainNum: '',
  concurrentNum: '',
  designerNum: '',
  isDesignFee: 0,
  remark: '',
  select: false,
  images: [],
  shopName: '',
  onSelectContrast: () => {
    console.error('onSelectContrast is not defined in bidding_company/components/ListItem')
  }
}

ListItem.propTypes = {
  onSelectContrast: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(ListItem);