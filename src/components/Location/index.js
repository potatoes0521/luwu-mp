/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 18:29:25
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 13:06:25
 * @mustParam: 必传参数
 *  address 地理位置数据  有经纬度和地址
 * @optionalParam: 选传参数
 *  onlyShow 是否只是展示
 *  label label展示项
 *  style 值是form的话就只做表单展示
 *  placeholder 
 *  line 展示下边框
 *  important 必填项
 * @emitFunction: 函数
 *  onGetLocationData
 */ 
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {
  View,
  Text,
  Block
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { getSetting, openSetting } from '@utils/publicWX.js'
import { getStorage, setStorage } from '@utils/storage'
import { getUserLocation, chooseLocation } from './utils/location'

import './index.module.scss'

export default class Location extends Component {
  constructor() {
    
    this.state={}
  }

  componentDidMount() {
    if (this.props.onlyShow) return
    this.handleGetStorage()
  }
  componentDidShow() { 
    if (this.props.onlyShow) return
    this.handleGetLocation()
  }
  static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  }

  /**
   * 处理获取缓存
   * @return void
   */
  async handleGetStorage() {
    try {
      const storageData = await getStorage('user_location')
      this.props.onGetLocationData(storageData)
    } catch (error) { 
      console.error(error)
    }
  }
  /**
   * 获取地理位置
   * @param {Boolean} openChoose 是否选择
   * @return void
   */
  async handleGetLocation(openChoose, e) {
    e && e.stopPropagation();
    if (this.props.onlyShow) return
    try {
      const locationData = await getUserLocation()
      openChoose && this.handleLocation(locationData)
    } catch (error) {
      if (error.errMsg === 'getLocation:fail auth deny') {
        this.handleGetSetting()
      }
    }
   
  }
  /**
   * 打开选择地图
   * @return void
   */
  async handleLocation(locationData) {
    try {
        const chooseLocationData = await chooseLocation(locationData)
        setStorage('user_location', chooseLocationData)
        this.props.onGetLocationData(chooseLocationData)
    } catch (error) {
      if (error.errMsg === 'getLocation:fail auth deny') {
        console.log('没有授权地理位置')
        this.handleGetSetting()
      }
    }
  }
  /**
   * 获取授权
   * @return void
   */
  handleGetSetting(next) {
    getSetting('userLocation').then(hasAuth => {
      if (!hasAuth) {
        this.handleNoAuth()
      } else if (hasAuth && next) {
        this.handleLocation()
      }
    })
  }
  
  /**
   * 如果没有授权
   * @return void
   */
  handleNoAuth() {
    Taro.showModal({
      title: '提示',
      content: '授权地址信息后才能获取到您所在位置',
      success(res) {
        if (res.confirm) {
          openSetting()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  
  render() {
    const {
      label,
      style,
      line,
      address,
      onlyShow,
      important,
      height100,
      placeholder,
    } = this.props
    const addressClassName = classNames('address', {
      'placeholder': !address.address
    })
    const locationClassName = classNames('location-wrapper-public', {
      'location-form-wrapper': style === 'form',
      'location-wrapper': style !== 'form',
      'border-bottom': line,
      'height100': height100
    })
    return (
      <View
        className={locationClassName}
        onClick={() => this.handleGetLocation(true)}
      >
        {
          style === 'form' ? (
            <Block>
              <View className='location-label skeleton-square'>
                <Text className='label'>
                  {label}
                  {
                    important && <Text className='important'>*</Text>
                  }
                </Text>
              </View>
              <View className='form-content' >
                <Text className={addressClassName}>{address.address || placeholder || '选择商户地址'}</Text>
                {
                  !onlyShow && <View className='icon-next iconRectangle rotated iconfont form-icon-next'></View>
                }
              </View>
            </Block>
          ): (
            <Block>
              <View className='location-label skeleton-square' >
                <View className='location-icon iconditu iconfont'></View>
                <Text className={addressClassName}>{address.address || placeholder || '选择商户地址'}</Text>
              </View>
              {
                !onlyShow && <View className='icon-next iconRectangle rotated iconfont'></View>
              }
              {
                this.props.children
              }
            </Block>
          )
        }
      </View>
    )
  }

}

Location.defaultProps = {
  address: {},
  onlyShow: false,
  label: '',
  style: '',
  placeholder: '',
  line: '',
  important: false,
  onGetLocationData: () => {
    console.log('onNoAuth is not defined in @components/Location')
  }
}

Location.propTypes = {
  address: PropTypes.object.isRequired,
  onlyShow: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.string,
  placeholder: PropTypes.string,
  line: PropTypes.string,
  important: PropTypes.bool,
  onGetLocationData: PropTypes.func.isRequired
} 