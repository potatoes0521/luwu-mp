/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:27:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 11:52:49
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { publishBidding } from '@services/modules/bidding'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'
import { removeStorage } from "@utils/storage"
import biddingState from '@config/biddingState'
import FormForHouse from '@/components_bidding/FormForHouse'
import FormForUserInfo from '@/components_bidding/FormForUserInfo'

import './index.scss'

class BiddingPublish extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...biddingState,
      // 除去公共key以外的字段定在这里
    }
    this.pageParams = {}
    this.timer = null
    this.formForHouse = null
    this.formForUser = null
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    // 判断进来的时候有么有房屋ID  有就处理  没有就去下一个判断
    if (this.pageParams.requireId) {
      this.setState({
        requireId: this.pageParams.requireId
      })
    }
  }
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  async submit() {
    let { requireId } = this.state
    const formForHouse = this.formForHouse.judgeAndEmitData()
    if (!formForHouse) return
    const formForUser = this.formForUser.judgeAndEmitData()
    if (!formForUser) return
    let sendData = {
      requireId,
      ...formForHouse,
      ...formForUser,
    }
    publishBidding(sendData).then(() => {
      this.showToast('发布成功')
      removeStorage('choose_house_type')
      removeStorage('choose_budget')
      removeStorage('choose_timer')
      this.timer = setTimeout(() => {
        Taro.redirectTo({
          url: `/pages/bidding_details/index?requireId=${requireId}`
        })
      }, 1800)
    })
  }
  /**
   * 显示toast
   * @param {String} text 参数描述
   * @return void
   */
  showToast(text) {
    Taro.showToast({
      title: text,
      icon: 'none',
      duration: 2000
    })
  }
  onUserNameChange(userName) {
    this.setState({
      userName
    })
  }
  renderTitle(title) { 
    return (
      <View className='page-title'>{title}</View>
    )
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
    navigationBarTitleText: '发布招标信息',
    navigationStyle: 'custom'
  }
  render() {
    const {
      startTime,
      budget,
      formType,
      requireId,
      houseType,
      bedroom,
      sittingroom,
      cookroom,
      washroom,
      userName
    } = this.state
    return (
      <SafeAreaView
        title='发布装修招标'
        back
      >
        <View className='page-wrapper'>
          <View className='position-tips'>完善装修需求，便于更精准的选择装修公司</View>
          <View className='page-main'>
            {this.renderTitle('房屋信息')}
            <FormForHouse
              type={formType}
              budget={budget}
              bedroom={bedroom}
              cookroom={cookroom}
              washroom={washroom}
              requireId={requireId}
              startTime={startTime}
              houseType={houseType}
              sittingroom={sittingroom}
              ref={node => this.formForHouse = node}
              onUserNameChange={this.onUserNameChange.bind(this)}
            />
            {this.renderTitle('个人信息')}
            <FormForUserInfo
              userName={userName}
              ref={node => this.formForUser = node}
            />
            <View className='fixed-bottom-btm'>
              <View className='btn-public default-btn submit-btn' onClick={this.submit.bind(this)}>提交</View>
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
export default connect(mapStateToProps)(BiddingPublish)