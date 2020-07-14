/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 10:42:14
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 15:47:12
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 

import Taro, { useEffect, useState }  from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { getFreeEventData } from '@services/modules/index'
import { getImage } from '@assets/cdn'

import './index.scss'

const titleTextImage = getImage(`index/freeEvent/ad.png?${Math.random()}`)

function FreeEvent(props) { 
  const [freeEventData, setFreeEventData] = useState({})
  useEffect(() => {
    getFreeEventData().then(res => {
      setFreeEventData(res)
    })
  }, [])
  const navigator = () => {
    const { offerData } = props
    const pageName = offerData && offerData.quotationId ? 'offer_examine_details' : 'offer_examine_publish'
    const url = `/pages/${pageName}/index?quotationId=${offerData.quotationId || ''}`
    Taro.navigateTo({
      url
    })
  }
  return (
    <View className='free-event-wrapper'>
      <View className='btn-wrapper' onClick={navigator}>
        <Image src={titleTextImage} className='title-image'></Image>
        <View className='bottom-wrapper'>
          <View className=''>{freeEventData.time}</View>
          <View className='remark'>{freeEventData.remark}</View>
        </View>
        <View className='go-btn-wrapper'>
          <View className='after-btn'></View>
          <View className='before-btn'>GO</View>
        </View>
      </View>
    </View>
  )
}

FreeEvent.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}