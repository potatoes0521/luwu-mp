/*
 * @Author: liuYang
 * @description: 公共form组件 创建招标 / 创建免费审报价都用了
 * 使用说明
 *  需定义ref来获取子组件数据
 *    this.formForUser = null
 *    this.formForUser.judgeAndEmitData() 返回值如果是false就证明没有用过表单验证 如果正确返回数据
 * @path: '@/components_bidding/FormForUserInfo'
 * @Date: 2020-07-02 11:28:35
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 14:37:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 *  important 必填选项是否展示 这里字段几乎必填 这个只是用来控制
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import Actions from '@store/actions/index.js'
import FormItem from '@components/FormItem'
import FormItemCustomContent from '@components/FormItemCustomContent'
import { getUserPhone } from '@services/modules/user'
import { phoneNumberPatter, realNamePatter } from '@utils/patter'
import RadioGroups from '@components/RadioGroup'
import { RadioOptions } from '@config/biddingState'

import './index.scss'

class FormForUserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      phone: '',
      getPhoneNumberError: false,
      activeIndex: 0
    }
    this.code = ''
  }

  componentDidMount() {
    this.handleCode()
  }
  
  componentWillReceiveProps(nextProps) { 
    const { phone, userName } = this.state
    if (nextProps.userInfo.phone && nextProps.userInfo.phone !== phone) {
      this.setState({
        phone: nextProps.userInfo.phone
      })
    }
    if (nextProps.userName && nextProps.userName !== userName) {
      this.setState({
        userName: nextProps.userName
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
    } else {
      this.setState({
        phone: userInfo.phone
      })
    }
  }
  onInputUserName(e) { 
    const { target: {value} } = e
    this.setState({
      userName: value
    })
  }
  onInputPhone(e) { 
    const { target: {value} } = e
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
      getUserPhone(sendData).then(res => {
        const data = {
          ...res,
          isMember: 1
        }
        this.props.onChangeUserInfo(data)
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
  chooseAudio(item) {
    console.log('item', item)
    this.setState({
      activeIndex: item.id
    })
  }
  render() {
    const {
      userName,
      phone,
      getPhoneNumberError,
      activeIndex
    } = this.state
    const { important } = this.props
    const phoneNumberClassName = classNames('get-phone-wrapper', {
      'placeholder-class': !phone
    })
    return (
      <View className='form-user-info-components'>
        <FormItemCustomContent
          line
          important={important}
          label='您的称呼'
        >
          <View className='input-wrapper'>
            <Input
              maxLength={6}
              value={userName}
              className='input'
              placeholder='请输入'
              onInput={this.onInputUserName.bind(this)}
              placeholderClass='placeholder-class'
            />
            <RadioGroups
              activeIndex={activeIndex}
              optionsList={RadioOptions}
              onChooseAudio={this.chooseAudio.bind(this)}
            />
          </View>
        </FormItemCustomContent>
        {
          getPhoneNumberError || phone ? (
            <FormItem
              langLabel
              label='手机号码'
              type='number'
              value={phone || ''}
              important={important}
              placeholder='请输入手机号'
              focus={getPhoneNumberError}
              onInput={this.onInputPhone.bind(this)}
            />
          ) : (
            <FormItemCustomContent
              label='手机号码'
              important={important}
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
  important: false,
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