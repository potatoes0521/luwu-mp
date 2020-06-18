/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 09:29:44
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 08:51:51
 * @mustParam: 
 *  item 数据项
 *  tips 数据里的tips项  用于右上角展示
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
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

export default class List extends Taro.Component {
  
  static options = {
    addGlobalClass: true
  }
  
  handleClickImage(item) {
    handleNavigator(item)
    this.props.onClickImage()
  }
  handleWarningIconClick() { 
    this.props.onClickWaringIcon()
  }
  render() {
    let { listData } = this.props
    const listRender = listData.map(item => {
      const tipsRender = item.tips && item.tips.map((ite, idx) => {
        const k = ite
        return (
          <Block key={k}>
            <Text className='tips-text'>{ite.tipText}</Text>
            {
              idx < item.tips.length - 1 && (<Text className='text-line'></Text>)
            }
          </Block>
        )
      })
      const key = item.title
      return (
        <View
          key={key}
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
              item.tips && item.tips.length && (
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
            onClick={this.handleClickImage.bind(this, item)}
          >
            <Image lazyLoad className='image' src={defaultResourceImgURL + item.imgUrl}></Image>
          </View>
        </View>
      )
    })
    return listRender
  }
}

List.defaultProps = {
  listData: [{
    tips: [],
  }],
  onClickImage: () => {
    // console.error('onClickImage is not defined in List.js')
  },
  onClickWaringIcon: () => {
    console.error('onClickWaringIcon is not defined in List.js')
  }
}

List.propTypes = {
  listData: PropTypes.array.isRequired,
  onClickImage: PropTypes.func,
  onClickWaringIcon: PropTypes.func.isRequired
}