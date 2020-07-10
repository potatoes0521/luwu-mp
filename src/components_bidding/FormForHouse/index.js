/*
 * @Author: liuYang
 * @description: 公共form组件  创建房屋/创建招标/创建免费审报价都用了 
 * 使用说明
 *  需定义ref来获取子组件数据
 *    this.formForHouse = null
 *    this.formForHouse.judgeAndEmitData() 返回值如果是false就证明没有用过表单验证 如果正确返回数据
 * @path: '@/components_bidding/FormForHouse'
 * @Date: 2020-07-02 09:41:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 11:58:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 *  important 必填选项是否展示    这里字段几乎必填  这个只是用来控制
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Block } from '@tarojs/components'
import PropTypes from 'prop-types'
import FormItemCustomContent from '@components/FormItemCustomContent'
import Location from '@components/Location'
import houseState from '@config/houseState.js'
import { handleRequestData, oneMouthTimer } from '@config/houseType'
import { setStorage, removeStorage } from "@utils/storage"
import { getDateTime } from '@utils/timer'
import { getHouseDetails } from '@services/modules/house'
import FormItem from '@components/FormItem'
import './index.scss'

export default class FormForHouse extends Component {
  constructor() {
    
    this.state = {
      ...houseState,
      // 除去公共key以外的字段定在这里
    }
    this.firstLoading = false
  }
  componentDidMount() { 
  }
  componentWillReceiveProps(nextProps) { 
    const {
      startTime,
      budget,
      bedroom,
      sittingroom,
      cookroom,
      washroom,
    } = this.state
    if (nextProps.bedroom && nextProps.bedroom.num && nextProps.bedroom.num !== bedroom.num) {
      this.setState({
        bedroom: nextProps.bedroom
      })
    }
    if (nextProps.sittingroom && nextProps.sittingroom.num && nextProps.sittingroom.num !== sittingroom.num) {
      this.setState({
        sittingroom: nextProps.sittingroom
      })
    }
    if (nextProps.cookroom && nextProps.cookroom.num && nextProps.cookroom.num !== cookroom.num) {
      this.setState({
        cookroom: nextProps.cookroom
      })
    }
    if (nextProps.washroom && nextProps.washroom.num && nextProps.washroom.num !== washroom.num) {
      this.setState({
        washroom: nextProps.washroom
      })
    }
    if (nextProps.startTime && nextProps.startTime.timeId !== startTime.timeId) {
      this.setState({
        startTime: nextProps.startTime
      })
    }
    if (nextProps.budget && nextProps.budget.moneyId !== budget.moneyId) {
      this.setState({
        budget: nextProps.budget
      })
    }
    if (!this.firstLoading && nextProps.type === 'edit' && nextProps.requireId) {
      this.getHouseData(nextProps)
    }
  }
  componentWillUnmount() {
    removeStorage('choose_house_type')
    removeStorage('choose_budget')
    removeStorage('choose_timer')
  }
  getHouseData(props) { 
    getHouseDetails({
      requireId: props.requireId
    }).then(res => {
      this.firstLoading = true
      const data = handleRequestData(res)
      this.props.onUserNameChange(res.userName || '')
      this.setState(data)
    })
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

  onChooseBudget() {
    const { budget } = this.state
    let url = '/pages/choose_one_item/index?chooseType=budget'
    if (budget.moneyText) {
      url += '&pageType=edit'
      setStorage('choose_budget', budget)
    }
    Taro.navigateTo({ url })
  }
  chooseAudio(type) {
    this.setState({
      decorateType: type
    })
  }
  getLocationData(address) {
    this.setState({
      address
    })
  }
  /**
   * 判断并传递数据  主要是父组件调用
   * @return void
   */
  judgeAndEmitData() {
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
      return false
    }
    if (!bedroom.chinese && !sittingroom.chinese && !cookroom.chinese && !washroom.chinese) {
      this.showToast('请选择房屋户型')
      return false
    }
    if (!area) {
      this.showToast('请填写房屋面积')
      return false
    }
    if (!address.address) {
      this.showToast('请选择房屋位置')
      return false
    }
    if (!budget.moneyText) {
      this.showToast('请选择预算')
      return false
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
    return sendData
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
   * 处理房屋户型文字展示
   * @return void
   */
  decorateTypeText() {
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

  render() {
    const {
      area,
      startTime,
      budget,
      address,
      decorateType,
    } = this.state
    const decorateTypeText = this.decorateTypeText()
    const { important } = this.props
    
    return (
      <Block>
        <View className='form-wrapper'>
          <FormItemCustomContent
            line
            important={important}
            label='房屋类型'
          >
            <View className='audio-group'>
              <View className='option' onClick={this.chooseAudio.bind(this, 0)}>
                <View className='circular'>
                  {decorateType === 0 && <View className='circular-active'></View>}
                </View>
                <View className='option-title'>毛坯房</View>
              </View>
              <View className='option' onClick={this.chooseAudio.bind(this, 1)}>
                <View className='circular'>
                  {decorateType === 1 && <View className='circular-active'></View>}
                </View>
                <View className='option-title'>旧房翻新</View>
              </View>
            </View>
          </FormItemCustomContent>
          <FormItem
            line
            height100
            important={important}
            shortUnit
            unit='icon'
            label='房屋户型'
            canInput={false}
            placeholder='请选择'
            value={decorateTypeText || ''}
            iconName='iconRectangle rotated'
            onContentClick={this.handleClickHouseType.bind(this)}
          />
          <FormItem
            line
            unitNum
            canInput
            height100
            shortUnit
            important={important}
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
            important={important}
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
            important={important}
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
      </Block>
    )
  }

}

FormForHouse.defaultProps = {
  startTime: {},
  budget: {},
  bedroom: {},
  sittingroom: {},
  cookroom: {},
  washroom: {},
  important: true,
  onUserNameChange: () => {console.log('onUserNameChange is not defined')},
  onClick: () => {console.error('onClick is not defined')}
}

FormForHouse.propTypes = {
  onClick: PropTypes.func.isRequired
}