/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-02 16:50:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 17:34:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getHouseList } from '@services/modules/house'
import ListItem from './components/listItem'

import './index.scss'

class BiddingList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      biddingList: []
    }
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getBiddingList()
  }
  getBiddingList() { 
    getHouseList({}, this).then(res => {
      this.setState({
        biddingList: res
      })
    })
  }
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    const { biddingList } = this.state
    const biddingListRender = biddingList.map(item => {
      const key = item.requireId
      return (
        <ListItem key={key} item={item} />
      )
    })
    return (
      <SafeAreaView
        title='大家的装修招标'
        back
      >
        <View className='page-wrapper'>
          {
            biddingListRender
          }
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
export default connect(mapStateToProps)(BiddingList)