/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-02 20:01:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 15:37:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'
import { connect } from 'react-redux'
import { getUserPhone } from '@services/modules/user'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'
import Actions from '@store/actions/index.js'
import './index.scss'

class Vip extends Component { 

  constructor(props) {
    super(props)
    this.state = {}
    this.timer = null
    this.pageParams = {}
    this.code = ''
  }

  async componentDidMount() {
    this.pageParams = getCurrentInstance().router.params
    const { userInfo } = this.props
    !userInfo.token && await Login.login()
    this.handleCode()
  }
  
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  async handleCode() {
    const { userInfo } = this.props
    try {
      this.code = (await Taro.login()).code
    } catch (err) {
      this.code = userInfo.code
    }
  }
  onGetPhoneNumber(e) {
    const { detail } = e
    if (!detail.iv || !detail.encryptedData) return
    const sendData = {
      iv: detail.iv,
      encryptedData: detail.encryptedData,
      code: this.code,
    }
    getUserPhone(sendData, this).then(res => {
      const data = Object.assign({}, res, {
        isMember: 1
      })
      this.props.onChangeUserInfo(data)
      let paramsStr = ''
      for (const key in this.pageParams) {
        paramsStr += `${key}=${this.pageParams[key]}&`
      }
      if (this.pageParams.nextPage) {
        Taro.redirectTo({
          url: `/pages/${this.pageParams.nextPage}/index?${paramsStr}`
        })
      } else {
        Taro.navigateBack()
      }
    })
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
  }
}

const mapDispatchToProps = () => {
  return {
    onChangeUserInfo: userInfo => Actions.changeUserInfo(userInfo)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Vip);