/*
 * @Author: liuYang
 * @description: 选择类别
 * @path: 引入路径
 * @Date: 2020-06-18 18:18:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-01 14:56:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getCategory } from '@services/modules/category'
import SaveAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getStorage } from '@utils/storage'
import ListItem from '@/choose_components/ListItem'

import './index.scss'

class ChooseCategory extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      
    }
    this.pageParams = {}
  }

  componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && Login.login()
  }
  
  /**
   * 处理上一页数据并返回
   * @return void
   */
  handlePrePageData(data) { 
    let pages = Taro.getCurrentPages() //  获取页面栈
    let prevPage = pages[pages.length - 2] // 上一个页面
    if (!prevPage) {
      return
    }
    prevPage.$component.setState(data, () => {
      Taro.navigateBack()
    })
  }

  config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  render() {
    const {
      
    } = this.state
    const {system} = this.props
    const navHeight = system && system.navHeight || 120
    
   
    return (
      <SaveAreaView
        title='选择品类'
        back
        home
      >
        <View
          style={{
            height: `calc(100vh - ${navHeight}rpx)`
          }}
          className='page-wrapper'
        >
          <View className='fixed-nav'>
            <View className='fixed-nav-text'>主品类</View>
            <View className='fixed-nav-text'>子品类</View>
          </View>
          <View className='main-wrapper'>
            <View className='child-list-wrapper'>
              
            </View>
            <View className='child-list-wrapper'>
              
            </View>
          </View>
        </View>
      </SaveAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(ChooseCategory)
