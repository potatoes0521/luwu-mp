/*
 * @Author: liuYang
 * @description: 上传图片  展示图片组组件
 * @path: 引入路径
 * @Date: 2020-06-17 17:35:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 14:19:48
 * @mustParam: 必传参数
 *  imageList 要展示的图片
 * @optionalParam: 选传参数
 *  addBtnSizeType 添加图片大小
 *  imageSizeType 图片大小
 *  alignType 垂直对齐方式
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
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { uploadImage } from './upload_request'

import './index.scss'

export default class Upload extends Component { 

  constructor(props) {
    super(props)
  }


  componentDidMount() {
    if (this.props.autoChoose) { 
      this.chooseImage()
    }
  }

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  /**
   * 选择image 上传
   * @return void
   */
  chooseImage() {
    uploadImage({}).then(res => {
      this.props.onUploadOK(res)
    })
  }
  /**
   * 展示图片
   * @param {String} item 要展示的图片
   * @return void
   */
  showImage(item) {
    Taro.previewImage({
      current: item,
      urls: this.props.imageList
    })
  }
  render() {
    const {
      imageList,
      addBtnSizeType,
      imageSizeType,
      alignType,
      showAddBtn,
      scrollViewWidth
    } = this.props
    // 图片展示列表
    const imageListRender = imageList.map((item) => {
      const imageItemClassName = classNames('picture-item', {
        'big-picture-item': imageSizeType === 'big' || !imageSizeType,
        'small-picture-item': imageSizeType === 'small'
      })
      return (
        <View
          className={imageItemClassName}
          key={item}
        >
          {/* <Text
            onClick={() => deleteImage('car', index)}
            className='delete-btn iconfont iconguanbi2'
          ></Text> */}
          <Image 
            mode='aspectFill'
            className='image' 
            src={item}
            onClick={() => this.showImage(item)}
          ></Image>
        </View>
      )
    })
    // 添加图片按钮
    const addBtnClassName = classNames('add-btn-public', {
      'small-btn': addBtnSizeType === 'small' || !addBtnSizeType,
      'big-btn': addBtnSizeType === 'big'
    })
    // 列表垂直方式
    const listClassName = classNames('picture-list', {
      'align-center': alignType === 'center' || !alignType,
      'flex-end': alignType === 'flex-end'
    })
    return (
    <ScrollView
      scrollX
      style={{width: `calc(100vw - ${scrollViewWidth}rpx)`}}
      className='scroll-view'
    >
      <View className={listClassName}>
        {
          imageListRender
        }
        {
          showAddBtn && (
            <View
              className={addBtnClassName}
              onClick={this.chooseImage.bind(this)}
            >
              <Text className='iconfont icontuxiang icon-upload-img'></Text>
            </View>
          )
        }
      </View>
    </ScrollView>
  )
  }

}

Upload.defaultProps = {
  imageList: [],
  autoChoose: false,
  addBtnSizeType: 'small',
  imageSizeType: 'small',
  alignType: 'center',
  showAddBtn: false,
  scrollViewWidth: 0,
  onUploadOK: () => {
    console.error('onUploadOK is not defined in @components/Upload')
  }
}

Upload.propTypes = {
  imageList: PropTypes.array.isRequired,
  showAddBtn: PropTypes.bool,
  addBtnSizeType: PropTypes.string,
  imageSizeType: PropTypes.string,
  alignType: PropTypes.string,
  onUploadOK: PropTypes.func.isRequired
}