/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-16 11:33:46
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 11:43:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

function Sign(props) {
  const {  } = props
  return (
    <View className='sign-wrapper'>
      <View className='title-wrapper'>签约成功</View>
      <View className='sign-main'>
        <View className='success-icon'></View>
        <View className='main-text'>
          <View>已与春秋装饰公司签约</View>
          <View>合计金额15288元</View>
        </View>
      </View>
    </View>
  )
}

Sign.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}