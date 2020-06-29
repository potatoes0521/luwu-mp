/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 14:41:33
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 15:53:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class Store extends Component { 


  constructor(props) {
    super(props)
    this.state = {
      storeList: [
        {
          storeId: 0,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 1,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 2,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 3,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 4,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 5,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 6,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 7,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 8,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 9,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 10,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 11,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 12,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 13,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 14,
          storeName: '北四环红星美凯龙店'
        },
        {
          storeId: 15,
          storeName: '北四环红星美凯龙店'
        },
      ]
    }
  }
  
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
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
            <View>建材专卖店</View>
            {/* <Text className='iconlujing iconfont bottom-icon'></Text> */}
          </View>
          <View className='btn'>
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