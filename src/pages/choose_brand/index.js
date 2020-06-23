/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-23 15:49:04
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-23 16:58:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import SearchInput from '@components/SearchInput'
  
import './index.scss'

class ChooseBrand extends Component { 

  constructor(props) {
    super(props)
    this.state = {}
    this.pageParams = {}
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }

  config = {
    navigationBarTitleText: '选择品牌',
    navigationStyle: 'custom'
  }

  render() {
    const {system} = this.props
    const navHeight = system && system.navHeight || 120
    return (
      <SafeAreaView
        title='选择品牌'
        back
        home
      >
        <View
          style={{
            height: `calc(100vh - ${navHeight}rpx)`
          }}
          className='page-wrapper'
        >
          <View className='choose-brand-search-wrapper'>
            <SearchInput />
          </View>
          <View className='page-main'>
            
          </View>
        </View>
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo,
  }
}
export default connect(mapStateToProps)(ChooseBrand)