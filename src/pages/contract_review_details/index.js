/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-17 11:50:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-17 12:00:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import Supervisor from './components/Supervisor'
  
import './index.scss'

export default class ContractReviewDetails extends Component {

  constructor(props) {
    super(props)
    this.state={}
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }

  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    return (
      <SafeAreaView
        title='上传文件'
        back
      >
        <View className='page-wrapper'>
          <View className='success-wrapper'>
            <View className='success-icon'></View>
            <View className='tips'>提交成功，审核监理会尽快和您联系</View>
          </View>
          <Supervisor />
        </View>
      </SafeAreaView>
    )
  }

}
