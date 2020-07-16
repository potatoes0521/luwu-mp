/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-16 10:16:46
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 10:26:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './index.scss'

function BiddingMsg(props) { 
  const { item } = props
  return (
    <View className='bidding-msg-item-wrapper bidding-msg'>
      <View className='user-msg-wrapper'>
        <View className='user-msg'>
          <View className='user-icon'>
            <Image className='user-icon' src={item.avatar}></Image>
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
            <Text>{item.xiaoqu}</Text>
            <Text className='line'></Text>
            <Text>{item.countyName}</Text>
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
}

BiddingMsg.defaultProps = {
  item: {
    decorateTimeBefore: ''
  }
}