/*
 * @Author: liuYang
 * @description: 封装Input样式
 * @path: @components/input
 * @Date: 2020-06-18 14:44:05
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 15:41:44
 * @mustParam: 必传参数
 *  文档参照 https: //developers.weixin.qq.com/miniprogram/dev/component/input.html
 *  没有封装进去的方法请自行拓展
 *  canInput 是否可以输入
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.scss'

export default class LickInput extends Component { 

  // static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  // }

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }


  render() {
    const {
      placeholder,
      value,
      type,
      password,
      maxlength,
      disabled,
      confirmType,
      canInput
    } = this.props
    const lickInputClassName = classNames('input-style', {
      'placeholder-class': !value
    })
    return (
      <View className='input-wrapper'>
        {
          canInput ? (
            <Input
              type={type}
              value={value}
              disabled={disabled}
              password={password}
              maxlength={maxlength}
              placeholder={placeholder}
              confirmType={confirmType}
              onInput={this.props.onInput}
              className='input-style'
              placeholderClass='placeholder-class'
            ></Input>
            ): (
              <View className={lickInputClassName}>{value || placeholder}</View>
            )
        }
      </View>
    )
  }

}

LickInput.defaultProps = {
  canInput: true,
  placeholder: '',
  value: '',
  type: 'text',
  password: false,
  maxlength: 150,
  disabled: false,
  confirmType: 'done',
  onInput: () => {console.error('onInput is not defined in components/Input')}
}

LickInput.propTypes = {
  onInput: PropTypes.func
}