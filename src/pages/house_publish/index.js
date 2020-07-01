/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:27:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-01 16:14:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { publishOffer } from '@services/modules/offer'
import SafeAreaView from '@components/SafeAreaView'
import FormItem from '@components/FormItem'
import FormItemCustomContent from '@components/FormItemCustomContent'
import Location from '@components/Location'
import Login from '@utils/login'
import houseState from '@/config/houseState.js'
import { getImage } from '@img/cdn'
import { setStorage, removeStorage } from "@utils/storage"

import './index.scss'

const oneMouthTimer = 2592000000

class HousePublish extends Component {

  constructor(props) {
    super(props)
    this.state = Object.assign({}, houseState, {
      // 除去公共key以外的字段定在这里
    })
    this.timer = null
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    clearTimeout(this.timer)
    this.timer = null
  }
  componentWillUnmount() { 
    removeStorage('choose_house_type')
    removeStorage('choose_budget')
    removeStorage('choose_timer')
  }
  /**
   * 点了房屋户型
   * @return void
   */
  handleClickHouseType() { 
    const {
      bedroom,
      sittingroom,
      cookroom,
      washroom,
    } = this.state
    let url = '/pages/choose_house_type/index'
    if (bedroom.chinese || sittingroom.chinese || cookroom.chinese || washroom.chinese) {
      url += '?pageType=edit'
      setStorage('choose_house_type', {
        bedroom,
        sittingroom,
        cookroom,
        washroom,
      })
    }
    Taro.navigateTo({ url })
  }
  onAreaInput(e) {
    const { target: { value } } = e
    this.setState({
      area: value
    })
  }
  onChooseStartTime() {
    const { startTime } = this.state
    let url = '/pages/choose_one_item/index?chooseType=time'
    if (startTime.moneyText) {
      url += '&pageType=edit'
      setStorage('choose_timer', startTime)
    }
    Taro.navigateTo({ url })
  }

  chooseAudio(type) { 
    this.setState({
      houseType: type
    })
  }
  getLocationData(address) { 
    this.setState({
      address
    })
  }
  onChooseBudget() {
    const { budget } = this.state
    let url = '/pages/choose_one_item/index?chooseType=budget'
    if (budget.moneyText) {
      url += '&pageType=edit'
      setStorage('choose_budget', budget)
    }
    Taro.navigateTo({ url })
  }
  /**
   * 处理房屋户型文字展示
   * @return void
   */
  houseTypeText() { 
    const {
      bedroom,
      sittingroom,
      cookroom,
      washroom,
    } = this.state
    if (!bedroom.chinese && !sittingroom.chinese && !cookroom.chinese && !washroom.chinese) {
      return ''
    }
    return (bedroom.chinese || '-') + '室' + (sittingroom.chinese || '-') + '厅' + (cookroom.chinese || '-') + '厨' + (washroom.chinese || '-') + '卫'
  }
  submit() {
    const {
      area,
      startTime,
      budget,
      address,
      houseType,
      bedroom,
      sittingroom,
      cookroom,
      washroom,
    } = this.state
    if (houseType < 0) {
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
    const sendData = {
      data: {
        area,
        startTime,
        budget,
        address,
        houseType,
        bedroom,
        sittingroom,
        cookroom,
        washroom,
      }
    }
    publishOffer(sendData, this).then(res => {
      if (!res || !res.quotationId) {
        return
      }
      this.showToast('发布成功')
      this.timer = setTimeout(() => {
        Taro.navigateBack()
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
      area,
      startTime,
      budget,
      address,
      houseType
    } = this.state
    const houseTypeText = this.houseTypeText()
    return (
      <SafeAreaView
        title='完善房屋信息'
        back
      >
        <View className='page-wrapper'>
          <View className='form-wrapper'>
            <FormItemCustomContent
              line
              important
              label='房屋类型'
            >
              <View className='audio-group'>
                <View className='option' onClick={this.chooseAudio.bind(this, 0)}>
                  <View className='circular'>
                    {houseType === 0 && <View className='circular-active'></View>}
                  </View>
                  <View className='option-title'>毛坯房</View>
                </View>
                <View className='option' onClick={this.chooseAudio.bind(this, 1)}>
                  <View className='circular'>
                    {houseType === 1 && <View className='circular-active'></View>}
                  </View>
                  <View className='option-title'>旧房翻新</View>
                </View>
              </View>
            </FormItemCustomContent>
            <FormItem
              line
              height100
              important
              shortUnit
              unit='icon'
              label='房屋户型'
              canInput={false}
              placeholder='请选择'
              value={houseTypeText || ''}
              iconName='iconRectangle rotated'
              onContentClick={this.handleClickHouseType.bind(this)}
            />
            <FormItem
              line
              unitNum
              canInput
              height100
              shortUnit
              important
              unit='text'
              type='digit'
              value={area}
              label='房屋面积'
              unitContent='㎡'
              placeholder='请输入房屋面积'
              onInput={this.onAreaInput.bind(this)}
            />
            <Location
              height100
              important
              style='form'
              label='房屋位置'
              placeholder='请选择'
              address={address || {}}
              onGetLocationData={this.getLocationData.bind(this)}
            />
          </View>
          <View className='form-wrapper'>
            <FormItem
              line
              shortUnit
              langLabel
              height100
              important
              unit='icon'
              label='装修预算'
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
              unit='icon'
              label='装修时间'
              canInput={false}
              placeholder='请选择'
              value={startTime.timeText || ''}
              iconName='iconRectangle rotated'
              onContentClick={this.onChooseStartTime.bind(this)}
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
export default connect(mapStateToProps)(HousePublish)