/*
 * @Author: liuYang
 * @description: 自定义formItem
 * @path: 引入路径
 * @Date: 2020-06-18 15:17:57
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 20:58:54
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 *  没有封装进去的方法请自行拓展
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
import classNames from 'classnames'

import './index.scss'

export default class FormItemCustomContent extends Component {
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
      unit,
      line,
      label,
      iconName,
      height100,
      shortUnit,
      important,
      langLabel,
      unitContent,
    } = this.props
    const itemClassName = classNames('form-item', {
      'bottom-line': line,
      'height100': height100
    })
    const unitText = unitContent ? (unitContent.indexOf('/') !== -1 ? unitContent : '/' + unitContent) : ''
    const lastTipsClassName = classNames('last-tips', {
      'short-tips-wrapper': shortUnit,
      'lang-tips-wrapper': !shortUnit
    })
    const labelClassName = classNames('form-label', {
      'lang-form-label': langLabel
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
            {this.props.children}
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

FormItemCustomContent.defaultProps = {
  shortUnit: false,
  onContentClick: ()=>{
    console.error('onInput is not defined in ./components/FormItem')
  },
}

FormItemCustomContent.propTypes = {
  onContentClick: PropTypes.func
}