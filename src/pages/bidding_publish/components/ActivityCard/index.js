/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-15 13:09:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 09:21:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component }  from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { getBiddingActive } from '@services/modules/bidding'

import './index.scss'

export default class ActivityCard extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      activityData: {}
    }
  }
  componentDidMount() { 
    this.getBiddingActive()
  }
  getBiddingActive() { 
    getBiddingActive().then(res => {
      this.setState({
        activityData: res
      })
    })
  }
  renderSpot(className) { 
    return (
      <View className={`btn ${className}`}>
        <View className='spot'></View>
        <View className='line'></View>
        <View className='spot'></View>
      </View>
    )
  }
  renderTriangle(className) { 
    return (
      <View className={`triangle-wrapper ${className}`}>
        <View className='triangle'></View>
        <View className='triangle triangle-second'></View>
      </View>
    )
  }
  renderFormItem(label, money, tips) { 
    return (
      <View className='form-item'>
        <View className='form-title'>
          <View className='spot'></View>
          <View className='title-wrapper'>
            <Text>{label}</Text>
            <Text>{money}</Text>
          </View>
        </View>
        <View className='warning'>{tips}</View>
      </View>
    )
  }
  render() {
    const { activityData } = this.state
    const HideMain = !activityData.offerOnline && !activityData.drawingOnline && !activityData.supervisorOnline
    return HideMain ? null : (
      <View className='activity-card-wrapper'>
        <View className='card-top'>
          发布招标后，将有专业监理为您提供在线咨询服务。除免费咨询外，我们还提供以下付费监理服务，您可根据自身需要进行选择。
        </View>
        <View className='card-plain'>
          {this.renderSpot('left-btn')}
          {this.renderSpot('right-btn')}
          <View className='card-plain-title-wrapper'>
            {this.renderTriangle('')}
            <Text>{activityData.date}发布招标享受以下福利</Text>
            {this.renderTriangle('triangle-right')}
          </View>
          <View className='activity-main'>
            {
              activityData.offerOnline ? this.renderFormItem(activityData.offerOnline, activityData.offerOnlineMoney, activityData.offerOnlineTips) : null
            }
            {
              activityData.drawingOnline ? this.renderFormItem(activityData.drawingOnline, activityData.drawingOnlineMoney, activityData.drawingOnlineTips) : null
            }
            {
              activityData.supervisorOnline ? this.renderFormItem(activityData.supervisorOnline, activityData.supervisorOnlineMoney, activityData.supervisorOnlineTips) : null
            }
          </View>
        </View>
      </View>
    )
  }
}

ActivityCard.defaultProps = {}
