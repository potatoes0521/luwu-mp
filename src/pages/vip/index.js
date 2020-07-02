/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-02 20:01:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 20:42:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getUserPhone } from '@services/modules/user'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'

import './index.scss'

class Vip extends Component { 

  constructor(props) {
    super(props)
    this.state = {}
    this.timer = null
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  onGetPhoneNumber(e) {
    const { detail } = e
    const sendData = {
      iv: detail.iv,
      encryptedData: detail.encryptedData,
      code: this.code,
    }
    getUserPhone(sendData, this).then(res => {
      this.props.onChangeUserInfo(res)
      this.timer = setTimeout(() => {
        Taro.navigateBack()
      }, 300)
    })
  }
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    const { userInfo } = this.props
    
    const topImage = userInfo.isMember ? getImage('vip/2.png') : getImage('vip/1.png')
    const bottomImage = getImage('vip/3.png')
    return (
      <SafeAreaView
        title='会员'
        back
      >
        <View className='page-wrapper'>
          <View className='top'>
            <Image className='image' src={topImage}></Image>
            {
              !userInfo.isMember && (
                <Button
                  openType='getPhoneNumber'
                  className='get-phone-btn'
                  onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
                ></Button>
              )
            }
          </View>
          <View className='bottom'>
            <Image className='image' src={bottomImage}></Image>
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
export default connect(mapStateToProps)(Vip)