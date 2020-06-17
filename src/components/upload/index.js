/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 17:35:56
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 18:26:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import {
  View,
  Text,
  Image
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { uploadImage } from './upload_request'

import './index.scss'

function Upload(props) { 
  const chooseImage = () => {
    uploadImage({}).then(res => {
      console.log('res ============', res)
      props.onUploadOK(res)
    })
  }
  const deleteImage = () => {}
  const showImage = () => {

  }

  let { imageList } = props
  const imageListRender = imageList.map((item, index) =>
    <View className='picture-item' key={item}>
      <Text
        onClick={() => deleteImage('car', index)}
        className='delete-btn iconfont iconguanbi2'
      ></Text>
      <Image 
        mode='aspectFill'
        className='image' 
        src={item}
        onClick={() => showImage('car', index)}
      ></Image>
    </View>
  )
  return (
    <View>
      <View className='picture-list'>
        {
          imageListRender
        }
        <View
          className='picture-item picture-not-upload'
          onClick={chooseImage}
        >
          <Text className='iconfont icontuxiang icon-upload-img'></Text>
        </View>
      </View>
    </View>
  )
}

Upload.defaultProps = {
  imageList: [],
  onUploadOK: () => {
    console.error('onUploadOK is not defined in @components/Upload')
  }
}

Upload.propTypes = {
  imageList: PropTypes.array.isRequired,
  onUploadOK: PropTypes.func.isRequired
}