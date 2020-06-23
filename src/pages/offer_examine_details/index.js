/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-23 10:55:14
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-23 16:58:15
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block
} from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'

import './index.scss'

class OfferExamineDetails extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
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
  config = {
    navigationBarTitleText: '免费审报价详情',
    navigationStyle: 'custom'
  }

  render() {
    const {
      model,
      area,
      remark,
      name,
      mobile,
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
          {this.renderFrom('类型', model)}
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
          {this.renderFrom('联系人', name)}
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