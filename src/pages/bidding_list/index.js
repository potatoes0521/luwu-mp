/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-02 16:50:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 17:57:41
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
import { getImage } from '@img/cdn'
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
  /**
   * 下拉刷新
   * @return void
   */
  onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading()
    this.getBiddingList()
    // 隐藏导航栏加载框
    Taro.hideNavigationBarLoading();
    // 停止下拉动作
    Taro.stopPullDownRefresh();
  }
  /**
   * 页面内转发
   * @param {Object} res 微信返回参数
   * @return void
   */
  onShareAppMessage() {
    const { userInfo } = this.props
    return {
      title: `录屋,和监理一起开启装修之旅吧~`,
      path: `/pages/index/index?shareType=1&userId=${userInfo.userId}`,
      imageUrl: getImage('share/share_index.png')
    }
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