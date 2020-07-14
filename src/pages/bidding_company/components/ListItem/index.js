/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-06 12:03:06
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 09:25:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import PropTypes from 'prop-types'
import Upload from '@components/Upload'
import { formatTimeToChinese } from '@utils/timer'
import { connect } from '@tarojs/redux'

import './index.scss'

class ListItem extends Component { 

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
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
  onSelectCollection() {
    const {
      shopId,
      selectCollection,
    } = this.props
    if (selectCollection) return
    this.props.onSelectCollection(shopId)
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
    const { 
      index,
      userId,
      remark,
      address,
      createAt,
      shopName,
      userInfo,
      captainNum,
      designerNum,
      isDesignFee,
      minDesignFee,
      maxDesignFee,
      concurrentNum,
      selectContrast,
      renovationImage,
      renovationStyle,
      selectCollection,
      renovationPropose,
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
          <View className='total-price'>预计总价</View>
          <View className='form-line'>
            {this.renderFormItem('工长数量', captainNum)}
            {this.renderFormItem('可同时开工工地', concurrentNum)}
          </View>
          <View className='form-line'>
            {this.renderFormItem('设计师数量', designerNum)}
          </View>
          <View className='form-line'>
            {this.renderFormItem('设计师单独收费', isDesignFee ? `${minDesignFee || '-'} - ${maxDesignFee || '-'}元/㎡` : '否')}
          </View>
          {
            address && userInfo.userId === userId && (
              <View className='form-line'>
                {this.renderFormItem('公司地址', address)}
              </View>
            )
          }
          {
            remark && (
              <View className='form-line form-line-small-margin'>
                {this.renderFormItem('公司介绍', remark)}
              </View>
            )
          }
          {
            renovationPropose && (
              <View className='form-line form-line-small-margin'>
                {this.renderFormItem('装修建议', renovationPropose)}
              </View>
            )
          }
          {
            renovationStyle && (
              <View className='form-line form-line-small-margin'>
                {this.renderFormItem('建议风格', renovationStyle)}
              </View>
            )
          }
          {
            renovationImage && renovationImage.length && (
              <View className='upload-wrapper'>
                <Upload
                  marginRightSize={30}
                  imageList={renovationImage || []}
                  imageSize={100}
                ></Upload>
              </View>
            )
          }
        </View>
        <View className='choose-btn'>
          {
            userInfo.userId === userId && (
              <View
                className='btn-public'
                onClick={this.onSelectCollection.bind(this)}
              >
                {
                  selectCollection ? (
                    <Text className='text-active'>已加入收藏</Text>
                  ): (
                    <Block>
                      <Text className='iconfont iconjiahao add-icon'></Text>
                      <Text>加入收藏</Text>
                    </Block>
                  )
                }
              </View>
            )
          }
          <View
            className='btn-public'
            onClick={this.onSelectContrast.bind(this, showNameText)}
          >
            {
              selectContrast ? (
                <Text className='text-active'>已选中</Text>
              ): (
                <Block>
                  <Text className='iconfont iconjiahao add-icon'></Text>
                  <Text>加入比价</Text>
                </Block>
              )
            }
          </View>
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