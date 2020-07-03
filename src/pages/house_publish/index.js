/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:27:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 14:53:12
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { publishHouse, editHouse } from '@services/modules/house'
import SafeAreaView from '@components/SafeAreaView'
import FormFroHouse from '@/components_bidding/FormForHouse'
import Login from '@utils/login'
import houseState from '@config/houseState.js'
import { getImage } from '@assets/cdn'
import { removeStorage } from "@utils/storage"

import './index.scss'

class HousePublish extends Component {

  constructor(props) {
    super(props)
    this.state = Object.assign({}, houseState, {
      // 除去公共key以外的字段定在这里
      formType: 'publish',
      requireId: ''
    })
    this.pageParams = {}
    this.timer = null
    this.formForHouse = null
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    if (this.pageParams.pageType === 'edit') {
      this.setState({
        formType: 'edit',
        requireId: this.pageParams.requireId
      })
    }
  }
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  submit() {
    const formForHouse = this.formForHouse.judgeAndEmitData()
    if (!formForHouse) {
      return
    }
    const sendData = Object.assign({}, formForHouse)
    this.handleRequest(sendData)
  }
  handleRequest(sendData) {
    if (this.pageParams.pageType === 'edit') { 
      sendData.requireId = this.state.requireId
      editHouse(sendData).then(() => {
        this.showToast('编辑成功')
      })
    } else {
      publishHouse(sendData).then(() => {
        this.showToast('完善成功')
      })
    }
    removeStorage('choose_house_type')
    removeStorage('choose_budget')
    removeStorage('choose_timer')
    this.timer = setTimeout(() => {
      Taro.navigateBack()
    }, 1800)
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
    navigationBarTitleText: '完善房屋信息',
    navigationStyle: 'custom'
  }
  render() {
    const {
      formType,
      requireId,
      startTime,
      budget,
      houseType,
      bedroom,
      sittingroom,
      cookroom,
      washroom,
    } = this.state
    return (
      <SafeAreaView
        title='完善房屋信息'
        back
      >
        <View className='page-wrapper'>
          <FormFroHouse
            type={formType}
            requireId={requireId}
            startTime={startTime}
            budget={budget}
            houseType={houseType}
            bedroom={bedroom}
            sittingroom={sittingroom}
            cookroom={cookroom}
            washroom={washroom}
            ref={
              (node) => this.formForHouse = node
            }
          />
          <View className='bottom-tips'>添加房屋后，您将获得免费招标和3次免费建材比价的机会</View>
          <View className='fixed-bottom-btm'>
            <View className='btn-public default-btn submit-btn' onClick={this.submit.bind(this)}>提交</View>
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
export default connect(mapStateToProps)(HousePublish)