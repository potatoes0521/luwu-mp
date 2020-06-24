/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-23 10:55:14
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-24 14:54:25
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
import { getOfferDetails } from '@services/modules/offer'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import OfferState from '@config/offerExamine'
import { defaultResourceImgURL } from '@config/request_config'

import './index.scss'

class OfferExamineDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = Object.assign({}, OfferState)
    this.pageParams = {}
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getOfferDetails()
  }
  getOfferDetails() {
    getOfferDetails({
      quotationId: this.pageParams.quotationId
    }).then(res => {
      if(!res || !res.data) return
      this.setState(res.data)
    })
  }
  /**
   * 页面标题
   * @param {String} title 标题
   * @return void
   */
  renderTitle(title) { 
    return <View className='title'>{title || ''}</View>
  }
  /**
   * 页面详情form
   * @param {String} label label
   * @param {String} content 内容
   * @return void
   */
  renderFrom(label, content) {
    return (
      <View className='form-wrapper'>
        <View className='form-label'>{label || '-'}</View>
        <View className='form-content'>{content || '-'}</View>
      </View>
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
      imageUrl: `${defaultResourceImgURL}/share/share_index.png`
    }
  }
  config = {
    navigationBarTitleText: '免费审报价详情',
    navigationStyle: 'custom'
  }

  render() {
    const {
      model,
      area,
      remark,
      mobile,
      userName
    } = this.state
    return (
      <SafeAreaView
        title='免费帮您审报价'
        back
        home
      >
        <View className='page-wrapper'>
          <View className='success-icon-wrapper'>
            <View className='success-icon'></View>
            <View className='success-tips'>
              已收到您的报价单，请等待监理帮您审核~
            </View>
          </View>
          {this.renderTitle('您的房屋信息')}
          {this.renderFrom('类型', model.modelName)}
          {this.renderFrom('面积', area)}
          {
            remark && (
              <Block>
                {this.renderTitle('补充信息')}
                <View className='remark'>{remark || '阿斯加德好了看见后端离开家啊哈立刻说句话拉胯手机号登录卡接收到卡家合适的离开家安徽水利打卡机划水了的空间安徽水利抠脚大汉时空来电几哈老师可'}</View>
              </Block>
            )
          }
          {this.renderTitle('您的个人信息')}
          {this.renderFrom('联系人', userName)}
          {this.renderFrom('手机号码', mobile)}
          <View className='bottom-tips'>
            监理审完报价后会通过手机跟您联系
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
export default connect(mapStateToProps)(OfferExamineDetails)