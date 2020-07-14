/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-14 14:52:08
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 15:42:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { useEffect, useState }  from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { getNewsData } from '@services/modules/index'
import { getImage } from '@assets/cdn'

import './index.scss'
  
function News() { 
  const [newsData, setNewsData] = useState({})
  const titleImage = getImage(`index/news/ad_title.png`)

  useEffect(() => { 
    getNewsData({}).then(res => {
      setNewsData(res)
    })
  }, [])
  
  return (
    <View className='news-wrapper'>
      <View className='news-left-title'>
        <Image className='news-title-image' src={titleImage} />
      </View>
      <View className='news-right'>
        <View className='news-title'>{newsData.title}</View>
        <View className='news-content'>{newsData.content}</View>
      </View>
    </View>
  )
}

News.defaultProps = {}
