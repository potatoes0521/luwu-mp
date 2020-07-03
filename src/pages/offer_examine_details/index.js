/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-23 10:55:14
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 11:16:47
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
import { getOfferDetails } from '@services/modules/offer'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import OfferState from '@config/offerExamineState'
import { getImage } from '@assets/cdn'
import { formatTimeToChinese } from '@utils/timer'

import './index.scss'

class OfferExamineDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = Object.assign({}, OfferState, {
      createAt: ''
    })
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
      if (!res || !res.data) return
      console.log('res.createAt', res.createAt)
      const data = Object.assign({}, res.data, {createAt: res.createAt})
      this.setState(data)
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
    navigationBarTitleText: '我的报价审核',
    navigationStyle: 'custom'
  }

  render() {
    const {
      companyName,
      createAt
    } = this.state
    const timeText = formatTimeToChinese(createAt)
    return (
      <SafeAreaView
        title='我的报价审核'
        back
      >
        <View className='page-wrapper'>
          <View className='msg-wrapper'>
            <View className='msg-title-wrapper'>
              <Text>{companyName || '装修公司'}</Text>
              <Text className='time'>{timeText}</Text>
            </View>
          </View>
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