/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-23 10:55:14
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 14:21:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from '@tarojs/components'
import { connect } from 'react-redux'
import { getOfferDetails } from '@services/modules/offer'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import OfferState from '@config/offerExamineState'
import { getImage } from '@assets/cdn'
import { formatTimeToChinese } from '@utils/timer'
import { handleRequestData } from '@config/houseType'

import './index.scss'

const fileIcon = getImage('icon/file_icon.png')

class OfferExamineDetails extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      ...OfferState,
      createAt: ''
    }
    this.pageParams = {}
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getOfferDetails()
  }
  getOfferDetails() {
    getOfferDetails({
      quotationId: this.pageParams.quotationId
    }).then(res => {
      if (!res || !res.data) return
      const roomData = handleRequestData(res.data)
      const data = Object.assign({}, roomData, res)
      this.setState(data)
    })
  }
  renderFormUser(label, content) { 
    return (
      <View className='form-user-item'>
        <View className='form-label'>{label}：</View>
        <View className='form-content'>{content}</View>
      </View>
    )
  }
  handleClickFile(file) {
    Taro.downloadFile({
      url: file,
      success: ({
        tempFilePath
      }) => {
        Taro.openDocument({
          filePath: tempFilePath
        })
      }
    })
  }
  /**
   * 页面内转发
   * @param {Object} res 微信返回参数
   * @return void
   */
  onShareAppMessage() {
    return {
      title: `录屋,和监理一起开启装修之旅吧`,
      path: `/pages/index/index`,
      imageUrl: getImage('share/share_index.png')
    }
  }
  config = {
    navigationBarTitleText: '我的报价审核',
    navigationStyle: 'custom'
  }

  render() {
    const {
      companyName,
      createAt,
      bedroom,
      sittingroom,
      cookroom,
      washroom,
      address,
      area,
      fileList,
      userName,
      phone,
      status,
      reviewFile,
      reviewRemark
    } = this.state
    const timeText = formatTimeToChinese(createAt)
    const houseType = (bedroom.chinese || '-') + '室' + (sittingroom.chinese || '-') + '厅' + (cookroom.chinese || '-') + '厨' + (washroom.chinese || '-') + '卫'
    const fileListRender = fileList.map((file, index) => {
      const key = file.url
      const fileName = `文件${index + 1}`
      return (
        <View
          className='file-item-wrapper'
          key={key}
          onClick={this.handleClickFile.bind(this, file.url)}
        >
          <View className='file-item'>
            <Image className='file-icon' src={fileIcon}></Image>
            <Text className=''>{fileName}</Text>
          </View>
        </View>
      )
    })
    return (
      <SafeAreaView
        title='我的报价审核'
        back
      >
        <View className='page-wrapper'>
          <View className='msg-wrapper'>
            <View className='msg-title-wrapper'>
              <Text>{companyName || '装修公司'}</Text>
              <Text className='time'>{timeText}</Text>
            </View>
            <View className='form-msg-wrapper'>
              <View className='form-title form-item'>{houseType}</View>
              <View className='form-item'>
                <Text>{address.address || ''}</Text>
                <Text className='area'>面积 {area}㎡</Text>
              </View>
              <View className='upload-file-list'>
                {
                  fileListRender
                }
              </View>
              {this.renderFormUser('联 系 人', userName)}
              {this.renderFormUser('手机号码', phone)}
              <View className='msg-tips'>监理已审核，随后会通过电话跟您联系</View>
            </View>
          </View>
          {
            status === 1 && (
              <View className='feedback-wrapper' >
                <View className='title'>监理审核回复</View>
                <View className='textarea'>
                  {reviewRemark}
                </View>
                <View className='download-file'>
                  <Text onClick={this.handleClickFile.bind(this, reviewFile)}>详细审核请下载附件</Text>
                </View>
              </View>
            )
          }
        </View>
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
  }
}
export default connect(mapStateToProps)(OfferExamineDetails)