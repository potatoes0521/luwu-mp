/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-06 14:47:02
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 13:07:58
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 

import React, { Component } from 'react'
import { View, Input } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.module.scss'

export default class SwitchBtn extends Component {
  handleClick() { 
    const { checked } = this.props
    this.props.onSwitchChange(!checked)
  }
  render() {
    const { checked } = this.props
    const wrapperClassName = classNames('i-switch', {
      'i-switch-checked': checked
    })
    return (
      <View onClick={this.handleClick.bind(this)} className={wrapperClassName}>
        <Input className='i-switch-hide-input' value={checked} />
        <View className='i-switch-inner'></View>
      </View >
    )
  }

}

SwitchBtn.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

SwitchBtn.propTypes = {
  onClick: PropTypes.func.isRequired
}