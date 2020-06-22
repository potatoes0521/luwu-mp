/*
 * @Author: liuYang
 * @description: 公共导航
 * @path: 引入路径
 * @Date: 2020-06-18 16:25:43
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 12:01:55
 *  title 标题用作导航标题
 * @optionalParam: 选传参数
 *  back 导航是否显示返回
 *  home 导航是否显示home
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import {getSystemInfo} from '@utils/publicWX'

import './index.scss'

class Nav extends Component { 

  componentDidMount() {
    this.getStatusBarHeight()
  }
  
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  getStatusBarHeight() { 
    const { system } = this.props
    if (!system || !system.statusBarHeight){
      getSystemInfo()
    }
  }
  navigatorBack() { 
    Taro.navigateBack()
  }
  switchTab() {
    // Taro.switchTab({
    //   url: '/pages/index/index'
    // })
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }
  render() {
    const {
      system,
      title,
      back,
      home
    } = this.props
    const statusBarHeight = system && system.statusBarHeight || 88
    return (
      <View
        style={{paddingTop:`${statusBarHeight}rpx`}}
        className='nav-wrapper'
      >
        <View className='left'>
          {
            back && <View onClick={this.navigatorBack.bind(this)} className='iconfont iconRectangle nav-icon-back'></View>
          }
          {
            home && <View onClick={this.switchTab.bind(this)} className='iconfont iconhome nav-icon-home'></View>
          }
        </View>
        <View className='nav-title'>
          {
            title
          }
        </View>
      </View>
    )
  }

}

Nav.defaultProps = {
  system: {},
  title: '录屋',
  back: false,
  home: false,
  onClick: () => {console.error('onClick is not defined')}
}

Nav.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool,
  home: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(Nav);