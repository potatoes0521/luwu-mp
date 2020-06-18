/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-18 15:17:57
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 15:44:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 *  封装了Input样式 文档参照 https: //developers.weixin.qq.com/miniprogram/dev/component/input.html
 *  没有封装进去的方法请自行拓展
 *  canInput 是否可以输入
 *  unit 是否展示单位 
 *     text是文字 展示由 unitContent 控制
 *     icon是图标 展示 iconName 控制
 *  iconName 图标class
 *  unitContent 单位栏展示什么
 *  label 左边label
 *  line 是否展示下边框
 *  important 是否是必填项
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import ComponentInput from '@components/Input'
import classNames from 'classnames'

import './index.scss'

export default class FormItem extends Component { 
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
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
      canInput,
      label,
      important,
      unit,
      unitContent,
      line,
      iconName
    } = this.props
    const itemClassName = classNames('form-item', {
      'bottom-line': line
    })
    return (
      <View className={itemClassName}>
        <View className='form-label'>
          <Text>{label}</Text>
          {
            important && <Text className='important'>*</Text>
          }
        </View>
        <View className='form-content'>
          <View className='form-input-wrapper'>
            <ComponentInput
              type={type}
              value={value}
              canInput={canInput}
              disabled={disabled}
              password={password}
              maxlength={maxlength}
              placeholder={placeholder}
              confirmType={confirmType}
              onInput={this.props.onInput}
            />
          </View>
          {
            unit && (
              <View className='last-tips'>
                {
                  unit === 'icon' && <Text className={`iconfont ${iconName} icon-next`}></Text>
                }
                {
                  unit === 'text' && <Text className='unit-text'>{unitContent}</Text>
                }
              </View>
            )
          }
        </View>
      </View>
    )
  }

}

FormItem.defaultProps = {
  onInput: () => {
    console.error('onInput is not defined in ./components/FormItem')
  }
}

FormItem.propTypes = {
  onInput: PropTypes.func.isRequired
}