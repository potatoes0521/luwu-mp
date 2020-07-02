/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-02 11:28:35
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 12:00:01
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import FormItem from '@components/FormItem'
import FormItemCustomContent from '@components/FormItemCustomContent'
import classNames from 'classnames'

import './index.scss'

export default class FormForUserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      mobile: '',
      getPhoneNumberError: false
    }
  }

  componentDidMount() {
  }
  onInputUserName() {}
  onGetPhoneNumber(e) {
    console.log('e', e)
    const { target: value } = e
    this.setState({
      mobile: value
    })
    console.log('value', value)
  }

  render() {
    const { } = this.props
    const { userName, mobile, getPhoneNumberError } = this.state
    const phoneNumberClassName = classNames('get-phone-wrapper', {
      'placeholder-class': !mobile
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
          label='联 系 人 '
          placeholder='请输入联系人'
          value={userName || ''}
          onInput={this.onInputUserName.bind(this)}
        />
        {
          getPhoneNumberError ? (
            <FormItem
              unit
              line
              shortUnit
              langLabel
              height100
              important
              label='联 系 人 '
              placeholder='请输入联系人'
              value={userName || ''}
              onInput={this.onInputUserName.bind(this)}
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
                <Text>{mobile || '请输入手机号'}</Text>
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