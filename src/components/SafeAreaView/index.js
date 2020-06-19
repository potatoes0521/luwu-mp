/*
 * @Author: liuYang
 * @description: 安全区域
 * @path: 引入路径
 * @Date: 2020-06-19 09:12:46
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 09:28:16
 * @mustParam: 必传参数
 *  title 标题用作导航标题
 * @optionalParam: 选传参数
 *  nav 是否显示导航 默认true 显示
 *  back 导航是否显示返回 默认false
 *  home 导航是否显示home 默认false
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import Nav from '@components/Nav'

import './index.scss'

class SaveAreaView extends Component {

  render() {
    const {
      system,
      nav,
      title,
      back,
      home
    } = this.props
    const navHeight = system && system.navHeight || 120
    return (
      <View style={{ paddingTop: navHeight + 'rpx' }}>
        {nav && <Nav title={title} back={back} home={home} />}
        {
          this.props.children
        }
      </View>
    )
  }

}

SaveAreaView.defaultProps = {
  title: '录屋',
  nav: true,
  back: false,
  home: false,
  onClick: () => {console.error('onClick is not defined')}
}

SaveAreaView.propTypes = {
  title: PropTypes.string.isRequired,
  nav: PropTypes.bool,
  back: PropTypes.bool,
  home: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(SaveAreaView);
