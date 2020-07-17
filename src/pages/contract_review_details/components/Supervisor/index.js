/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-16 10:28:26
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-17 12:02:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
  Text
} from '@tarojs/components'

import './index.scss'

export default class Supervisor extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }

  render() {
    const { item } = this.props
    return (
      <View className='supervisor-wrapper'>
        <View className='title-wrapper'>招标监理</View>
        <View className='msg-wrapper'>
          <View className='msg-left'>
            <Image className='image' src={item.supervisorAvatar}></Image>
            <Text className='msg-user-name'>{item.supervisorUserName}</Text>
          </View>
          <View className='msg-phone'>111111111</View>
        </View>
      </View>
    )
  }

}

Supervisor.defaultProps = {
  item: {
    supervisorAvatar: '',
    supervisorUserName: '监理'
  }
}