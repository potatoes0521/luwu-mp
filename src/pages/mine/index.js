/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-15 17:41:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-01 09:06:59
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
// import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getImage } from '@img/cdn'
import Auth from '@components/auth'

import './index.scss'

class Mine extends Component {

  constructor(props) {
    super(props)
    this.state={}
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }
  renderHouseFormItem(label, content) {
    return (
      <View className='house-form-item'>
        <View className='house-form-label'>{label}</View>
        <View className='house-form-content'>{content}</View>
      </View> 
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
    console.log('e', item)
    
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
    const hasHouse = false
    const notLogin = false
    return (
      <SafeAreaView
        title='个人中心'
      >
        <View className='page-wrapper'>
          <View className='user-msg-wrapper'>
            <View className='user-head'>
              <Image className='user-head' src={userInfo.avatarUrl}></Image>
            </View>
            <View className='msg-text-wrapper'>
              {notLogin && (<Text className='not-login'>点击登录</Text>)}
              <View className='login-msg'>
                <View className='login-msg-wrapper'>
                  <View className='login-msg-name'>{userInfo.nickName || ''}</View>
                  <View className='login-msg-vip-wrapper'>
                    <Text className='iconfont iconhuiyuan vip-icon'></Text>
                    <Text className=''>登录用户</Text>
                  </View>
                </View>
                <View className='login-msg-phone-wrapper'>
                  {/* <Text className='phone-msg'>手机号 138****5678</Text> */}
                  <Text className='phone-tips'>绑定手机号码立即成为录屋会员</Text>
                </View>
              </View>
            </View>
          </View>
          {
            hasHouse ? (
              <Block>
                <View className='house-wrapper form-wrapper'>
                  <View className='form-label house-label'>
                    <View className='house-title'>添加房屋信息</View>
                    <View className='house-tips'>添加房屋后，您将获得免费招标和3次免费建材比价机会</View>
                  </View>
                  <View className='from-content'>
                    <View className='iconfont iconRectangle rotated right-icon'></View>
                  </View>
                </View>
              </Block>
            ): (
                <Block>
                  <View className='house-list-wrapper msg-wrapper'>
                    <View className='title-wrapper'>
                      <View className='title-left'>
                        <View className='icon-public-style iconfangwu iconfont'></View>
                        <View className='title-text'>我的房屋</View>
                      </View>
                      <View className='title-right'>
                        <View className='handle-text'>添加新房</View>
                        <View className='iconfont iconRectangle title-right-icon rotated'></View>
                      </View>
                    </View>
                    <View className='house-plain'>
                      <View className='house-item'>
                        {this.renderHouseFormItem('房型', 'xxxxx')}
                        {this.renderHouseFormItem('户型', 'xxxxx')}
                        {this.renderHouseFormItem('面积', 'xxxxx')}
                        {this.renderHouseFormItem('房屋位置', 'xxxxx')}
                        {this.renderHouseFormItem('装修预算', 'xxxxx')}
                        {this.renderHouseFormItem('装修时间', 'xxxxx')}
                      </View>
                    </View>
                  </View>
                </Block>
            )
          }
          <View className='form-wrapper' onClick={this.handleClickItem.bind(this)}>
            {this.renderFormItem('icondingdan','支付订单', 'pay_order')}
            {this.renderFormItem('icondianping','我的点评', 'comment')}
            {this.renderFormItem('iconjubao','我的举报', 'report')}
            {this.renderFormItem('iconkefu','联系客服', 'service')}
          </View>
          <Auth />
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