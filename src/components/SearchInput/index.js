/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-23 15:56:27
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-23 16:24:09
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.scss'

export default class SearchInput extends Component { 
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  
  timer = null

  searchInput(e) { 
    const { value } = e.target
    const {data} = this.props
    if (value.length < 1) return
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      let filterDataList = data.filter(item => {
        
      })
      this.props.onSearchBrandOver(filterDataList)
    },1000)
  }
  render() {
    return (
      <View className='search-wrapper'>
        
      </View>
    )
  }

}

SearchInput.defaultProps = {
  data: [],
  onSearchBrandOver: () => {
    console.error('onSearchBrandOver is not defined @components/SearchInput')
  }
}

SearchInput.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchBrandOver: PropTypes.func.isRequired
}