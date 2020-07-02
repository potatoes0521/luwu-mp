/*
 * @Author: liuYang
 * @description: 笔记详情
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 18:21:16
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
import { getNoteDetails } from '@services/modules/note'
import { getImage } from '@assets/cdn'
import { random } from '@utils/numberToCode'
import Location from '@components/Location'
import goodsState from '@config/noteState'
import NoteFromMain from '@/components_note/NoteFormMain'
import BottomBtn from '@/components_note/BottomBtn'
import ImageSwiper from './components/Swiper'
import ImageVerticalList from './components/ImageVerticalList'

import './index.scss'

class NoteDetails extends Component { 

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
    getNoteDetails({
      noteId: this.pageParams.noteId
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
      url: `/pages/note_publish/index?pageType=edit&noteId=${this.pageParams.noteId}`
    })
  }
  handleOnRightBtnClick() {
    Taro.redirectTo({
      url: `/pages/note_publish/index?`
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
      path: `/pages/note_details/index?shareType=1&userId=${userInfo.userId}`,
      imageUrl: getImage('share/share_note_details.png')
    }
  }
  config = {
    navigationBarTitleText: '笔记详情',
    enablePullDownRefresh: true,
    navigationStyle: 'custom'
  }

  render() {
    const {
      address,
      goodsImageList,
      priceTagImageList,
      idCardImageList,
      distributorCount,
      mainCategory,
      brand,
      loading,
      isShare
    } = this.state
    const {system} = this.props
    const navHeight = ((system && system.navHeight) || 120)
    const bottomFixedButtonClassName = classNames({
      'bottom-fixed-wrapper': !isShare,
      'share-bottom-fixed-wrapper': isShare
    })
    const pageWrapperClassName = classNames('page-wrapper skeleton', {
      'bottom-padding160': isShare
    })
    return (
      <SafeAreaView
        title={mainCategory.categoryName || '录屋'}
        back={!isShare}
        home
      >
        <View className={pageWrapperClassName}>
          <View
            style={{top:navHeight + 'rpx'}}
            className='note-details-location-wrapper'
          >
            <Location onlyShow address={address} >
              {
                !isShare && (
                  <View className='tips'>
                    <Text className='tips-text' onClick={this.handleEditData.bind(this)}>编辑</Text>
                  </View>
                )
              }
              
            </Location>
          </View>
          <View className='details-main-wrapper'>
            <View className='details-swiper-wrapper skeleton-square' >
              <ImageSwiper imageList={goodsImageList} />
            </View>
            <View className='form-wrapper'>
              <NoteFromMain
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
            <View className={bottomFixedButtonClassName}>
              {
                !isShare && (
                  <View className='offer-price-wrapper'>
                    <View className='left-text'>
                      全城共有{distributorCount || '99'}家{brand.brandName || ''}{mainCategory.categoryName}商店
                    </View>
                    <View className='tips' onClick={this.submitOffer.bind(this)}>一键问价</View>
                  </View>
                )
              }
              <BottomBtn
                onlyShowShare={isShare}
                rightBtnText='继续记笔记'
                onRightBtnClick={this.handleOnRightBtnClick.bind(this)}
              />
            </View>
          </View>
        </View>
        {
          loading && <Skeleton />
        }
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(NoteDetails)