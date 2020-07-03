/*
 * @Author: liuYang
 * @description: 笔记详情
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 17:13:36
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SafeAreaView from '@components/SafeAreaView'
import Skeleton from '@components/Skeleton'
import Login from '@utils/login'
import classNames from 'classnames'
import { getNoteDetails } from '@services/modules/note'
import { getImage } from '@assets/cdn'
import { random } from '@utils/numberToCode'
import Location from '@components/Location'
import noteState from '@config/noteState'
import BottomBtn from '@/components_note/BottomBtn'
import NoteFormMain from '@/components_note/NoteFormMain'
import ImageSwiper from './components/Swiper'
import ImageList from './components/ImageList'

import './index.scss'

class NoteDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = Object.assign({}, noteState, {
      // 除去公共key以外的字段定在这里
      distributorCount: 0,
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
        isShare: !!this.pageParams.shareType
      })
      this.setState(data)
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
      model,
      price,
      brand,
      remark,
      noteId,
      address,
      loading,
      isShare,
      updateAt,
      priceUnit,
      mainCategory,
      childCategory,
      goodsImageList,
      idCardImageList,
      distributorCount,
      priceTagImageList,
    } = this.state
    const bottomFixedButtonClassName = classNames({
      'bottom-fixed-wrapper': !isShare,
      'share-bottom-fixed-wrapper': isShare
    })
    const pageWrapperClassName = classNames('page-wrapper skeleton', {
      'bottom-padding160': isShare
    })
    return (
      <SafeAreaView
        title='记笔记'
        back={!isShare}
        home={isShare}
      >
        <View className={pageWrapperClassName}>
          <ImageSwiper imageList={goodsImageList} />
          <View className='form-wrapper padding-bottom20' >
            <NoteFormMain
              line
              brand={brand}
              model={model}
              price={price}
              noteId={noteId}
              isShare={isShare}
              updateAt={updateAt}
              priceUnit={priceUnit}
              mainCategory={mainCategory}
              childCategory={childCategory}
            />
          </View>
          {
            remark && (
              <View className='form-wrapper remark-wrapper'>
                <View className='remark-title'>笔记备注</View>
                <View className='remark-main'>{remark}</View>
              </View>
            )
          }
          <View className='form-wrapper'>
            <Location onlyShow address={address} />
          </View>
          {
            priceTagImageList && priceTagImageList.length && (
              <View className='form-wrapper'>
                <ImageList
                  imageList={priceTagImageList}
                  title='价签'
                />
              </View>
            )
          }
          {
            idCardImageList && idCardImageList.length && (
              <View className='form-wrapper'>
                <ImageList
                  imageList={idCardImageList}
                  title='名片'
                />
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
                  <View className='tips' onClick={this.submitOffer.bind(this)}>一键比价</View>
                </View>
              )
            }
            <BottomBtn
              onlyShowShare={isShare}
              rightBtnText='记笔记'
              onRightBtnClick={this.handleOnRightBtnClick.bind(this)}
            />
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
  }
}
export default connect(mapStateToProps)(NoteDetails)