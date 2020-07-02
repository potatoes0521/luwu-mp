/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-15 17:41:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 21:34:47
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
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { getHouseList } from '@services/modules/house'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'
import Auth from '@components/auth'
import { getNoteList } from '@services/modules/note'
import MineHouse from './components/MineHouse/index'
import './index.scss'

const headerImage = getImage('mine/default_header.png')

class Mine extends Component {

  constructor(props) {
    super(props)
    this.state = {
      houseList: [],
      noteLength: 0
    }
    this.errLogin = false
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getHouseList()
    this.getNoteList()
  }
  componentDidShow() { 
    const { userInfo } = this.props
    if (userInfo.token) {
      this.getHouseList()
      this.getNoteList()
    }
  }
  handleLogin() { 
    this.getHouseList()
  }
  getHouseList() { 
    const { userInfo } = this.props
    getHouseList({
      userId: userInfo.userId
    }).then(res => {
      this.setState({
        houseList: res
      })
    })
  }
  getNoteList() { 
    getNoteList({}).then(res => {
      this.setState({
        noteLength: res.length
      })
    })
  }
  goToVip() {
    Taro.navigateTo({
      url: '/pages/vip/index'
    })
  }
  renderTabItem(iconName, title, tips) { 
    return (
      <Block>
        <Text className={`iconfont history-icon ${iconName}`}></Text>
        <View className='history-title'>{title}</View>
        <View className='history-tips'>{tips}</View>
      </Block>
    )
  }
  renderFormItem(iconName, label, item) {
    return (
      <View className='form-item' data-item={item}>
        <View className='form-label' data-item={item}>
          <Text className={`iconfont icon-public-style ${iconName}`}></Text>
          <Text data-item={item}>{label}</Text>
        </View>
        <View className='form-content' data-item={item}>
          <View className='iconfont iconRectangle form-right-icon rotated' data-item={item}></View>
        </View>
      </View>
    )
  }
  handleClickItem(e) { 
    const {target: {dataset: {item}}} = e
    if (!item) return
    
  }
  navigatorTo(pageName, paramsStr) { 
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
    const {
      houseList,
      noteLength
    } = this.state
    const notLogin = !userInfo.token
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
            onClick={this.navigatorTo.bind(this, 'offer_examine_publish')}
          >
            <View className='form-item'>
              <View className='form-label'>
                <Text className='iconfont icon-public-style iconshenhe'></Text>
                <Text>我的报价审核单</Text>
              </View>
              <View className='form-content'>
                <View className='form-tips'>还未提交报价审核</View>
                <View className='iconfont iconRectangle form-right-icon rotated'></View>
              </View>
            </View>
          </View>
          <View className='history-wrapper' >
            <View
              className='history-item-public'
              onClick={this.navigatorTo.bind(this, noteLength ? 'note_mine' : 'note_publish')}
            >
              {this.renderTabItem('iconji color1', '建材笔记', noteLength ? `已记录${noteLength}次` : '您还未记录')}
            </View>
            <View className='history-item-public'>
              {this.renderTabItem('iconbi color2', '建材比价', '您还未发起比价')}
            </View>
          </View>
          <MineHouse houseList={houseList} />
          <View className='form-wrapper' onClick={this.handleClickItem.bind(this)}>
            {
              !notLogin && (
                <Block>
                  {this.renderFormItem('icondingdan','支付订单', 'pay_order')}
                  {this.renderFormItem('icondianping','我的点评', 'comment')}
                </Block>
              )
            }
            {this.renderFormItem('iconjubao','我的举报', 'report')}
            {this.renderFormItem('iconkefu','联系客服', 'service')}
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