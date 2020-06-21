/*
 * @Author: liuYang
 * @description: 上传图片  展示图片组组件
 * @path: 引入路径
 * @Date: 2020-06-17 17:35:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 11:06:52
 * @mustParam: 必传参数
 *  imageList 要展示的图片
 * @optionalParam: 选传参数
 *  addBtnSize 添加图片大小
 *  imageSize 图片大小
 *  showAddBtn 是否展示上传图片
 * @emitFunction: 函数
 *  onUploadOK 图片上传完毕
 */ 
import Taro, {Component} from '@tarojs/taro'
import {
  View,
  Text,
  Image,
  ScrollView
} from '@tarojs/components'
import PropTypes from 'prop-types'
import { uploadImage } from './upload_request'

import './index.scss'

export default class Upload extends Component { 

  componentDidMount() {
    if (this.props.autoChoose) { 
      // this.chooseImage()
    }
  }

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  /**
   * 选择image 上传
   * @return void
   */
  chooseImage(e) {
    e && e.stopPropagation();
    const { maxCount, imageList } = this.props
    let count = 9
    if (maxCount !== -1) {
      count = maxCount - imageList.length
    }
    if (count === 0) {return}
    uploadImage({
        count
      }).then(res => {
      this.props.onUploadOK(res)
    })
  }
  /**
   * 展示图片
   * @param {String} item 要展示的图片
   * @return void
   */
  showImage(item, e) {
    e && e.stopPropagation();
    console.log('item', item)
    Taro.previewImage({
      current: item,
      urls: this.props.imageList
    })
  }
  render() {
    const {
      imageList,
      addBtnSize,
      imageSize,
      marginRightSize,
      showAddBtn,
      computedWidth,
      maxCount
    } = this.props
    // 添加图片按钮
    const imageWidth = imageSize + 'rpx'
    const addBtnWidth = addBtnSize + 'rpx'
    const imageMarginRightSize = marginRightSize + 'rpx'
    const imageListRender = imageList.map((item) => (
      <View
        style={{
          width: imageWidth,
          height: imageWidth,
          lineHeight: imageWidth,
          marginRight: imageMarginRightSize
        }}
        className='picture-item skeleton-square'
        key={item}
      >
        <Image 
          mode='aspectFill'
          className='image' 
          src={item}
          onClick={this.showImage.bind(this, item)}
        ></Image>
      </View>
    ))
    return (
    <ScrollView
      scrollX
      style={{
          width: `calc(100vw - ${computedWidth}rpx)`,
          height: imageWidth
        }}
      className='scroll-view'
    >
      {
        imageListRender
      }
      {
        showAddBtn && (maxCount === -1 || imageList < maxCount) && (
          <View
            style={{
              width: addBtnWidth,
              height: addBtnWidth,
              lineHeight: addBtnWidth,
            }}
            className='add-btn-public'
            onClick={this.chooseImage.bind(this)}
          >
            <Text className='iconfont iconbianzu icon-upload-img'></Text>
          </View>
        )
      }
      { imageList && imageList.length < 1 && (
          <View
            style={{
              width: imageWidth,
              height: imageWidth,
              lineHeight: imageWidth,
            }}
            className='picture-item'
          ></View>)
        }
    </ScrollView>
  )
  }

}

Upload.defaultProps = {
  maxCount: -1,
  imageList: [],
  autoChoose: false,
  addBtnSize: 86,
  imageSize: 180,
  showAddBtn: false,
  marginRightSize: 20,
  scrollViewWidth: 0,
  onUploadOK: () => {
    console.error('onUploadOK is not defined in @components/Upload')
  }
}

Upload.propTypes = {
  imageList: PropTypes.array.isRequired,
  showAddBtn: PropTypes.bool,
  addBtnSize: PropTypes.number,
  marginRightSize: PropTypes.number,
  imageSize: PropTypes.number.isRequired,
  onUploadOK: PropTypes.func.isRequired
}