/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-15 14:50:44
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 16:53:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { moneyData } from '@config/chooseOneState'

import './index.scss'

export default class ChooseBudget extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      selectItem: {}
    }
  }
  componentWillReceiveProps(nextProps) { 
    this.setState({
      selectItem: nextProps.budget
    })
  }
  cancel() {
    this.props.onCancel()
  }
  /**
   * 处理房屋户型文字展示
   * @return void
   */
  submit() {
    const { selectItem } = this.state
    this.props.onSubmit(selectItem)
  }
  chooseItem(item) { 
    this.setState({
      selectItem: item
    })
  }
  render() {
    const { visit } = this.props
    const { selectItem } = this.state
    const moneyListRender = moneyData.map((item, index) => {
      const key = item.moneyId
      const moneyItemClassName = classNames('money-item', {
        'margin-right': (index + 1) % 3 !== 0,
        'money-item-active': selectItem.moneyId === item.moneyId
      })
      return (
        <View
          key={key}
          className={moneyItemClassName}
          onClick={this.chooseItem.bind(this, item)}
        >{item.moneyText}</View>
      )
    })
    return visit ? (
      <View className='modal-wrapper choose-budget'>
        <View className='modal-bg' onClick={this.cancel.bind(this)}></View>
        <View className='model-main'>
          <View className='title'>装修预算</View>
          <View className='form-wrapper'>
            {
              moneyListRender
            }
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

ChooseBudget.defaultProps = {
  budget: {},
  onClick: () => {console.error('onClick is not defined')}
}

ChooseBudget.propTypes = {
  onClick: PropTypes.func.isRequired
}