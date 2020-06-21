/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-20 18:12:25
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 12:56:15
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Button
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.scss'

export default class BottomBtn extends Component {
  navigationTo() {
    this.props.onRightBtnClick()
  }
  
  render() {
    const { rightBtnText, onlyShowShare } = this.props
    const wrapperClassName = classNames('fixed-bottom-btn-wrapper', {
      'just-center': onlyShowShare
    })
    return (
      <View className={wrapperClassName}>
        <Button openType='share' className='btn-public share-btn'>分享笔记</Button>
        {
          !onlyShowShare && (
            <View className='btn-public plain-btn' onClick={this.navigationTo.bind(this)}>{rightBtnText || ''}</View>
          )
        }
      </View>
    )
  }
}

BottomBtn.defaultProps = {
  onlyShowShare: false,
  rightBtnText: '记笔记',
  onRightBtnClick: () => {console.error('onClick is not defined')}
}

BottomBtn.propTypes = {
  onRightBtnClick: PropTypes.func.isRequired
}