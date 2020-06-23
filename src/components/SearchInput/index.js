/*
 * @Author: liuYang
 * @description: 公共搜索框
 * @path: 引入路径
 * @Date: 2020-06-23 15:56:27
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-23 16:48:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import ComponentsInput from '../Input'
import './index.scss'

export default class SearchInput extends Component { 
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  timer = null

  searchInput(e) { 
    const { value } = e.target
    const {data} = this.props
    if (value.length < 1) return
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      let filterDataList = data.filter(item => {
        return (item && item['filterKey'] && item['filterKey'].indexOf(value) !== -1) || (item && item.spell && item.spell.indexOf(value) !== -1)
      })
      this.props.onSearchBrandOver(filterDataList)
    },1000)
  }
  render() {
    return (
      <View className='search-wrapper'>
        <View className='search-input'>
          <View className='iconfont search-icon iconsousuo'></View>
          <View className='input-wrapper'>
            <ComponentsInput
              placeholder='请输入您想要搜索的品牌名称'
              canInput
              onInput={this.searchInput.bind(this)}
            />
          </View>
        </View>
      </View>
    )
  }

}

SearchInput.defaultProps = {
  data: [],
  filterKey: '',
  onSearchBrandOver: () => {
    console.error('onSearchBrandOver is not defined @components/SearchInput')
  }
}

SearchInput.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchBrandOver: PropTypes.func.isRequired
}