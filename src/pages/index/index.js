/*
 * @Author: liuYang
 * @description: 首页
 * @path: 引入路径
 * @Date: 2020-06-17 11:12:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 14:53:28
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { getIndexListData } from '@services/modules/index'
import Skeleton from '@components/Skeleton'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'
import Auth from '@components/auth'
import SafeAreaView from '@components/SafeAreaView'
import { getHouseList } from '@services/modules/house'
import { getOfferList } from '@services/modules/offer'
import News from './components/News'
import FreeEvent from './components/FreeEvent'
import Bidding from './components/Bidding'

import './index.scss'

const bannerBigImg = getImage(`index/bannerNew.png?${Math.random()}`)

class Index extends Component {
  constructor() { 
    this.state = {
      loading: false,
      biddingList: [],
      offerData: {}
    }
    this.stickyScrollTop = {}

  }
  async componentDidMount() { 
    await Login.login()
    this.getHouseList()
    this.getOfferList()
  }
  getHouseList() { 
    getHouseList().then(res => {
      this.setState({
        biddingList: res.splice(0, 5)
      })
    })
  }
  getOfferList() { 
    if (this.flag) return
    const { userInfo } = this.props
    getOfferList({
      userId: userInfo.userId,
      current: 1,
      pageSize: 1
    }).then(res => {
      this.setState({
        offerData: res.data[0] || {}
      })
    })
  }
  /**
   * 页面内转发
   * @param {Object} res 微信返回参数
   * @return void
   */
  onShareAppMessage() {
    const {userInfo} = this.props
    return {
      title: `录屋,和监理一起开启装修之旅吧~`,
      path: `/pages/index/index?shareType=1&userId=${userInfo.userId}`,
      imageUrl: getImage('share/share_index.png')
    }
  }
  
  config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }

  render() {
    const {
      loading,
      biddingList,
      offerData
    } = this.state
    return (
      <SafeAreaView title='录屋'>
        <View className='page-wrapper skeleton' id='sticky'>
          <View className='banner-wrapper skeleton-square'>
            <Image className='banner-image' src={bannerBigImg}></Image>
          </View>
          <News />
          <FreeEvent offerData={offerData} />
          <Bidding biddingList={biddingList} />
          {
            loading && <Skeleton />
          }
          <Auth />
        </View>
      </SafeAreaView>
    )
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user_msg.userInfo,
  };
};
export default connect(
  mapStateToProps
)(Index);
