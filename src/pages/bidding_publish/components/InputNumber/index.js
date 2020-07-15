/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-15 14:45:53
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 15:41:39
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 *  min   最小值
 *  max   最大值
 *  step  一次点击增加+=几
 *  value 值
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import _toString from 'lodash/toString'
import classNames from 'classnames'

import './index.scss'

// 实现两数相加并保留小数点后最短尾数
function addNum(num1, num2) {
  let sq1, sq2
  try {
    sq1 = _toString(num1).split('.')[1].length
  } catch (e) {
    sq1 = 0
  }
  try {
    sq2 = _toString(num2).split('.')[1].length
  } catch (e) {
    sq2 = 0
  }
  const m = Math.pow(10, Math.max(sq1, sq2))
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m
}

// 格式化数字，处理01变成1,并且不处理1. 这种情况
function parseValue(num) {
  if (num === '') return ''

  const numStr = _toString(num)
  if (numStr.indexOf('0') === 0
    && numStr.indexOf('.') === -1) {
    // 处理01变成1,并且不处理1.
    return _toString(parseFloat(num))
  }
  return _toString(num)
}


class InputNumber extends Component { 

  constructor(props) { 
    super(props)
  }
  /**
   * 处理点击事件
   * @param {String} clickType 点击的类型   minus是减 plus是加
   * @return void
   */
  handleClick(clickType) {
    const { disabled, value, min, max, step } = this.props
    const lowThanMin = (clickType === 'minus' && value <= min)
    const overThanMax = (clickType === 'plus' && value >= max)
    // 判断是否小于最小值和大于最大值
    if (lowThanMin || overThanMax || disabled) {
      const deltaValue = clickType === 'minus' ? -step : step
      const errorValue = addNum(value, deltaValue)
      if (disabled) {
        this.handleError({
          type: 'DISABLED',
          errorValue,
        })
      } else {
        this.handleError({
          type: lowThanMin ? 'LOW' : 'OVER',
          errorValue,
        })
      }
      return
    }
    const deltaValue = clickType === 'minus' ? -step : step
    let newValue = addNum(value, deltaValue)
    newValue = this.handleValue(newValue)
    this.props.onChange(newValue)
  }
  /**
   * 函数功能描述
   * @param {Number} value 数字
   * @return void
   */
  handleValue(value){
    const { max, min } = this.props
    let resultValue = value === '' ? min : value
    // 此处不能使用 Math.max，会是字符串变数字，并丢失 .
    if (resultValue > max) {
      resultValue = max
      this.handleError({
        type: 'OVER',
        errorValue: resultValue,
      })
    }
    if (resultValue < min) {
      resultValue = min
      this.handleError({
        type: 'LOW',
        errorValue: resultValue,
      })
    }
    resultValue = parseValue(resultValue)
    return resultValue
  }
  /**
   * 处理输入输入情况
   * @param {Object} e event对象
   * @param {argument} ...arg 参数描述
   * @return void
   */
  handleInput(e, ...arg){
    const { value } = e.target
    const { disabled } = this.props
    if (disabled) return

    const newValue = this.handleValue(value)
    this.props.onChange(newValue, e, ...arg)
    return newValue
  }
  /**
   * 处理离开焦点
   * @param {Type} ...arg 参数描述
   * @return void
   */
  handleBlur = (...arg) => this.props.onBlur(...arg)

  handleError = errorValue => {
    console.log(errorValue,'错误')
  }

  render() {
    const { value } = this.props

    const inputValue = this.handleValue(value)
    const minusClassName = classNames('input-btn', {
      'input-add': inputValue > 1
    })
    return (
      <View className='input-number-wrapper'>
        <View
          className={minusClassName}
          onClick={this.handleClick.bind(this,('minus'))}
        >-</View>
        <View className='input-number'>{inputValue}</View>
        <View
          className='input-add input-btn'
          onClick={this.handleClick.bind(this, 'plus')}
        >+</View>
      </View>
    )
  }
}

InputNumber.defaultProps = {
  disabled: false,
  value: 1,
  min: "",
  max: 10,
  step: 1,
  onChange: () => { },
  onBlur: () => { },
}

InputNumber.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  disabled: PropTypes.bool,
  min: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onErrorInput: PropTypes.func,
}

export default InputNumber
