/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-02 11:28:35
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 13:41:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import PropTypes, { number } from 'prop-types'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import Actions from '@store/actions/index.js'
import FormItem from '@components/FormItem'
import FormItemCustomContent from '@components/FormItemCustomContent'
import { getUserPhone } from '@services/modules/user'
import { phoneNumberPatter, realNamePatter } from '@utils/patter'
  
import './index.scss'

class FormForUserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      phone: '',
      getPhoneNumberError: false
    }
    this.code = ''
  }

  componentDidMount() {
    this.handleCode()
  }
  
  componentWillReceiveProps(nextProps) { 
    const { phone } = this.state
    if (nextProps.userInfo.phone && nextProps.userInfo.phone !== phone) {
      this.setState({
        phone: nextProps.userInfo.phone
      })
    }
  }
  async handleCode() { 
    const { userInfo } = this.props
    if (!userInfo.phone) { 
      try { 
        this.code = (await Taro.login()).code
      } catch (err) {
        this.code = userInfo.code
      }
    }
  }
  onInputUserName(e) { 
    const { target: value } = e
    this.setState({
      userName: value
    })
  }
  onInputPhone(e) { 
    const { target: value } = e
    this.setState({
      phone: value
    })
  }
  onGetPhoneNumber(e) {
    const { detail } = e
    if (detail.errMsg.startsWith('getPhoneNumber:fail')) {
      this.setState({
        getPhoneNumberError: true
      })
    } else {
      const sendData = {
        iv: detail.iv,
        encryptedData: detail.encryptedData,
        code: this.code,
      }
      getUserPhone(sendData, this).then(res => {
        this.props.onChangeUserInfo(res)
        this.setState({
          phone: res.phone
        })
      })
    }
  }
  /**
   * 判断并传递数据  主要是父组件调用
   * @return void
   */
  judgeAndEmitData() {
    const { userName, phone } = this.state
    if (!realNamePatter.test(userName)) {
      this.showToast('请输入正确的姓名格式')
      return
    }
    if (!phoneNumberPatter.test(phone)) {
      this.showToast('请输入正确的手机号')
      return false
    }
    const sendData = {
      userName,
      phone
    }
    return sendData
  }
  /**
   * 显示toast
   * @param {String} text 参数描述
   * @return void
   */
  showToast(text) {
    Taro.showToast({
      title: text,
      icon: 'none',
      duration: 2000
    })
  }
  render() {
    const { userName, phone, getPhoneNumberError } = this.state
    const phoneNumberClassName = classNames('get-phone-wrapper', {
      'placeholder-class': !phone
    })
    return (
      <View className='form-wrapper'>
        <FormItem
          unit
          line
          shortUnit
          langLabel
          height100
          important
          type={number}
          label='联 系 人 '
          placeholder='请输入联系人'
          value={userName || ''}
          onInput={this.onInputUserName.bind(this)}
        />
        {
          getPhoneNumberError || phone ? (
            <FormItem
              unit
              line
              shortUnit
              langLabel
              height100
              important
              focus={getPhoneNumberError}
              label='手机号码'
              placeholder='请输入联系人'
              value={phone || ''}
              onInput={this.onInputPhone.bind(this)}
            />
          ) : (
            <FormItemCustomContent
              unit
              height100
              important
              shortUnit
              label='手机号码'
            >
              <View className={phoneNumberClassName}>
                <Text>{phone || '请输入手机号'}</Text>
                <Button
                  openType='getPhoneNumber'
                  className='get-phone-btn'
                  onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
                ></Button>
              </View>
            </FormItemCustomContent>
          )
        }
      </View>
    )
  }

}

FormForUserInfo.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

FormForUserInfo.propTypes = {
  onClick: PropTypes.func.isRequired
}

// 如果需要引入store
const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
const mapDispatchToProps = () => {
  return {
    onChangeUserInfo: userInfo => Actions.changeUserInfo(userInfo)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormForUserInfo);