/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-18 15:17:57
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-01 11:29:04
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
 *  langLabel 长label 可容纳7个字的
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
  handleContentClick(e) {
    e.stopPropagation();
    if (!this.props.canInput) {
      this.props.onContentClick()
    }
  }
  render() {
    const {
      type,
      unit,
      line,
      focus,
      label,
      value,
      password,
      disabled,
      canInput,
      iconName,
      important,
      shortUnit,
      langLabel,
      height100,
      maxlength,
      confirmType,
      placeholder,
      unitContent,
    } = this.props
    const itemClassName = classNames('form-item', {
      'bottom-line': line,
      'height100': height100
    })
    const lastTipsClassName = classNames('last-tips', {
      'short-tips-wrapper': shortUnit,
      'lang-tips-wrapper': !shortUnit
    })
    const unitText = unitContent && unitContent !== '/' ? unitContent : ''
    const labelClassName = classNames('form-label', {
      'lang-label': langLabel
    })
    return (
      <View className={itemClassName}>
        <View className={labelClassName}>
          <Text>{label}</Text>
          {
            important && <Text className='important'>*</Text>
          }
        </View>
        <View className='form-content' onClick={this.handleContentClick.bind(this)}>
          <View className='form-input-wrapper'>
            <ComponentInput
              type={type}
              focus={focus}
              justify='end'
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
              <View className={lastTipsClassName}>
                {
                  unit === 'icon' && <Text className={`iconfont ${iconName} icon-next`}></Text>
                }
                {
                  unit === 'text' && <Text className='unit-text'>{unitText}</Text>
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
  shortUnit: false,
  onContentClick: ()=>{
    console.error('onInput is not defined in ./components/FormItem')
  },
  onInput: () => {
    console.error('onInput is not defined in ./components/FormItem')
  }
}

FormItem.propTypes = {
  onInput: PropTypes.func.isRequired
}