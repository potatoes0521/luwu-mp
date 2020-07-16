/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-16 10:48:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 15:24:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block, Image } from '@tarojs/components'
import className from 'classnames'

import './index.scss'

const emptyData = ''

export default class Contract extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }
  
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  showSign() {
    this.props.onClickSign('contract', '图纸合同审核')
  }

  renderFormItem(label, content, icon = true) { 
    return (
      <Block>
        <View className='form-label'>{label}</View>
        <View className='form-content'>
          <Text>{content}</Text>
          {
            icon && <View className='icon-next iconfont iconRectangle rotated'></View>
          }
        </View>
      </Block>
    )
  }

  render() {
    const { progress } = this.props
    const mainWrapperClassName = className('contract-main-wrapper', {
      'empty-wrapper': progress === 0
    })
    return (
      <View className='contract-wrapper'>
        <View className='title-wrapper'>
          <Text className='title-text'>图纸合同审核</Text>
          <Text className='link-text' onClick={this.showSign.bind(this)}>说明</Text>
        </View>
        <View className={mainWrapperClassName}>
          {
            progress ? (
              <Block>
                <View className='form-item'>
                  {this.renderFormItem('上传文件', '')}
                </View>
              </Block>
            ): (
              <Block>
                <Image className='empty-image' src={emptyData} />
                <Text className='empty-text'>线上提交施工图纸合同，招标监理在线审核</Text>
              </Block>
            )
          }
        </View>
      </View>
    )
  }

}

Contract.defaultProps = {
  progress: 0,
}
