/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 13:20:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 14:07:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image
} from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.scss'

export default class Company extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      companyList: [{
        companyId: 0,
        companyLogo: ''
      }, {
        companyId: 1,
        companyLogo: ''
      }, {
        companyId: 2,
        companyLogo: ''
      }, {
        companyId: 3,
        companyLogo: ''
      }, {
        companyId: 4,
        companyLogo: ''
      }, {
        companyId: 5,
        companyLogo: ''
      }, {
        companyId: 6,
        companyLogo: ''
      }, {
        companyId: 7,
        companyLogo: ''
      }, {
        companyId: 8,
        companyLogo: ''
      }, {
        companyId: 9,
        companyLogo: ''
      }]
    }
  }
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
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
                    <Image className='item-image' src={item.companyLogo}></Image>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View className='bottom-btn-wrapper'>
          <View className='btn'>
            <View>1343家装企任你选</View>
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