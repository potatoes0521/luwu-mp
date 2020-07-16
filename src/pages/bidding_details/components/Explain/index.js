/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-16 13:17:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 15:38:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import { getBiddingSign } from '@services/modules/bidding'

import './index.scss'

export default class Explain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signList: []
    }
    this.data = {}
  }

  componentDidMount() {
    this.getBiddingSign()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signType !== this.props.signType) { 
      this.setState({
        signList: this.data[nextProps.signType]
      })
    }
  }

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  getBiddingSign() { 
    getBiddingSign().then(res => {
      this.data = res
    })
  }

  handleClose(e) {
    e.stopPropagation()
    this.props.onClose()
  }

  stop(e) { 
    e.stopPropagation()
  }

  renderFormItem(index, content) { 
    return (
      <View className='form-item'>
        <View className='form-label'>{index}.</View>
        <View className='form-content'>{content}</View>
      </View>
    )
  }
  
  render() {
    const { signList } = this.state
    const {
      visit,
      signType,
      signTitle,
    } = this.props
    const formListRender = signList.map((item, index) => {
      const key = item + index
      return (
        <Block key={key}>
          {this.renderFormItem(index + 1, item)}
        </Block>
      )
    })
    return visit ? (
      <View className='explain-wrapper'>
        <View
          className='explain-bg'
          onTouchMove={this.stop.bind(this)}
          onClick={this.handleClose.bind(this)}
        ></View>
        <View className='explain-main'>
          <View className='explain-plain'>
            <View className={`image ${signType}`}></View>
            <View className='explain-title'>{signTitle}说明</View>
            {formListRender}
          </View>
          <View
            onClick={this.handleClose.bind(this)}
            className='explain-close iconfont iconhuaban'
          ></View>
        </View>
      </View>
    ) : null
  }

}

Explain.defaultProps = {
  signType: '',
  showSign: false,
  signTitle: ''
}