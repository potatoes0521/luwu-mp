/*
 * @Author: liuYang
 * @description: 选择类别
 * @path: 引入路径
 * @Date: 2020-06-18 18:18:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 11:21:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import SaveAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getStorage } from '@utils/storage'
import ListItem from '@/components_choose/ListItem'
import {houseType} from '@config/houseType'

import './index.scss'

class ChooseHouseType extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      roomList: houseType, // 房屋
      livingRoomList: [], // 客厅
      kitchenList: [], // 厨房
      toiletList: [], // 卫生间
      selectRoomData: {}, // 
      selectLivingRoomData: {}, // 
      selectKitchenData: {}, // 
      selectToiletData: {}, // 
    }
    this.pageParams = {}
  }

  componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && Login.login()
    if (this.pageParams.pageType === 'edit') {
      this.handleEdit()
    }
  }
  
  /**
   * 如果是编辑来处理编辑
   * @return void
   */
  handleEdit() { 
    getStorage('choose_house_type').then((res) => {
      this.setState({
        selectRoomData: res.bedroom,
        selectLivingRoomData: res.sittingroom,
        selectKitchenData: res.cookroom,
        selectToiletData: res.washroom,
      }, () => {
         this.chooseRoom(res.bedroom, true)
      })
    })
  }
  
  chooseRoom(item, autoNext) {
    const {
      selectRoomData,
      selectLivingRoomData
    } = this.state
    if (selectRoomData.num === item.num && !autoNext) return
    this.setState({
      selectRoomData: item,
      livingRoomList: houseType
    }, () => {
        if (autoNext) {
          this.chooseLivingRoom(selectLivingRoomData, autoNext)
        }
    })
  }
  chooseLivingRoom(item, autoNext) {
    const {
      selectLivingRoomData,
      selectKitchenData
    } = this.state
    if (selectLivingRoomData.num === item.num && !autoNext) return
    this.setState({
      selectLivingRoomData: item,
      kitchenList: houseType
    }, () => {
        if (autoNext) {
          this.chooseKitchen(selectKitchenData, autoNext)
        }
    })
  }
  chooseKitchen(item, autoNext) {
    const { selectKitchenData } = this.state
    if (selectKitchenData.num === item.num && !autoNext) return
    this.setState({
      selectKitchenData: item,
      toiletList: houseType
    })
  }
  chooseToilet(item) {
    const {
      selectKitchenData,
      selectLivingRoomData,
      selectRoomData
    } = this.state
    this.setState({
      selectToiletData: item
    })
    this.handlePrePageData({
      bedroom: selectRoomData,
      sittingroom: selectLivingRoomData,
      cookroom: selectKitchenData,
      washroom: item,
    })
  }
  /**
   * 处理上一页数据并返回
   * @return void
   */
  handlePrePageData(data) { 
    let pages = Taro.getCurrentPages() //  获取页面栈
    let prevPage = pages[pages.length - 2] // 上一个页面
    if (!prevPage) {
      return
    }
    prevPage.$component.setState(data, () => {
      Taro.navigateBack()
    })
  }

  config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  render() {
    const {
      roomList,
      livingRoomList,
      kitchenList,
      toiletList,
      selectRoomData, // 
      selectLivingRoomData, // 
      selectKitchenData, // 
      selectToiletData, // 
    } = this.state
    const {system} = this.props
    const navHeight = system && system.navHeight || 120
    const roomListRender = roomList.map(item => {
      const key = item.num
      const active = key === selectRoomData.num
      return (
        <ListItem
          key={key}
          item={item}
          borderRight
          active={active}
          valueKey='num'
          onClickItem={this.chooseRoom.bind(this)}
        />
      )
    })
    const livingRoomListRender = livingRoomList.map(item => {
      const key = item.num
      const active = key === selectLivingRoomData.num
      return (
        <ListItem
          key={key}
          item={item}
          borderRight
          active={active}
          valueKey='num'
          onClickItem={this.chooseLivingRoom.bind(this)}
        />
      )
    })
    const kitchenListRender = kitchenList.map(item => {
      const key = item.num
      const active = key === selectKitchenData.num
      return (
        <ListItem
          key={key}
          item={item}
          borderRight
          active={active}
          valueKey='num'
          onClickItem={this.chooseKitchen.bind(this)}
        />
      )
    })
    const toiletListRender = toiletList.map(item => {
      const key = item.num
      const active = key === selectToiletData.num
      return (
        <ListItem
          key={key}
          item={item}
          active={active}
          valueKey='num'
          onClickItem={this.chooseToilet.bind(this)}
        />
      )
    })
   
    return (
      <SaveAreaView
        title='选择户型'
        back
      >
        <View
          style={{
            height: `calc(100vh - ${navHeight}rpx)`
          }}
          className='page-wrapper'
        >
          <View className='fixed-nav'>
            <View className='fixed-nav-text'>房间</View>
            <View className='fixed-nav-text'>客厅</View>
            <View className='fixed-nav-text'>厨房</View>
            <View className='fixed-nav-text'>卫生间</View>
          </View>
          <View className='main-wrapper'>
            <View className='child-list-wrapper'>
              {
                roomListRender
              }
            </View>
            <View className='child-list-wrapper'>
              {
                livingRoomListRender
              }
            </View>
            <View className='child-list-wrapper'>
              {
                kitchenListRender
              }
            </View>
            <View className='child-list-wrapper'>
              {
                toiletListRender
              }
            </View>
          </View>
        </View>
      </SaveAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(ChooseHouseType)
