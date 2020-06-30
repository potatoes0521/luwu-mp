/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:51:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 18:11:28
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
import Skeleton from '@components/Skeleton'
import Login from '@utils/login'
import classNames from 'classnames'
import { getBiddingDetails } from '@services/modules/bidding'
import { getImage } from '@img/cdn'
import { random } from '@utils/numberToCode'
import goodsState from '@config/noteState'
import FromMain from './components/FormMain'
import ImageSwiper from './components/Swiper'
import ImageVerticalList from './components/ImageVerticalList'

import './index.scss'

class BiddingDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = Object.assign({}, goodsState, {
      // 除去公共key以外的字段定在这里
      distributorCount: 0,
      loading: true,
      idCardImageList: [''], // 名片
      priceTagImageList: [''], // 价签图片
      isShare: false
    })
    this.pageParams = {}
    this.notLogin = true
  }

  async componentDidShow() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getNoteDetails()
  }

  getNoteDetails() { 
    getBiddingDetails({
      biddingId: this.pageParams.biddingId
    }).then((res) => {
      const json = Object.assign({}, res.data)
      delete res['data']
      if (!res.distributorCount || res.distributorCount < 10) {
        res.distributorCount = random(50, 100)
      }
      const data = Object.assign({}, res, json, {
        loading: false,
        isShare: this.pageParams.shareType
      })
      this.setState(data)
    })
  }
  handleEditData() { 
    Taro.navigateTo({
      url: `/pages/bidding_publish/index?pageType=edit&biddingId=${this.pageParams.biddingId}`
    })
  }
  handleOnRightBtnClick() {
    Taro.redirectTo({
      url: `/pages/bidding_publish/index?`
    })
  }
  submitOffer() { 
    Taro.showToast({
      title: '比价成功'
    })
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
      goodsImageList,
      priceTagImageList,
      idCardImageList,
      loading,
      isShare
    } = this.state
    const pageWrapperClassName = classNames('page-wrapper skeleton', {
      'bottom-padding160': isShare
    })
    return (
      <SafeAreaView
        title='我的招标'
        back={!isShare}
        home
      >
        <View className={pageWrapperClassName}>
          <View className='details-main-wrapper'>
            <View className='details-swiper-wrapper skeleton-square' >
              <ImageSwiper imageList={goodsImageList} />
            </View>
            <View className='form-wrapper'>
              <FromMain
                showRemark
                item={this.state}
              />
            </View>
            {
              ((priceTagImageList && priceTagImageList.length) || (idCardImageList && idCardImageList.length)) && (
                <View className='image-list-wrapper'>
                  {
                    priceTagImageList && (
                      <ImageVerticalList
                        imageList={priceTagImageList}
                        title='价签'
                      />
                    )
                  }
                  {
                    idCardImageList && (
                      <ImageVerticalList
                        imageList={idCardImageList}
                        title='名片'
                      />
                    )
                  }
                </View>
              )
            }
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