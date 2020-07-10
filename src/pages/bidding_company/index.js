/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-06 11:59:55
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 09:23:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getStorage } from '@utils/storage'
import ListItem from './components/ListItem'

import './index.scss'

class BiddingCompany extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      shopList: [],
      userId: ''
    }
    this.pageParams = {}
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.handleRequestData()
  }
  /**
   * 请求公司数据
   * @return void
   */
  handleRequestData() { 
    this.setState({
      userId: this.pageParams.userId
    })
    getStorage(`bid_list_${this.pageParams.requireId}`).then(res => {
      const data = res.map(item => {
        return {...item, selectContrast: false, selectCollection: false}
      })
      let obj = {
        a: 1,
        b:2
      }
      let obj1 = { ...obj, c: 1 }
      obj1.a = 2
      console.log('obj1, obj', obj1, obj)
      this.setState({
        shopList: data
      })
    })
  }
  handleContrast(item) { 
    console.log('item', item)
  }
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    const {
      shopList,
      userId
    } = this.state
    console.log('shopList', shopList)
    const shopListRender = shopList.map((item, index) => {
      const key = item.shopId
      return (
        <ListItem
          key={key}
          {...item}
          userId={userId}
          index={index}
          onSelectContrast={this.handleContrast.bind(this)}
        />
      )
    })
    return (
      <SafeAreaView
        title='选择对比装修公司'
        back
      >
        <View className='page-wrapper'>
          {
            shopListRender
          }
          <View className='bottom-select-wrapper'>
            <View className='select-num-wrapper'>
              <Text>选中</Text>
              <Text className='heigh-light'>5</Text>
              <Text>家</Text>
            </View>
            <View className='select-btn'>开始对比</View>
          </View>
        </View>
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo,
  }
}
export default connect(mapStateToProps)(BiddingCompany)