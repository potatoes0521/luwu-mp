/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:45
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 18:21:45
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
import Upload from '@components/upload'
import './index.scss'

class NotePublish extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      goodsImageList: [],
      idCardImageList: []
    }
  }

  componentDidMount() {
    // this.chooseImage()
  }
  handleClickUpload() { 
    
  }
  onGoodsImageUpload(imageList) { 
    const {goodsImageList} = this.state
    this.setState({
      goodsImageList: [...goodsImageList, ...imageList]
    })
  }
  onIdCardUpload(imageList) {
    const {idCardImageList} = this.state
    this.setState({
      idCardImageList: [...idCardImageList, ...imageList]
    })
  }
  config = {
    navigationBarTitleText: '发布笔记' 
  }

  render() {
    const {
      goodsImageList,
      idCardImageList
    } = this.state
    
    return (
      <View className='page-wrapper'>
        <View className='form-card-wrapper'>
          <Upload
            imageList={goodsImageList}
            onUploadOK={this.onGoodsImageUpload.bind(this)}
          ></Upload>
          <Upload
            imageList={idCardImageList}
            onUploadOK={this.onIdCardUpload.bind(this)}
          ></Upload>
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