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
    console.log('system', system)
    if (!system || !system.statusBarHeight){
      getSystemInfo()
    }
  }

  render() {
    const {
      system,
      title,
      back
    } = this.props
    const statusBarHeight = system && system.statusBarHeight || 88
    return (
      <View
        style={{paddingTop:`${statusBarHeight}rpx`}}
        className='nav-wrapper'
      >
        <View className='left'>
          {
            back && <View className='iconfont iconRectangle nav-icon-back'></View>
          }
          <View className='iconfont iconhome nav-icon-home'></View>
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
  back: true,
  onClick: () => {console.error('onClick is not defined')}
}

Nav.propTypes = {
  onClick: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(Nav);