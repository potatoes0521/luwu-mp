/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-06 12:03:06
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-17 10:09:40
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
  /**
   * 处理人工审核
   * @return void
   */
  onClickExamine() {
    const { shopId, examine } = this.props
    if (examine) return
    this.props.onClickExamine(shopId)
  }
  /**
   * 处理预约量房
   * @return void
   */
  handleOrder() { 
    
  }
  navigatorToExamine() { 
    const { shopId, listType } = this.props
    if (listType !== 'examine') return
    console.log('shopId', shopId)
  }
  /**
   * 返回标题
   * @param {String} title 标题
   * @param {String} content 内容
   * @return void
   */
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
  /**
   * 公司规模内容
   * @param {String} label 数量
   * @param {String} content 内容描述
   * @param {String} className 类型
   * @return void
   */
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
      examine,
      createAt,
      shopName,
      listType,
      userInfo,
      totalPrice,
      captainNum,
      designerNum,
      concurrentNum,
      selectContrast,
    } = this.props
    const showNameText = userInfo.userId === userId ? shopName : `${index + 1}号装修公司`
    console.log('listType', listType)
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
            listType === 'bidding' && (
              true ? (
                <View className='bidding-text'>当前阶段：</View>
              ): (
                <View
                  onClick={this.handleOrder.bind(this)}
                  className='plain-btn btn-public'
                >预约量房</View>
              )
            )
          }
          {
            listType === 'offer' && (
              userInfo.userId === userId ? (
                <Block>
                  {
                    selectContrast ? (
                      <View className='text-active'>已加入</View>
                    ): ( 
                      <View
                        className='btn-public small-btn-public'
                        onClick={this.onSelectContrast.bind(this, showNameText)}
                      >加入比价</View>
                    )
                  }
                  {
                    examine ? (
                      <View className='text-active'>审核状态</View>
                    ): (
                      <View
                        className='btn-public small-btn-public'
                        onClick={this.onClickExamine.bind(this)}
                      >人工审核</View>
                    )
                  }
                </Block>
              ) : (
                selectContrast ? (
                  <View className='text-active'>已加入</View>
                ): ( 
                  <View
                    className='default-btn btn-public'
                    onClick={this.onSelectContrast.bind(this, showNameText)}
                  >加入比价</View>
                )
              )
            )
          }
          {
            listType === 'examine' && (
              true ? (
                <View className='text-active'>监理审核中</View>
              ): (
                <View
                  onClick={this.navigatorToExamine.bind(this)}
                  className='plain-btn btn-public'
                >查看审核详情</View>
              )
            )
          }
        </View>
      </View>
    )
  }

}

ListItem.defaultProps = {
  remark: '',
  images: [],
  address: '',
  shopName: '',
  listType: 'examine',
  select: false,
  captainNum: '',
  isDesignFee: 0,
  designerNum: '',
  concurrentNum: '',
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