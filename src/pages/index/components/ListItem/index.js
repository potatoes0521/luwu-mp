/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 09:29:44
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 10:26:53
 * @mustParam: 
 *  item 数据项
 *  tips 数据里的tips项  用于右上角展示
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block,
  Text,
  Image
} from '@tarojs/components'
import PropTypes from 'prop-types'
import {defaultResourceImgURL} from '@config/request_config'

import './index.scss'

export default class ListItem extends Component { 
  static options = {
    addGlobalClass: true
  }
  
  handleClick() { 
    this.props.onClick()
  }

  render() {
    let { item, tips } = this.props
    const tipsRender = tips.map((ite, idx) => {
      const k = ite
      return (
        <Block key={k}>
          <Text className='tips-text'>{ite.tipText}</Text>
          {
            idx < item.tips.length -1 && (<Text className='text-line'></Text>)
          }
        </Block>
      )
    })
    return (
      <View className='item-wrapper' onClick={this.handleClick.bind(this)}>
        <View className='title-wrapper'>
          <View className='title'>
            <Text>{item.title}</Text>
            <Text className='iconfont iconshuoming icon-warning'></Text>
          </View>
          {
            tips && tips.length && (
              <View className='right-tips'>
                {
                  tipsRender
                }
              </View>
            )
          }
        </View>
        <View className='item-image'>
          <Image lazyLoad className='image' src={defaultResourceImgURL + item.imgUrl}></Image>
        </View>
      </View>
    )
  }

}

ListItem.defaultProps = {
  item: {},
  tips: [],
  onClick: () => {console.warn('onClick is not defined in ListItem.js')}
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  tips: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}