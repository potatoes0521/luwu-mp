/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 14:41:33
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 18:29:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {
  View,
  Text
} from '@tarojs/components'
import PropTypes from 'prop-types'
import { getStoreData } from '@services/modules/index'

import './index.scss'

export default class Store extends Component { 


  constructor() {
    
    this.state = {
      storeList: []
    }
  }
  componentDidMount() { 
    this.getStoreData()
  }
  getStoreData() { 
    getStoreData().then(res => {
      this.setState({
        storeList: res
      })
    })
  }
  navigator() { 
    Taro.navigateTo({
      url: '/pages/note_publish/index'
    })
  }
  static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  }
  
  render() {
    const { storeList } = this.state
    let newArray = []
    const step = 6
    for (var i = 0; i < storeList.length; i += step) {
      newArray.push(storeList.slice(i, i + step));
    }
    return (
      <View className='card-wrapper store'>
        <View className='card-plain'>
          <View className='like-table'>
            <View className='row-first'>
              <View className='cell'>全城共计50家建材城</View>
            </View>
            <View className='row'>
              <View className='cell'>1000个建材品牌</View>
              <View className='line'></View>
              <View className='cell'>3000家建材商店</View>
            </View>
          </View>
          <View className='store-list'>
            {
              newArray.map((item, index) => {
                const key = index
                let arr = [1, 2, 3, 4, 5, 6, 7]
                arr.sort(() => Math.random() - 0.5)
                const itemRender = item && item.map((ite, idx) => {
                  const k = ite.storeId
                  return (
                    <View
                      className={`store-item color${arr[idx]}`}
                      key={k}
                    >
                      {ite.storeName}
                    </View>
                  )
                })
                return (
                  <View
                    className='store-list-row'
                    key={key}
                  >
                    {
                      itemRender
                    }
                  </View>
                )
              })
            }
            
          </View>
        </View>
        <View className='bottom-btn-wrapper'>
          <View className='btn'>
            <View>建材商店</View>
            {/* <Text className='iconlujing iconfont bottom-icon'></Text> */}
          </View>
          <View className='btn' onClick={this.navigator.bind(this)}>
            <View>我要记笔记</View>
            <Text className='iconlujing iconfont bottom-icon'></Text>
          </View>
        </View>
      </View>
    )
  }

}

Store.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

Store.propTypes = {
  onClick: PropTypes.func.isRequired
}