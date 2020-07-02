/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:51:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 15:37:36
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SafeAreaView from '@components/SafeAreaView'
// import Skeleton from '@components/Skeleton'
import Login from '@utils/login'
// import classNames from 'classnames'
// import { getBiddingTemplate } from '@services/modules/bidding'
import { getHouseDetails } from '@services/modules/house'
import { handleRequestData } from '@config/houseType'
import { getImage } from '@img/cdn'
import biddingState from '@/config/biddingState'
import FromMain from './components/FormMain'
import ImageSwiper from './components/Swiper'

import './index.scss'

class BiddingDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = Object.assign({}, biddingState, {
      // 除去公共key以外的字段定在这里
      loading: true,
      isShare: false
    })
    this.pageParams = {}
    this.notLogin = true
  }

  async componentDidShow() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getHouseData()
  }

  getHouseData() {
    getHouseDetails({
      requireId: this.pageParams.requireId
    }).then(res => {
      const data = handleRequestData(res)
      this.setState(data)
    })
  }
  handleProgressText() { 
    const { progress } = this.state
    switch (progress) {
      case 0:
        return '未招标';
      case 1:
        return '招标中';
      case 2:
        return '装修比价中';
      case 3:
        return '报价审核中';
      case 4:
        return '装修施工中';
    }
  }
  /**
   * 下拉刷新
   * @return void
   */
  onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading()
    this.getNoteDetails()
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
    const {userInfo} = this.props
    return {
      title: `${userInfo.nickName || '好友'}给你分享了他的建材笔记`,
      path: `/pages/bidding_details/index?shareType=1&userId=${userInfo.userId}`,
      imageUrl: getImage('share/share_bidding_details.png')
    }
  }
  
  config = {
    navigationBarTitleText: '我的招标',
    enablePullDownRefresh: true,
    navigationStyle: 'custom'
  }

  render() {
    const {
      images,
      // loading,
      isShare
    } = this.state
    const progressText = this.handleProgressText()
    return (
      <SafeAreaView
        title='我的招标'
        back={!isShare}
        home
      >
        <View className='page-wrapper skeleton' >
          <View className='details-swiper-wrapper skeleton-square' >
            <ImageSwiper imageList={images} />
          </View>
          <View className='details-main-wrapper'>
            <View className='form-wrapper'>
              <FromMain
                {...this.state}
              />
            </View>
            <View className='progress-btn'>当前阶段：{progressText}</View>
            <View className='bidding-wrapper'>
              <View>
                <Text className='heigh-light-text'>99</Text>
                <Text>99</Text>
              </View>
              <View>
                <Text className='heigh-light-text'>99</Text>
                <Text>99</Text>
              </View>
            </View>
            <View className='bid-wrapper'>
              
            </View>
          </View>
        </View>
        {
          // loading && <Skeleton />
        }
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
  }
}
export default connect(mapStateToProps)(BiddingDetails)