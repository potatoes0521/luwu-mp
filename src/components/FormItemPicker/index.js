/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-28 14:20:27
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-28 14:52:35
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 *  封装了Picker样式 文档参照 https://developers.weixin.qq.com/miniprogram/dev/component/picker.html
 *  没有封装进去的方法请自行拓展
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
import {
  View,
  Text,
  Picker
} from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  getTimeDate,
  timestampOfDay,
} from '@utils/timer'
import './index.scss'

export default class FormItem extends Component { 
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  onPickerValueChange(e) {
    e.stopPropagation();
    const { target: { value } } = e
    const {notPast} = this.props
    let nowTimer = getTimeDate(timestampOfDay())
    let chooseTimer = getTimeDate(value)
    if (nowTimer > chooseTimer && notPast) {
      Taro.showToast({
        title: notPast,
        icon: 'none'
      })
      return
    }
    this.props.onPickerValueChange(value)
  }
  render() {
    const {
      placeholder,
      value,
      mode,
      label,
      important,
      unit,
      unitContent,
      line,
      iconName,
      shortUnit,
      langLabel,
      fields,
      start
    } = this.props
    const itemClassName = classNames('form-item', {
      'bottom-line': line
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
        <Picker
          className='time-picker'
          mode={mode}
          fields={fields}
          start={start}
          onChange={this.onPickerValueChange.bind(this)}
        >
          <View className='form-content'>
            <View className='form-input-wrapper'>
                {
                  value ?
                    <Text>{value}</Text>
                    :
                    <Text className='placeholder-class'>{placeholder}</Text>
                }
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
        </Picker>
      </View>
    )
  }

}

FormItem.defaultProps = {
  shortUnit: false,
  mode: 'date',
  fields: 'day',
  start: '',
  onPickerValueChange: () => {
    console.error('onPickerValueChange is not defined in ./components/FormItemPicker')
  }
}

FormItem.propTypes = {
  onPickerValueChange: PropTypes.func.isRequired
}