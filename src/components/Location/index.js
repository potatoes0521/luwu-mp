/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 18:29:25
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 13:44:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, {
  useEffect,
  useDidShow
} from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { getSetting, openSetting } from '@utils/publicWX.js'
import { getStorage, setStorage } from '@utils/storage'
import { getUserLocation, chooseLocation } from './location'
import './index.scss'

function Location(props) { 
  useEffect(() => {
    handleGetStorage()
  })
  
  useDidShow(() => {
    handleGetLocation()
  })
  /**
   * 处理获取缓存
   * @return void
   */
  const handleGetStorage = async () => {
    try {
      const storageData = await getStorage('user_location')
      props.onGetLocationData(storageData)
    } catch (error) { 
      console.error(error)
    }
  }
  /**
   * 获取地理位置
   * @param {Boolean} openChoose 是否选择
   * @return void
   */
  const handleGetLocation = async (openChoose) => { 
    try {
      const locationData = await getUserLocation()
      openChoose && handleLocation(locationData)
    } catch (error) {
      if (error.errMsg === 'getLocation:fail auth deny') {
        handleGetSetting()
      }
    }
   
  }
  /**
   * 打开选择地图
   * @return void
   */
  const handleLocation = async (locationData) => {
    try {
        const chooseLocationData = await chooseLocation(locationData)
        setStorage('user_location', chooseLocationData)
        props.onGetLocationData(chooseLocationData)
    } catch (error) {
      if (error.errMsg === 'getLocation:fail auth deny') {
        console.log('没有授权地理位置')
        handleGetSetting()
      }
    }
  }
  /**
   * 获取授权
   * @return void
   */
  const handleGetSetting = (next) => {
    getSetting('userLocation').then(hasAuth => {
      if (!hasAuth) {
        handleNoAuth()
      } else if (hasAuth && next) {
        handleLocation()
      }
    })
  }
  
  /**
   * 如果没有授权
   * @return void
   */
  const handleNoAuth = () => {
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
  
  const { address } = props
  const addressClassName = classNames('address', {
    'placeholder': !address.address
  })
  return (
    <View
      className='location-wrapper'
      onClick={() => handleGetLocation(true)}
    >
      <View className='location-label'>
        <View className='location-icon iconfont'>1</View>
        <Text className={addressClassName}>{address.address || '选择商户地址'}</Text>
      </View>
      <View className='location-right-icon iconfont'></View>
    </View>
  )
}

Location.defaultProps = {
  address: {},
  onNoAuth: () => {
    console.error('onNoAuth is not defined in @components/Location')
  }
}

Location.propTypes = {
  address: PropTypes.object.isRequired,
  onNoAuth: PropTypes.func.isRequired
} 