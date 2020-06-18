/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:45
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 13:33:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import {} from '@services/modules/index'
import Upload from '@components/Upload'
import Location from '@components/Location'

import './index.scss'

class NotePublish extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      goodsImageList: [],
      idCardImageList: [],
      address: {
        address: ''
      }
    }
  }

  componentDidMount() {
    // this.chooseImage()
  }
  handleClickUpload() { 
    
  }
  /**
   * 上传图片完成
   * @param {Type} imageList 参数描述
   * @return void
   */
  onGoodsImageUpload(imageList) { 
    const {goodsImageList} = this.state
    this.setState({
      goodsImageList: [...goodsImageList, ...imageList]
    })
  }
  /**
   * 上传名片
   * @param {Type} imageList 参数描述
   * @return void
   */
  onIdCardUpload(imageList) {
    const {idCardImageList} = this.state
    this.setState({
      idCardImageList: [...idCardImageList, ...imageList]
    })
  }
  onGetLocationData(data) {
    this.setState({
      address: data
    })
  }
  renderTitle(title) { 
    return (
      <View className='title'>{title}</View>
    )
  }
  
  config = {
    navigationBarTitleText: '发布笔记' 
  }

  render() {
    const {
      goodsImageList,
      idCardImageList,
      address
    } = this.state
  
    return (
      <View className='page-wrapper'>
        <View className='form-card-wrapper'>
          <View className='goods-image-wrapper'>
            <View className='goods-image-list-wrapper'>
              <Upload
                imageList={goodsImageList}
                showAddBtn
                alignType='flex_end'
                onUploadOK={this.onGoodsImageUpload.bind(this)}
              />
            </View>
            <View className='goods-image-tips'>瓷砖类商品照片要注意拍摄光线哦~</View>
          </View>
          {
            this.renderTitle('您看中的产品信息')
          }
          {
            this.renderTitle('门店地址')
          }
          {
            this.renderTitle('备注')
          }
          <Upload
            imageList={idCardImageList}
            showAddBtn
            onUploadOK={this.onIdCardUpload.bind(this)}
          />
          <Location
            address={address}
            onGetLocationData={this.onGetLocationData.bind(this)}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}

export default connect(mapStateToProps)(NotePublish);