/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-18 09:38:57
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-22 08:52:02
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
  Image
} from '@tarojs/components'
import PropTypes from 'prop-types'
import {defaultResourceImgURL} from '@config/request_config'
import { handleNavigator } from '@utils/navigator'
import classNames from 'classnames'

import './index.scss'

export default class ListItem extends Component { 
  constructor() { 
    this.state = {
      height: '',
      moveOne: null,
    }
    this.animation = Taro.createAnimation({
      duration: 200,
      delay: 0,
      timingFunction: 'linear',
    });
    this.open = false
    this.mainHeight = 0
  }
  componentDidMount() { 
    this.getImageInfo()
  }
  
  componentWillReceiveProps(nextProps) { 
    if (nextProps.showIndex === this.props.showIndex) { 
      return
    } else {
      this.handleCloseAnimation()
    }
  }
  componentDidShow() {
    this.getViewHeight()
  }
  /**
   * 获取item的真实高度
   * @return void
   */
  getViewHeight() { 
    const { index } = this.props
    if (this.mainHeight) return
    Taro.createSelectorQuery()
      .selectAll('.page-wrapper >>> .item-main')
      .boundingClientRect()
      .exec(res => {
        const arr = res[0].map(ite => ite.height * 2).filter((item, idx) => idx === index);
        this.mainHeight = arr[0]
      })
  }
  /**
   * 点击图片
   * @return void
   */
  handleClickImage() {
    if (this.open) {
      this.handleCloseAnimation()
    } else {
      this.handleOpenAnimation()
    }
    const { index } = this.props
    this.props.onClickImage(index)
  }
  
  /**
   * 处理打开动画
   * @return void
   */
  handleOpenAnimation() { 
    this.animation.height(this.mainHeight + 'rpx');
    this.animation.step();
    this.setState({
      moveOne: this.animation.export()
    })
    this.open = true
  }
  /**
   * 处理合起动画
   * @return void
   */
  handleCloseAnimation() { 
    this.animation.height('360rpx');
    this.animation.step();
    this.setState({
      moveOne: this.animation.export()
    })
    this.open = false
  }
  onBtnClick(item, e) { 
    e.stopPropagation();
    handleNavigator(item)
  }
  getImageInfo() {
    const {
      item,
      index,
      listDataLength
    } = this.props
    if(!item.imgUrl) {
      return
    }
    Taro.getImageInfo({
      src: defaultResourceImgURL + item.imgUrl,
      success: (res) => {
        this.setState({
          height: res.height + 'rpx'
        }, () => {
            if (index + 1 === listDataLength) {
              this.props.onImageLoadEnd()
            }
          this.getViewHeight()
        })
      }
    })
  }
  render() {
    const {
      height,
      moveOne
    } = this.state
    let { item, tips } = this.props
    const btnList = tips.map(ite => {
      const key = ite.id
      return (
        <View
          key={key}
          style={{ backgroundColor: item.color }}
          className='btn-item'
          onClick={this.onBtnClick.bind(this, ite)}
        >{ite.text}</View>
      )
    })
    const btnGroupClassName = classNames('btn-group', {
      'just-around': tips.length === 2,
      'just-between': tips.length === 3,
    })
    return (
      <View
        className='item-wrapper skeleton-square'
        animation={moveOne}
      >
        <View className='item-main'>
          <View
            className='item-image'
            onClick={this.handleClickImage.bind(this)}
          >
            <Image
              lazyLoad
              style={{height}}
              // mode='aspectFill'
              className='image'
              src={defaultResourceImgURL + item.imgUrl}
            ></Image>
          </View>
          {
            tips && tips.length && (
              <View className={btnGroupClassName}>
                {
                  btnList
                }
              </View>
            )
          }
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