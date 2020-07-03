/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:51:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 22:04:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Block
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SafeAreaView from '@components/SafeAreaView'
// import Skeleton from '@components/Skeleton'
import Login from '@utils/login'
// import classNames from 'classnames'
// import { getBiddingTemplate } from '@services/modules/bidding'
import { getHouseDetails } from '@services/modules/house'
import { getBidList } from '@services/modules/bidding'
import { handleRequestData } from '@config/houseType'
import { getImage } from '@assets/cdn'
import biddingState from '@config/biddingState'
import FromMain from './components/FormMain'
import ImageSwiper from './components/Swiper'

import './index.scss'

const defaultImage = [getImage('bidding/swiper_default.png')]

class BiddingDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = Object.assign({}, biddingState, {
      // 除去公共key以外的字段定在这里
      loading: true,
      isShare: false,
      shopList: [],
      userId: ''
    })
    this.pageParams = {}
    this.notLogin = true
  }

  async componentDidShow() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getHouseData()
    this.getBidList()
  }

  getHouseData() {
    getHouseDetails({
      requireId: this.pageParams.requireId
    }).then(res => {
      const data = handleRequestData(res)
      this.setState(data)
    })
  }
  getBidList() {
    getBidList({
      requireId: this.pageParams.requireId
    }).then(res => {
      this.setState({
        shopList: res
      })
    })
  }
  handleProgressText() { 
    const { progress } = this.state
    switch (progress) {
      case 0:
        // return '未招标';
        return '招标中';
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
  navigator() { 
    Taro.navigateTo({
      url: '/pages/table_contrast/index'
    })
  }
  renderProcess(title, content, next) { 
    return (
      <Block>
        <View className='process-plain'>
          <View className='plain-title'>{title}</View>
          <View className='plain-main'>{content}</View>
        </View>
        {
          next && <View className='iconfont iconsanjiaoxing1 next-icon'></View>
        }
      </Block>
    )
  }
  /**
   * 下拉刷新
   * @return void
   */
  onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading()
    this.getHouseData()
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
    navigationBarTitleText: '我的招标',
    enablePullDownRefresh: true,
    navigationStyle: 'custom'
  }

  render() {
    const {
      images,
      shopList,
      // loading,
      isShare,
      userId
    } = this.state
    const { userInfo } = this.props
    const progressText = this.handleProgressText()
    const title = (userId === userInfo.userId ? '我的' : '业主的') + '装修招标'
    return (
      <SafeAreaView
        title={title}
        back={!isShare}
      >
        <View className='page-wrapper skeleton' >
          <View className='details-swiper-wrapper skeleton-square' >
            <ImageSwiper imageList={Array.isArray(images) && images.length ? images : defaultImage} />
          </View>
          <View className='details-main-wrapper'>
            <View className='form-wrapper'>
              <FromMain
                {...this.state}
              />
            </View>
          </View>
          <View className='progress-btn'>当前阶段：{progressText}</View>
          <View className='bidding-wrapper'>
            <View>
              {
                shopList.length && (
                  <Text className='heigh-light-text'>{shopList.length}</Text>
                )
              }
              <Text>{shopList.length ? '家装修公司投标' : '还没有装修公司投标'}</Text>
            </View>
            <View>
              {/* <Text className='heigh-light-text'>99</Text> */}
              <Text>未量房</Text>
            </View>
          </View>
          <View className='bid-wrapper'>
            <View className='title-wrapper'>
              <View className='title-left'>
                <Text className='iconfont iconzhaobiao bid-icon'></Text>
                <Text>招标评比</Text>
              </View>
              <View className='title-tips'>
                {shopList.length ? `共${shopList.length}家装修公司投标` : '还没有装修公司投标'}
              </View>
            </View>
            <View className='form-item'>
              <View className='form-item-label'>
                {/* <View>一室一厅</View>
                <Text className='iconfont iconsanjiaoxing1 icon-xia'></Text> */}
              </View>
              <View className='form-content' onClick={this.navigator.bind(this)}>招标价格对比</View>
            </View>
            <View className='tips-wrapper'>
              <View>如上房型是本平台根据房型面积测算出的施工量，您可以选择跟您房屋类似的方案，对装修公司进行测比。</View>
              <View className='last'>装修公司的价格是根据您选择的房屋面积，利用装修公司的基础项价格估算的结果，可能会跟实际价格差距较大，仅供参考。</View>
            </View>
            {/* <View className='basics-wrapper'>
              <View className='basics-title'>
                <Text className='iconfont iconjiantou jiantou-icon'></Text>
                <Text>基础项最低价</Text>
              </View>
              <View className='basics-msg-item'>
                <Text>一号装修公司</Text>
                <Text>一号装修公司</Text>
                <Text>一号装修公司</Text>
              </View>
              <View className='basics-msg-item'>
                <Text>一号装修公司</Text>
                <Text>一号装修公司</Text>
                <Text>一号装修公司</Text>
              </View>
              <View className='basics-title basics-title-second' >
                <Text className='iconfont iconjiantou jiantou-icon'></Text>
                <Text>基础项最低价</Text>
              </View>
              <View className='basics-msg-item'>
                <Text>一号装修公司</Text>
                <Text>一号装修公司</Text>
                <Text>一号装修公司</Text>
              </View>
            </View> */}
            <View className='process-wrapper'>
              {this.renderProcess('方案比价','您还未约量房', true)}
              {this.renderProcess('报价审核','您未提交报价审核', true)}
              {this.renderProcess('签订合约','您还未签约', true)}
              {this.renderProcess('施工监管','您还未施工', true)}
              {this.renderProcess('竣工','无竣工项目')}
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