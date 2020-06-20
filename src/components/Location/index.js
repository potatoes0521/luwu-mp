/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 18:29:25
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-20 13:00:29
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
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

export default class Location extends Taro.Component {
  constructor(props) {
    super(props)
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
    addGlobalClass: true // 允许外部样式修改组件样式
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
  async handleGetLocation(openChoose) {
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
      address,
      onlyShow
    } = this.props
    const addressClassName = classNames('address', {
      'placeholder': !address.address
    })
    return (
      <View
        className='location-wrapper'
        onClick={() => this.handleGetLocation(true)}
      >
        <View className='location-label skeleton-square' >
          <View className='location-icon iconditu iconfont'></View>
          <Text className={addressClassName}>{address.address || '选择商户地址'}</Text>
        </View>
        {
          !onlyShow && <View className='icon-next iconRectangle rotated iconfont'></View>
        }
        {
          this.props.children
        }
      </View>
    )
  }

}

Location.defaultProps = {
  address: {},
  onlyShow:false,
  onGetLocationData: () => {
    console.log('onNoAuth is not defined in @components/Location')
  }
}

Location.propTypes = {
  address: PropTypes.object.isRequired,
  onGetLocationData: PropTypes.func.isRequired
} 