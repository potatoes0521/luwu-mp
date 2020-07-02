/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-02 16:52:33
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 17:15:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class ListItem extends Component { 
  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }


  render() {
    const { item } = this.props
    return (
      <View className='item-wrapper'>
        <View className='item-main'>
          <View className='image-wrapper'>
            <Image lazyLoad className='item-image' mode='aspectFill' src={item.src}></Image>
          </View>
          <View className='main-wrapper'>
            <View className='item-title-wrapper'>
              <Text className='item-title'>三室二厅二厨二卫</Text>
              <Text className='item-time'>一天前</Text>
            </View>
            <View className='item-form'>
              <View className='form-item'>类型：</View>
              <View className='form-item'>面积：</View>
              <View className='form-item'>预算：</View>
            </View>
          </View>
        </View>
        <View className='bottom-label'>
          <View className='label'>
            <Text>共有</Text>
            <Text className='hight-light'>38</Text>
            <Text>家装修公司投标</Text>
          </View>
          <View className='process-text hight-light'>招标中</View>
        </View>
      </View>
    )
  }

}

ListItem.defaultProps = {
  item: {},
  onClick: () => {console.error('onClick is not defined')}
}

ListItem.propTypes = {
  onClick: PropTypes.func.isRequired
}