/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-15 17:41:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 17:21:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
  Text,
  Block
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'
import Auth from '@components/auth'
import { getOfferList } from '@services/modules/offer'
import './index.scss'

const headerImage = getImage('mine/default_header.png')

class Mine extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offerData: {}
    }
    this.errLogin = false
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getOfferList()
  }
  componentDidShow() { 
    const { userInfo } = this.props
    if (userInfo.token) {
      this.getOfferList()
    }
  }
  getOfferList() { 
    if (this.flag) return
    const { userInfo } = this.props
    getOfferList({
      userId: userInfo.userId,
      current: 1,
      pageSize: 1
    }).then(res => {
      this.setState({
        offerData: res.data[0] || {}
      })
    })
  }
  handleLogin() { 
    this.getOfferList()
  }
  goToVip() {
    Taro.navigateTo({
      url: '/pages/vip/index'
    })
  }
  renderFormItem(iconName, label, offerText, item) {
    return (
      <View className='form-item' data-item={item}>
        <View className='form-label' data-item={item}>
          <Text className={`iconfont icon-public-style ${iconName}`}></Text>
          <Text data-item={item}>{label}</Text>
        </View>
        <View className='form-content' data-item={item}>
          <View className='form-tips'>{offerText}</View>
          <View className='iconfont iconRectangle form-right-icon rotated' data-item={item}></View>
        </View>
      </View>
    )
  }
  handleClickItem(e) { 
    const {target: {dataset: {item}}} = e
    if (!item) return
    
  }
  navigatorTo({pageName, paramsStr}) { 
    Taro.navigateTo({
      url: `/pages/${pageName}/index?${paramsStr}`
    })
  }
  /**
   * 页面内转发
   * @param {Object} res 微信返回参数
   * @return void
   */
  onShareAppMessage() {
    return {
      title: `录屋,和监理一起开启装修之旅吧`,
      path: `/pages/index/index`,
      imageUrl: getImage('share/share_index.png')
    }
  }
  config = {
    navigationBarTitleText: '个人中心',
    navigationStyle: 'custom'
  }

  render() {
    const { userInfo } = this.props
    const { offerData } = this.state
    const notLogin = !userInfo.token
    const offerText = notLogin ? '登录后可见' : (offerData.quotationId ? (offerData.status === 1 ? '您的报价监理已审核' : '您的报价监理正在审核中') : '免费赠送1次')
    return (
      <SafeAreaView
        title='个人中心'
      >
        <View className='page-wrapper'>
          <View className='user-msg-wrapper'>
            <View className='user-head'>
              <Image className='user-head' src={!notLogin ? userInfo.avatarUrl : headerImage}></Image>
            </View>
            <View className='msg-text-wrapper'>
              {
                notLogin ? (
                  <Text className='not-login'>点击登录</Text>
                ) : (
                  <View className='login-msg'>
                    <View className='login-msg-wrapper'>
                      <View className='login-msg-name'>{userInfo.nickName || ''}</View>
                        <View className='login-msg-vip-wrapper'>
                          {
                            userInfo.isMember && (<Text className='iconfont iconhuiyuan vip-icon'></Text>)
                          }
                        <Text>{userInfo.isMember ? '录屋会员' : '登录用户' }</Text>
                      </View>
                    </View>
                    <View className='login-msg-phone-wrapper'>
                      {
                        userInfo.isMember ? (
                          <Text className='phone-msg'>手机号 {userInfo.phone}</Text>
                        ): (
                          <Text className='phone-tips' onClick={this.goToVip.bind(this)}>绑定手机号码立即成为录屋会员</Text>
                        )
                      }
                    </View>
                  </View>
                )
              }
            </View>
          </View>
          <View
            className='form-wrapper'
            onClick={
              this.navigatorTo.bind(this, {
                pageName: offerData && offerData.quotationId ? 'offer_examine_details' : 'offer_examine_publish',
                paramsStr: `quotationId=${offerData.quotationId}`
              })
            }
          >
            {this.renderFormItem('iconshenhe','我的装修招标', offerText, '')}
          </View>
          <View className='form-wrapper' onClick={this.handleClickItem.bind(this)}>
            {this.renderFormItem('icondingdan','外部报价审核', offerText,'pay_order')}
            {this.renderFormItem('icondianping','在线报价审核', offerText,'comment')}
            {this.renderFormItem('iconjubao','在线图纸审核', offerText,'report')}
            {this.renderFormItem('iconkefu','在线施工咨询', offerText,'service')}
          </View>
          <Auth onLogin={this.handleLogin.bind(this)} />
        </View>
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo,
  }
}
export default connect(mapStateToProps)(Mine)