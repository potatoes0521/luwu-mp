/*
 * @Author: liuYang
 * @description: 首页
 * @path: 引入路径
 * @Date: 2020-06-17 11:12:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 14:39:00
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
import { getImage } from '@img/cdn'
import StickyTab from './components/StickyTab'
import FreeEvent from './components/FreeEvent'
import Bidding from './components/Bidding'
import Company from './components/Company'
import Brand from './components/Brand'

import './index.scss'

const bannerBigImg = getImage(`index/bannerBig.png?${Math.random()}`)

class Index extends Component {
  constructor() { 
    this.state = {
      loading: false,
      fixed: false
    }
    this.stickyScrollTop = 0
  }
  componentDidMount() { 
    this.login()
  }
  login() { 
    Login.login()
  }
  /**
   * 当计算出滚动区域高度
   * @param {Number} stickyScrollTop 需要滚动的高度
   * @return void
   */
  onComputedScrollTop(stickyScrollTop) {
    this.stickyScrollTop = stickyScrollTop
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
    const { fixed } = this.state
    if (scrollTop > this.stickyScrollTop && !fixed) {
      this.setState({
        fixed: true
      })
    } else if (scrollTop < this.stickyScrollTop && fixed) {
      this.setState({
        fixed: false
      })
    }
  }
  
  config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }

  render() {
    const {
      loading,
      fixed
    } = this.state
    return (
      <View className='page-wrapper skeleton' id='sticky'>
        <View className='banner-wrapper skeleton-square'>
          <Image className='banner-image' src={bannerBigImg}></Image>
        </View>
        <StickyTab
          fixed={fixed}
          onComputedScrollTop={this.onComputedScrollTop.bind(this)}
        />
        <FreeEvent />
        <Bidding />
        <Company />
        <Brand />
        {
          loading && <Skeleton />
        }
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
