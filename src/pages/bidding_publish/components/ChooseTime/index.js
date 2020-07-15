/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-15 14:50:44
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 18:06:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, PickerView, PickerViewColumn } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class ChooseTime extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      initYearArray: [],
      initYearIndex: -1,
      initMouthArray: [],
      initMouthIndex: -1
    }
    this.selectTime = {}
  }
  componentDidMount() { 
    this.initYearType()
  }
  componentWillReceiveProps(nextProps) { 
    if (!nextProps.startTime || nextProps.startTime === this.props.startTime) return
    const startTimeArray = nextProps.startTime.split('-')
    this.handleInitMouth(+startTimeArray[1])
    this.handleInitYear(+startTimeArray[0])
  }
  initYearType() {
    const date = (new Date()).getFullYear()
    let yearArr = [];
    let mouthArr = []
    for (let i = date; i < date + 20; i++) {
      yearArr.push(i)
    }
    for (let i = 1; i < 13; i++) {
      mouthArr.push(i)
    }
    this.setState({
      initYearArray: yearArr,
      initMouthArray: mouthArr,
    }, () => {
        this.handleInitMouth((new Date()).getMonth() + 1)
        this.handleInitYear(date)
    })
  }
  /**
   * 处理默认月份
   * @param {Type} startTime 参数描述
   * @return void
   */
  handleInitMouth(startTime) {
    if (!startTime) return
    const { initMouthArray } = this.state
    const index = initMouthArray.findIndex(item => item === startTime)
    this.setState({
      initMouthIndex: [index]
    })
    this.selectTime.mouth = startTime
  }
  /**
   * 处理默认份年
   * @param {Type} startTime 参数描述
   * @return void
   */
  handleInitYear(startTime) {
    if (!startTime) return
    const { initYearArray } = this.state
    const index = initYearArray.findIndex(item => item === startTime)
    this.setState({
      initYearIndex: [index]
    })
    this.selectTime.year = startTime
  }
  selectYearTime(e) { 
    const { target: { value } } = e
    this.selectTime.year = value
  }
  selectMouthTime(e) { 
    const { target: { value } } = e
    this.selectTime.mouth = value
  }
  cancel() {
    this.props.onCancel()
  }
  /**
   * 处理房屋户型文字展示
   * @return void
   */
  submit() {
    this.props.onSubmit(this.selectTime)
  }
  render() {
    const { visit } = this.props
    const {
      initYearArray,
      initYearIndex,
      initMouthArray,
      initMouthIndex
    } = this.state
    const yearList = initYearArray.map(item => {
      return (
        <View key={item} className='pick-item'>{item}</View>
      )
    })
    const mouthList = initMouthArray.map(item => {
      return (
        <View key={item} className='pick-item'>{item}</View>
      )
    })
    return visit ? (
      <View className='modal-wrapper choose-time'>
        <View className='modal-bg' onClick={this.cancel.bind(this)}></View>
        <View className='model-main'>
          <View className='title'>装修时间</View>
          <View className='form-wrapper'>
            <PickerView
              className='pick-view'
              value={initYearIndex}
              indicator-style='height: 40rpx;'
              onChange={this.selectYearTime.bind(this)}
            >
              <PickerViewColumn>
                {
                  yearList
                }
              </PickerViewColumn>
            </PickerView>
            <View className='time-view'>年</View>
            <PickerView
              className='pick-view'
              value={initMouthIndex}
              indicator-style='height: 40rpx;'
              onChange={this.selectMouthTime.bind(this)}
            >
              <PickerViewColumn>
                {
                  mouthList
                }
              </PickerViewColumn>
            </PickerView>
            <View className='time-view'>月</View>
          </View>
          <View className='bottom-wrapper'>
            <View className='btn-public reset' onClick={this.cancel.bind(this)}>取消</View>
            <View className='line'></View>
            <View className='btn-public submit' onClick={this.submit.bind(this)}>完成</View>
          </View>
        </View>
      </View>
    ) : null
  }

}

ChooseTime.defaultProps = {
  budget: {},
  startTime: '',
  onClick: () => {console.error('onClick is not defined')}
}

ChooseTime.propTypes = {
  onClick: PropTypes.func.isRequired
}