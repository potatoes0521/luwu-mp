/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-15 14:50:44
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 16:07:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import classNames from 'classnames'
import PropTypes from 'prop-types'
import InputNumber from '../InputNumber'
import './index.scss'

export default class ChooseHouseType extends Component { 

  // static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  // }

  constructor(props) {
    super(props)
    this.state={}
  }
  /**
   * 处理房屋户型文字展示
   * @return void
   */
  submit() {
    const {
      bedroom,
      sittingroom,
      cookroom,
      washroom
    } = this.props
    if (!bedroom.chinese && !sittingroom.chinese && !cookroom.chinese && !washroom.chinese) return
    const text = (bedroom.chinese || '-') + '室' + (sittingroom.chinese || '-') + '厅' + (cookroom.chinese || '-') + '厨' + (washroom.chinese || '-') + '卫'
    this.props.onSubmit(text)
  }

  render() {
    const { 
      visit,
      bedroom,
      cookroom,
      washroom,
      sittingroom,
    } = this.props
    return visit ? (
      <View className='modal-wrapper'>
        <View className='modal-bg'></View>
        <View className='model-main'>
          <View className='title'>选择户型</View>
          <View className='form-wrapper'>
            <View className='form-item'>
              <View className='form-label'>卧室</View>
              <View className='form-content'>
                <InputNumber
                  value={bedroom.num || 0}
                  onChange={this.props.onBedRoomChange}
                />
              </View>
            </View>
            <View className='form-item'>
              <View className='form-label'>客厅</View>
              <View className='form-content'>
                <InputNumber
                  value={sittingroom.num || 0}
                  onChange={this.props.onSittingRoomChange}
                />
              </View>
            </View>
            <View className='form-item'>
              <View className='form-label'>厨房</View>
              <View className='form-content'>
                <InputNumber
                  value={cookroom.num || 0}
                  onChange={this.props.onCookRoomChange}
                />
              </View>
            </View>
            <View className='form-item'>
              <View className='form-label'>卫生间</View>
              <View className='form-content'>
                <InputNumber
                  value={washroom.num || 0}
                  onChange={this.props.onWashRoomChange}
                />
              </View>
            </View>
          </View>
          <View className='bottom-wrapper'>
            <View className='btn-public reset'>重置</View>
            <View className='line'></View>
            <View className='btn-public submit' onClick={this.submit.bind(this)}>完成</View>
          </View>
        </View>
      </View>
    ) : null
  }

}

ChooseHouseType.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

ChooseHouseType.propTypes = {
  onClick: PropTypes.func.isRequired
}