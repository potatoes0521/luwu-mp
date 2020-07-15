/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-15 10:24:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 10:36:15
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

function FloatBtn() { 
  const navigatorToPublish = () => {
    Taro.navigateTo({
      url: '/pages/bidding_publish/index'
    })
  }
  return (
    <View
      className='float-btn'
      onClick={navigatorToPublish}
    >
      <Text>点我</Text>
      <Text>一键招标</Text>
    </View>
  )
}

FloatBtn.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}
