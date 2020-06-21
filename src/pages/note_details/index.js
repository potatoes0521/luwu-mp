/*
 * @Author: liuYang
 * @description: 笔记详情
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 11:29:59
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
  config = {
    navigationBarTitleText: '笔记详情',
    navigationStyle: 'custom'
  }

  render() {
    const {
      address,
      goodsImageList,
      priceTagImageList,
      idCardImageList
    } = this.state
    const {system} = this.props
    const navHeight = ((system && system.navHeight) || 120)

    return (
      <SafeAreaView
        title='的笔记'
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