/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-16 10:48:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 15:40:38
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block, Image } from '@tarojs/components'
import className from 'classnames'
import { getImage } from '@assets/cdn'

import './index.scss'

const emptyData = getImage('bidding/contractreview.png')

export default class ContractReview extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }
  
  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  showSign() {
    this.props.onClickSign('contractreview', '图纸合同审核')
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
    const mainWrapperClassName = className('contractreview-main-wrapper', {
      'empty-wrapper': progress === 0
    })
    return (
      <View className='contractreview-wrapper'>
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

ContractReview.defaultProps = {
  progress: 0,
}
