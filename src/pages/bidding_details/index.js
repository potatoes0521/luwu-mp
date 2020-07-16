/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:51:41
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 15:38:49
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SafeAreaView from '@components/SafeAreaView'
// import Skeleton from '@components/Skeleton'
import Login from '@utils/login'
// import classNames from 'classnames'
import { getBidList } from '@services/modules/bidding'
import { getImage } from '@assets/cdn'
import biddingState from '@config/biddingState'
import { setStorage, removeStorage } from '@utils/storage'
import BiddingMsg from './components/BiddingMsg'
import Supervisor from './components/Supervisor'
import Bidding from './components/Bidding'
import Offer from './components/Offer'
import Contract from './components/Contract'
import Sign from './components/Sign'
import Explain from './components/Explain'
  
import './index.scss'

class BiddingDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      ...biddingState,
      // 除去公共key以外的字段定在这里
      userId: '',
      signType: '',
      signTitle: '',
      isShare: false,
      showSign: false,
    }
    this.pageParams = {}
    this.notLogin = true
  }

  async componentDidMount() { 
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getBidList()
  }
  componentWillUnmount() {
    removeStorage(`bid_list_${this.pageParams.requireId}`)
    removeStorage(`active_template_${this.pageParams.requireId}`)
  }
  async componentDidShow() {
    const {userInfo} = this.props
    if(!userInfo.token) {return}
  }
  
  getBidList() {
    getBidList({
      requireId: this.pageParams.requireId
    }).then(res => {
      // this.setState({ shopList: res })
    })
  }
  navigator() { 
    const {
      activeTemplate,
      userId
    } = this.state
    setStorage(`active_template_${this.pageParams.requireId}`, activeTemplate)
    Taro.navigateTo({
      url: `/pages/bidding_company/index?requireId=${this.pageParams.requireId}&userId=${userId}`
    })
  }
  handleSignShow(signType, signTitle) {
    this.setState({
      signType,
      signTitle,
      showSign: true
    })
  }
  handleSignClose() {
    this.setState({
      showSign: false
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
      // shopList,
      // loading,
      isShare,
      showSign,
      signType,
      signTitle,
      // progress,
    } = this.state
    // const { userInfo } = this.props
    // const progressText = handleProgressText(progress)
    return (
      <SafeAreaView
        title='招标详情'
        back={!isShare}
      >
        <View className='page-wrapper'>
          <BiddingMsg />
          <View className='main-wrapper'>
            <Supervisor />
            <Bidding onClickSign={this.handleSignShow.bind(this)} />
            <Offer onClickSign={this.handleSignShow.bind(this)} />
            <Contract onClickSign={this.handleSignShow.bind(this)} />
            <Sign />
            <Explain
              visit={showSign}
              signType={signType}
              signTitle={signTitle}
              onClose={this.handleSignClose.bind(this)}
            />
          </View>
        </View>
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