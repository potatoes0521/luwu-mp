/*
 * @Author: liuYang
 * @description: 笔记详情
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 11:49:26
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
import Login from '@utils/login'
import { getNoteDetails } from '@services/modules/note'
import { defaultResourceImgURL } from '@config/request_config'
import { random } from '@utils/numberToCode'
import Location from '@components/Location'
import goodsState from '@config/noteGoodsKey'
import NoteFromMain from '@/note_components/NoteFormMain'
import BottomBtn from '@/note_components/BottomBtn'
import ImageSwiper from './components/Swiper'
import ImageVerticalList from './components/ImageVerticalList'

import './index.scss'

class index extends Component { 

  constructor(props) {
    super(props)
    this.state = Object.assign({}, goodsState, {
      // 除去公共key以外的字段定在这里
      distributorCount: 0
    })
    this.pageParams = {}
  }

  async componentDidMount() { 
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
      const data = Object.assign({}, res, json)
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
      url: `/pages/note_publish/index`
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
    return {
      title: `卖板信息实时更新，猛戳了解详情`,
      path: `/pages/index/index`,
      imageUrl: `${defaultResourceImgURL}/share/share_index.png`
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
      brand
    } = this.state
    const {system} = this.props
    const navHeight = ((system && system.navHeight) || 120)

    return (
      <SafeAreaView
        title={mainCategory.categoryName || '录屋'}
        back
        home
      >
        <View className='page-wrapper'>
          <View
            style={{top:navHeight + 'rpx'}}
            className='note-details-location-wrapper'
          >
            <Location onlyShow address={address} >
              <View className='tips'>
                <Text className='tips-text' onClick={this.handleEditData.bind(this)}>编辑</Text>
              </View>
            </Location>
          </View>
          <View className='details-main-wrapper'>
            <View className='details-swiper-wrapper'>
              <ImageSwiper imageList={goodsImageList} />
            </View>
            <NoteFromMain
              showRemark
              item={this.state}
            />
            {
              (priceTagImageList || idCardImageList) && (
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
            <View className='bottom-fixed-wrapper'>
              <View className='offer-price-wrapper'>
                <View className='left-text'>
                  全城共有{distributorCount || '99'}家{brand.brandName || ''}{mainCategory.categoryName}专卖店
                </View>
                <View className='tips'>一键问价</View>
              </View>
              <BottomBtn
                rightBtnText='继续记笔记'
                onRightBtnClick={this.handleOnRightBtnClick.bind(this)}
              />
            </View>
          </View>
        </View>
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
export default connect(mapStateToProps)(index)