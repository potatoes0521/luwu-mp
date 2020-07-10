/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 13:20:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 18:50:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getCompanyData } from '@services/modules/index'
import { getImage } from '@assets/cdn'

import './index.scss'

export default class Company extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      companyList: []
    }
  }
  componentDidMount() { 
    this.getCompanyData()
  }
  static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  }
  getCompanyData() { 
    getCompanyData().then(res => {
      this.setState({
        companyList: res
      })
    })
  }
  
  render() {
    const { companyList } = this.state
    return (
      <View className='card-wrapper company'>
        <View className='card-plain'>
          <View className='list-wrapper'>
            {
              companyList.map((item, index) => {
                const key = item.companyId
                const itemClassName = classNames('list-item', {
                  'margin-right': (index + 1) % 4 !== 0,
                })
                return (
                  <View
                    className={itemClassName}
                    key={key}
                  >
                    <Image className='item-image' src={getImage(item.companyLogo)}></Image>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View className='bottom-btn-wrapper'>
          <View className='btn'>
            <View>1343家装修公司任你选</View>
            <Text className='iconlujing iconfont bottom-icon'></Text>
          </View>
        </View>
      </View>
    )
  }

}

Company.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

Company.propTypes = {
  onClick: PropTypes.func.isRequired
}