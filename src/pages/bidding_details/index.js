/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:51:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-06 17:46:59
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
import classNames from 'classnames'
import { getHouseDetails } from '@services/modules/house'
import {
  getBidList,
  getOfferCase
} from '@services/modules/bidding'
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
      userId: '',
      modelViewTop: 0,
      templateList: [],
      activeTemplate: {
        name: '一室一厅一卫',
        id: 0
      },
      showTemplateModel: false
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
      this.setState(data, () => {
        this.getViewPosition()
      })
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
    getOfferCase({}).then(res => {
      const templateList = res.map((item, index) => ({
        name: item.name,
        id: index
      }))
      this.setState({ templateList })
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
  /**
   * 查询全部样式组件
   * @param {String} selector 被引用为骨架屏的样式类名
   * @return void
   */
  getViewPosition() { 
    Taro.createSelectorQuery().select('.hide-line').boundingClientRect().exec(res => {
      this.setState({
        modelViewTop: res[0].top * 2
      })
    })
  }
  stopPropagation(e) { 
    e && e.stopPropagation()
  }
  onChooseTemplate(e) {
    e && e.stopPropagation()
    const { showTemplateModel } = this.state
    this.setState({
      showTemplateModel: !showTemplateModel
    })
  }
  chooseTemplateItem(item, e) { 
    e && e.stopPropagation()
    this.setState({
      activeTemplate: item,
      showTemplateModel: false
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
  onPageScroll() {
    this.getViewPosition()
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
      userId,
      modelViewTop,
      templateList,
      activeTemplate,
      showTemplateModel
    } = this.state
    const { userInfo } = this.props
    const progressText = this.handleProgressText()
    const title = (userId === userInfo.userId ? '我的' : '业主的') + '装修招标'
    const templateListRender = templateList.map(item => {
      const key = item.id
      const itemClassName = classNames('template-plain-item', {
        'template-plain-item-active': key === activeTemplate.id
      })
      return (
        <View
          key={key}
          className={itemClassName}
          onClick={this.chooseTemplateItem.bind(this, item)}
        >{item.name || ''}</View>
      )
    })
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
            <View className='hide-line'></View>
            {
              showTemplateModel && (
                <Block>
                  <View className='template-wrapper' onTouchMove={this.stopPropagation.bind(this)}></View>
                  <View
                    className='template-plain'
                    style={{
                      top: modelViewTop + 'rpx',
                      height: `calc(100vh - ${modelViewTop}rpx)`
                    }}
                  >
                    <View className='template-plain-main'>
                      <View className='template-plain-item template-plain-item-title' onClick={this.onChooseTemplate.bind(this)}>
                        <View className='text'>{activeTemplate.name}</View>
                        <Text className='iconfont iconsanjiaoxing1 rotated icon-template'></Text>
                      </View>
                      <View
                        className='template-plain-main-box'
                      >
                        {
                          templateListRender
                        }
                      </View>
                    </View>
                  </View>
                </Block>
              )
            }
            <View className='form-item'>
              <View className='form-item-label' onClick={this.onChooseTemplate.bind(this)}>
                <Text>{activeTemplate.name}</Text>
                <Text className='iconfont iconsanjiaoxing1 icon-xia'></Text>
              </View>
              <View className='form-content' onClick={this.navigator.bind(this)}>招标价格对比</View>
            </View>
            <View className='tips-wrapper'>
              <View>如上房型是本平台根据房型面积测算出的施工量，您可以选择跟您房屋类似的方案，对装修公司进行测比。</View>
              <View className='last'>装修公司的价格是根据您选择的房屋面积，利用装修公司的基础项价格估算的结果，可能会跟实际价格差距较大，仅供参考。</View>
            </View>
            <View className='basics-wrapper'>
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
            </View>
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