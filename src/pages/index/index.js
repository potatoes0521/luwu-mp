/*
 * @Author: liuYang
 * @description: 首页
 * @path: 引入路径
 * @Date: 2020-06-17 11:12:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 12:33:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import React, { Component } from 'react'
import {
  View,
  Image,
} from '@tarojs/components'
import { connect } from 'react-redux'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'
import { getHouseList } from '@services/modules/house'
import { getOfferList } from '@services/modules/offer'
import Auth from '@components/auth'
import Skeleton from '@components/Skeleton'
import StickyTab from './components/StickyTab'
import FreeEvent from './components/FreeEvent'
import Bidding from './components/Bidding'
import Company from './components/Company'
import Brand from './components/Brand'
import Store from './components/Store'
  
import './index.scss'

const bannerBigImg = getImage(`index/bannerBig.png?${Math.random()}`)

class Index extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      loading: false,
      fixed: false,
      tabActiveIndex: 0,
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
   * 当计算出滚动区域高度
   * @param {Number} stickyScrollTop 粘性需要滚动的高度
   * @return void
   */
  onComputedScrollTop(data) {
    this.stickyScrollTop = data
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
  onPageScroll(e) { 
    const { scrollTop } = e
    const { fixed, tabActiveIndex } = this.state
    const {
      stickyScrollTop,
      biddingScrollTop,
      companyScrollTop,
      brandScrollTop,
      storeScrollTop,
      screenHalf
    } = this.stickyScrollTop
    // 计算要不要固定
    if (scrollTop > stickyScrollTop && !fixed) {
      this.setState({
        fixed: true
      })
    } else if (scrollTop < stickyScrollTop && fixed) {
      this.setState({
        fixed: false
      })
    }
    // 屏幕中键那个线应该滚动的位置
    const screenHalfLine = screenHalf + scrollTop
    let nextTab = ''
    if (screenHalfLine >= storeScrollTop) {
      nextTab = 3
    } else if (screenHalfLine >= brandScrollTop) {
      nextTab = 2
    } else if (screenHalfLine >= companyScrollTop) {
      nextTab = 1
    } else if (screenHalfLine >= biddingScrollTop) {
      nextTab = 0
    }
    if (nextTab === tabActiveIndex) return
    this.setState({
      tabActiveIndex: nextTab
    })
  }

  render() {
    const {
      loading,
      fixed,
      tabActiveIndex,
      biddingList,
      offerData
    } = this.state
    return (
      <View className='page-wrapper skeleton' id='sticky'>
        <View className='banner-wrapper skeleton-square'>
          <Image className='banner-image' src={bannerBigImg}></Image>
        </View>
        <StickyTab
          fixed={fixed}
          activeIndex={tabActiveIndex}
          onComputedScrollTop={this.onComputedScrollTop.bind(this)}
        />
        <FreeEvent offerData={offerData} />
        <Bidding biddingList={biddingList} />
        <Company />
        <Brand />
        <Store />
        {
          loading && <Skeleton />
        }
        <Auth />
      </View>
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
