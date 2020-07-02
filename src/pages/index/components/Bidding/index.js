/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 11:19:15
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 20:34:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { handleRequestData } from '@config/houseType'

import './index.scss'

class Bidding extends Component { 
  navigatorTo() { 
    const { userInfo } = this.props
    let url = '/pages/bidding_publish/index'
    if (!userInfo.phone && !userInfo.isMember) {
      url = '/pages/vip/index'
    }
    Taro.navigateTo({ url })
  }
  navigatorBiddingList() { 
    Taro.navigateTo({
      url: '/pages/bidding_list/index'
    })
  }
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  render() {  
    const { biddingList } = this.props
    const array = biddingList.map(item => {
      const obj = handleRequestData(item)
      const text = (obj.bedroom.chinese || '-') + '室' + (obj.sittingroom.chinese || '-') + '厅' + (obj.cookroom.chinese || '-') + '厨' + (obj.washroom.chinese || '-') + '卫'
      return Object.assign({}, obj, {text})
    })
    const [data1 = {}, data2 = {}, data3 = {}, data4 = {}, data5 = {}] = array
    return (
      <View className='card-wrapper bidding'>
        <View className='card-plain'>
          <View className='plain-wrapper'>
            <View className='big-wrapper big-item color1' >
              <View className='title big-margin-bottom'>{data1.text}</View>
              <View className='middle-title'>
                <Text className='label'>类型</Text>
                <Text>{data1.decorateType ? '毛坯房' : '旧房翻新'}</Text> 
              </View>
              <View className='middle-title'>
                <Text className='label'>面积</Text>
                <Text>{data1.area}㎡</Text> 
              </View>
              <View className='middle-title'>
                <Text className='label'>预算</Text>
                <Text>10-15万</Text> 
              </View>
              {/* <View className='big-margin-top small-tips'>共有家装修公司投标</View> */}
              <View className='backgroundImage1'></View>
            </View>
            <View className='big-wrapper right-wrapper'>
              <View className='small-item color2'>
                <View className='title'>{data2.text}</View>
                {/* <View className='big-margin-top small-tips'>共有家装修公司投标</View> */}
                <View className='backgroundImage2'></View>
              </View>
              <View className='small-item color3'>
                <View className='title'>{data3.text}</View>
                {/* <View className='big-margin-top small-tips'>共有家装修公司投标</View> */}
                <View className='backgroundImage3'></View>
              </View>
            </View>
          </View>
          <View className='plain-wrapper margin-bottom'>
            <View className='big-item color4' >
              <View className='title'>{data4.text}</View>
              {/* <View className='big-margin-top small-tips'>共有家装修公司投标</View> */}
              <View className='backgroundImage4'></View>
            </View>
            <View className='small-item right-item color5'>
              <View className='title'>{data5.text}</View>
              {/* <View className='big-margin-top small-tips'>共有家装修公司投标</View> */}
              <View className='backgroundImage5'></View>
            </View>
          </View>
        </View>
        <View className='bottom-btn-wrapper'>
          <View className='btn' onClick={this.navigatorBiddingList.bind(this)}>
            <View>大家的招标</View>
            {/* <Text className='iconlujing iconfont bottom-icon'></Text> */}
          </View>
          <View className='btn' onClick={this.navigatorTo.bind(this)}>
            <View>我也要招标</View>
            <Text className='iconlujing iconfont bottom-icon'></Text>
          </View>
        </View>
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