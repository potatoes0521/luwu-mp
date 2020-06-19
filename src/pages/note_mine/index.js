/*
 * @Author: 我的笔记
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:36
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 09:30:00
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import Location from '@components/Location'
import SaveAreaView from '@components/SafeAreaView'

import './index.scss'

class index extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '我的笔记',
    navigationStyle: 'custom'
  }

  render() {
    const noteListRender = [1, 2].map(item => {
      return (
        <View className='note-item' key={item}>
          <Location onlyShow />
          <View className='note-main'>
            <View className='note-line-details'>
              <View className='note-detail-item'>
                <View className='note-detail-item-label'>品类</View>
                <View className='note-detail-item-content'>1111</View>
              </View>
              <View className='note-detail-item'>
                <View className='note-detail-item-label'>品牌</View>
                <View className='note-detail-item-content'>1111</View>
              </View>
            </View>
            <View className='note-line-details'>
              <View className='note-detail-item'>
                <View className='note-detail-item-label'>价格</View>
                <View className='note-detail-item-content'>111</View>
              </View>
              <View className='note-detail-item'>
                <View className='note-detail-item-label'>型号</View>
                <View className='note-detail-item-content'>1111</View>
              </View>
            </View>
            <View className='note-line-details'>
              <View className='note-detail-item'>
                <View className='note-detail-item-label'>记录时间</View>
                <View className='note-detail-item-content'>11111</View>
              </View>
            </View>
            <View className='upload'>
              
            </View>
          </View>
        </View>
      )
    })
    return (
      <SaveAreaView
        title='的笔记'
        back
        home
      >
        <View className='page-wrapper'>
          {
            noteListRender
          }
        </View>
      </SaveAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(index)