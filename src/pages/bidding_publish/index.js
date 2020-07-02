/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:27:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 09:49:44
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { publishHouse, editHouse } from '@services/modules/house'
import SafeAreaView from '@components/SafeAreaView'
import FormItem from '@components/FormItem'
import FormItemPicker from '@components/FormItemPicker'
import Login from '@utils/login'
import houseState from '@/config/houseState.js'
import { getImage } from '@img/cdn'
import { removeStorage } from "@utils/storage"
import { getDateTime } from '@utils/timer'
import { oneMouthTimer } from '@config/houseType'


import './index.scss'

class BiddingPublish extends Component {

  constructor(props) {
    super(props)
    this.state = Object.assign({}, houseState, {
      // 除去公共key以外的字段定在这里
      remark: ''
    })
    this.pageParams = {}
    this.timer = null
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  

  
  onRemarkInput() { 
    
  }
  
  submit() {
    const {
      area,
      startTime,
      budget,
      address,
      decorateType,
      bedroom,
      sittingroom,
      cookroom,
      washroom,
    } = this.state
    if (decorateType < 0) {
      this.showToast('请选择房屋类型')
      return
    }
    if (!bedroom.chinese) {
      this.showToast('请选择房屋户型')
      return
    }
    if (!area) {
      this.showToast('请填写房屋面积')
      return
    }
    if (!address.address) {
      this.showToast('请选择房屋位置')
      return
    }
    if (!budget.moneyText) {
      this.showToast('请选择预算')
      return
    }
    const { latitude, longitude } = address
    const date = this.handleTimer(startTime)
    const sendData = {
      area,
      address: address.address,
      longitude,
      latitude,
      decorateType,
      bedroom: bedroom.num,
      sittingroom: sittingroom.num,
      cookroom: cookroom.num,
      washroom: washroom.num,
      budgetMin: budget.min,
      budgetMax: budget.max,
      decorateTimeBefore: date.decorateTimeBefore,
      decorateTimeAfter: date.decorateTimeAfter
    }
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
  handleTimer(data) { 
    if (!data.timeMouth || data.timeMouth <= 0) {
      return {
        decorateTimeBefore: '',
        decorateTimeAfter: ''
      }
    }
    const nowDate = +new Date()
    const afterDate = getDateTime(nowDate)
    const beforeDate = getDateTime(nowDate + oneMouthTimer * data.timeMouth)
    return {
      decorateTimeBefore: beforeDate,
      decorateTimeAfter: afterDate
    }
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
      area,
      startTime,
      budget,
      address,
      decorateType,
      remark
    } = this.state
    return (
      <SafeAreaView
        title='发布招标信息'
        back
      >
        <View className='page-wrapper'>
          
          <View className='form-wrapper upload-wrapper'>
            <View className='form-label-title'>上传图片</View>
            
          </View>
          <View className='form-wrapper textarea-wrapper'>
            <View className='form-label-title'>补充信息</View>
            <Textarea
              autoHeight
              value={remark}
              maxlength={300}
              className='textarea'
              placeholderClass='placeholder-class'
              onInput={this.onRemarkInput.bind(this)}
            ></Textarea>
          </View>
          <View className='form-wrapper'>
            <FormItem
              line
              shortUnit
              langLabel
              height100
              important
              unit='icon'
              label='联 系 人 '
              canInput={false}
              placeholder='请选择'
              value={budget.moneyText || ''}
              iconName='iconRectangle rotated'
              onContentClick={this.onChooseBudget.bind(this)}
            />
            <FormItem
              shortUnit
              langLabel
              height100
              important
              unit='icon'
              label='手机号码'
              canInput={false}
              placeholder='请选择'
              value={startTime.timeText || ''}
              iconName='iconRectangle rotated'
              onContentClick={this.onChooseStartTime.bind(this)}
            />
          </View>
          <View className='form-wrapper'>
            <FormItemPicker
              shortUnit
              langLabel
              height100
              important
              unit='icon'
              label='有效期限'
              iconName='iconRectangle rotated'
            />
          </View>
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
export default connect(mapStateToProps)(BiddingPublish)