/*
 * @Author: liuYang
 * @description: 公共搜索框
 * @path: 引入路径
 * @Date: 2020-06-23 15:56:27
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 13:07:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import ComponentsInput from '../Input'
import './index.module.scss'

export default class SearchInput extends Component { 
  constructor() { 
    this.state = {
      value: ''
    }
  }
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  }
  timer = null
  /**
   * 开始搜索
   * @param {Object} e event对象
   * @return void
   */
  searchInput(e) {
    const { target: { value } } = e
    const { data, filterKey } = this.props
    this.setState({value})
    if (value.length < 1) return
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      let filterDataList = data.filter(item => {
        return (item && item[filterKey] && item[filterKey].indexOf(value) !== -1) || (item && item.spell && item.spell.indexOf(value) !== -1)
      })
      this.props.onSearchBrandOver(filterDataList)
    }, 1000)
  }
  handleClear() { 
    clearTimeout(this.timer)
    this.setState({
      value: ''
    }, () => {
        this.props.onClearInput()
    })
  }
  render() {
    const { value } = this.state
    
    return (
      <View className='search-wrapper'>
        <View className='search-input'>
          <View className='iconfont search-input-icon iconsousuo'></View>
          <View className='input-wrapper'>
            <ComponentsInput
              value={value}
              placeholder='请输入您想要搜索的品牌名称'
              canInput
              onInput={this.searchInput.bind(this)}
            />
          </View>
          {
            value && value.length && <View onClick={this.handleClear.bind(this)} className='iconfont search-input-close-icon iconhuaban'></View>
          }
        </View>
      </View>
    )
  }

}

SearchInput.defaultProps = {
  data: [],
  filterKey: '',
  onClearInput: () => {
    console.error('onClearInput is not defined @components/SearchInput')
  },
  onSearchBrandOver: () => {
    console.error('onSearchBrandOver is not defined @components/SearchInput')
  }
}

SearchInput.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchBrandOver: PropTypes.func.isRequired
}