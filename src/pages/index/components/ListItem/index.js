/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-18 09:38:57
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 22:28:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 09:29:44
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 17:26:14
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
import { handleNavigator} from '@utils/navigator'
import './index.scss'

export default class ListItem extends Component { 
  static options = {
    addGlobalClass: true
  }
  
  handleClickImage() {
    let { item } = this.props
    handleNavigator(item)
    this.props.onClickImage()
  }
  handleWarningIconClick() { 
    this.props.onClickWaringIcon()
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
      <View
        className='item-wrapper skeleton-square'
      >
        <View className='title-wrapper'>
          <View className='title'>
            <Text>{item.title}</Text>
            <Text
              className='iconfont iconshuoming icon-warning'
              onClick={this.handleWarningIconClick.bind(this)}
            ></Text>
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
        <View
          className='item-image'
          onClick={this.handleClickImage.bind(this)}
        >
          <Image mode='aspectFill' lazyLoad className='image' src={defaultResourceImgURL + item.imgUrl}></Image>
        </View>
      </View>
    )
  }

}

ListItem.defaultProps = {
  item: {},
  tips: [],
  onClickImage: () => {
    // console.error('onClickImage is not defined in ListItem.js')
  },
  onClickWaringIcon: () => {
    console.error('onClickWaringIcon is not defined in ListItem.js')
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  tips: PropTypes.array.isRequired,
  onClickImage: PropTypes.func,
  onClickWaringIcon: PropTypes.func.isRequired
}