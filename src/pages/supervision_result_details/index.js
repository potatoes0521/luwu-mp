/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-17 13:57:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-17 14:19:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import SwitchBtn from '@components/Switch'
  
import './index.scss'

class SupervisionResultDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hideQualified: false
    }
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }
  onSwitchChange(type) { 
    this.setState({
      hideQualified: type
    })
  }
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    const { hideQualified } = this.state
    
    return (
      <SafeAreaView
        title='审核详情'
        back
      >
        <View className='page-wrapper'>
          <View className='title-wrapper'>
            <View className='title-left'>
              <View className='line'></View>
              <Text>北京春秋装饰</Text>
            </View>
            <View className='right-wrapper'>
              <SwitchBtn checked={hideQualified} onSwitchChange={this.onSwitchChange.bind(this)} />
              <View className='text'>隐藏合格项</View>
            </View>
          </View>
          
        </View>
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
  }
}
export default connect(mapStateToProps)(SupervisionResultDetails)