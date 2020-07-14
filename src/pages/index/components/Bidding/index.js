/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 11:19:15
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 16:39:05
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { handleRequestData } from '@config/houseType'

import './index.scss'

class Bidding extends Component { 
  navigatorTo() { 
    const { userInfo } = this.props
    let url = '/pages/bidding_publish/index'
    if (!userInfo.phone || !userInfo.isMember) {
      url = '/pages/vip/index?nextPage=bidding_publish'
    }
    Taro.navigateTo({ url })
  }
  navigatorToDetails(item) { 
    Taro.navigateTo({
      url: '/pages/bidding_details/index?requireId=' + item.requireId
    })
  }
  navigatorBiddingList() { 
    Taro.navigateTo({
      url: '/pages/bidding_list/index'
    })
  }
  renderTips({shopNum}) {
    return shopNum ? (
      <View className='big-margin-top small-tips'>共有{shopNum}家装修公司投标</View>
    ) : (
      <View className='big-margin-top small-tips'>还没有装修公司投标</View>
    )
  }
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  render() {  
    const { biddingList } = this.props
    const array = biddingList.map(item => {
      const obj = handleRequestData(item)
      const text = (obj.bedroom.chinese || '-') + '室' + (obj.sittingroom.chinese || '-') + '厅' + (obj.cookroom.chinese || '-') + '厨' + (obj.washroom.chinese || '-') + '卫'
      return {...obj, text}
    })
    const biddingListRender = array.map(item => {
      const key = item.requireId
      console.log('item', item)
      return (
        <View
          key={key}
          className='bidding-item-wrapper'
        >
          <View className='user-msg-wrapper'>
            <View className='user-msg'>
              <View className='user-icon'>
                <Image className='user-icon' src='https://luwu.oss-cn-beijing.aliyuncs.com/luwu-mp/image/index/freeEvent/mock1.png'></Image>
              </View>
              <View className='userText'>{item.userName}</View>
            </View>
            <View className='status'>
              成功招标
            </View>
          </View>
          <View className='item-main'>
            <View className='form-item'>
              <View className='form-label'>
                <Text>田园风光雅苑</Text>
                <Text className='line'></Text>
                <Text>田园风光雅苑</Text>
              </View>
              <View className='form-content'>111KM</View>
            </View>
            <View className='form-item'>
              <View>{item.text}</View>
              <View>{item.area}㎡</View>
              <View>预算{item.budget.moneyText || `${item.budgetMin || ''}-${item.budgetMax || ''}万`}</View>
            </View>
            <View className='form-item'>
              <View>计划于{item.decorateTimeBefore.substr(0, 7).replace('-', '年') + '月'}装修</View>
            </View>
          </View>
        </View>
      )
    })
    return (
      <View className='bidding'>
        {
          biddingListRender
        }
      </View>
    )
  }

}

Bidding.defaultProps = {
  biddingList: [],
  onClick: () => {console.error('onClick is not defined')}
}

Bidding.propTypes = {
  onClick: PropTypes.func.isRequired
}

// 如果需要引入store
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(Bidding);