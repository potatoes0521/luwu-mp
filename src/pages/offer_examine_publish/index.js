import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { uploadImage, uploadFile } from '@components/Upload/utils/upload_type'
import OfferState from '@config/offerExamineState'
import { getImage } from '@assets/cdn'
import FormForHouse from '@/components_bidding/FormForHouse'
import FormForUserInfo from '@/components_bidding/FormForUserInfo'
import { getHouseList, publishHouse } from '@services/modules/house'
import { publishOffer } from '@services/modules/offer'
import FormItem from '@components/FormItem'

import './index.scss'

const fileIcon = getImage('icon/file_icon.png')

class OfferExaminePublish extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...OfferState,
      // 除去公共key以外的字段定在这里
      requireId: ''
    }
    this.timer = null
    this.formForHouse = null
    this.formForUser = null
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.handleOtherHouse()
  }
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  /**
   * 处理其他房屋信息
   * @return void
   */
  handleOtherHouse() {
    const { userInfo } = this.props
    // 判断有没有房屋数据  没有就创建一个房屋  然后取ID   有房屋就取最后一个
    getHouseList({
      userId: userInfo.userId
    }).then(res => {
      if (res && res.length) {
        this.setState({
          requireId: res[res.length - 1].requireId
        })
      }
    })
  }
  /**
   * 处理上传文件或图片
   * @return void
   */
  handleUpload() { 
    const chooseTypeList = ['拍照', '相册选择图片', '文件']
    const { fileList } = this.state
    Taro.showActionSheet({
        itemList: chooseTypeList
      })
      .then(({tapIndex}) => {
        if (tapIndex === 2) { 
          uploadFile({ that: this }).then(res => {
            const fileData = res.map(item => {
              return {
                url: item,
                fileType: 'file'
              }
            })
            this.setState({
              fileList: [...fileList, ...fileData]
            }, () => {
                this.getHideLineTop()
            })
          })
        } else {
          uploadImage({
            sourceType: [tapIndex === 0 ? 'camera' : 'album'],
          }).then(res => {
            const fileData = res.map(item => {
              return {
                url: item,
                fileType: 'image'
              }
            })
            this.setState({
              fileList: [...fileList, ...fileData]
            })
          })
        }
      })
      .catch(err => console.log(err.errMsg))
  }
  /**
   * 处理查看文件
   * @param {Type} file 参数描述
   * @return void
   */
  handleClickFile(file) { 
    if (file.fileType === 'image') { 
      Taro.previewImage({
        current: file.url
      })
    } else {
      Taro.downloadFile({
        url: file.url,
        success: ({tempFilePath}) => {
          Taro.openDocument({
            filePath: tempFilePath
          })
        }
      })
    }
  }
  onUserNameChange(userName) {
    this.setState({ userName })
  }
  async submit() { 
    const {
      fileList,
      requireId,
      companyName
    } = this.state
    if (!fileList || !fileList.length) {
      this.showToast('至少上传一个报价文件/图片')
      return
    }
    if (!companyName) {
      this.showToast('请输入装修公司名称')
      return
    }
    const formForHouse = this.formForHouse.judgeAndEmitData()
    if (!formForHouse) return
    const formForUser = this.formForUser.judgeAndEmitData()
    if (!formForUser) return
    if (!requireId) {
      const sendData = Object.assign({}, formForHouse, formForUser)
      await publishHouse(sendData)
    }
    const sendData = {
      data: Object.assign({}, { fileList, companyName }, formForHouse, formForUser)
    }
    publishOffer(sendData, this).then(res => {
      if (!res || !res.quotationId) {
        this.showToast('发布失败')
        return
      }
      this.showToast('发布成功', 'success')
      this.timer = setTimeout(() => {
        Taro.redirectTo({
          url: `/pages/offer_examine_details/index?quotationId=${res.quotationId}`
        })
      }, 1800)
    })
  }
  showToast(msg, icon='none') { 
    Taro.showToast({
      title: msg,
      icon
    })
  }
  onInputCompanyName(e) { 
    const { target: { value } } = e
    this.setState({
      companyName: value
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
    navigationBarTitleText: '免费申报价',
    navigationStyle: 'custom'
  }
  render() {
    const {
      fileList,
      startTime,
      budget,
      requireId,
      houseType,
      bedroom,
      sittingroom,
      cookroom,
      washroom,
      userName,
      companyName
    } = this.state
    const fileListRender = fileList.map((file, index) => {
      const key = file.url
      const fileName = `文件${index + 1}`
      return (
        <View
          className='file-item-wrapper'
          key={key}
          onClick={this.handleClickFile.bind(this, file)}
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
        title='免费帮您审报价'
        back
      >
        <View className='page-wrapper'>
          <View className='upload-wrapper'>
            <View className='upload-title'>上传文件</View>
            <View className='upload-view iconfont iconbianzu' onClick={this.handleUpload.bind(this)}></View>
            <View className='upload-tips'>文件支持jpg/png/doc/docx/pdf/xls/xlsx  ( 5MB以内 )</View>
            {
              fileList && fileList.length && (
                <View className='upload-over-wrapper'>
                  <View className='upload-title'>已上传文件</View>
                  <View className='upload-over-list'>
                    {
                      fileListRender
                    }
                  </View>
                </View>
              )
            }
          </View>
          <View className='title'>请补充您房屋具体信息，方便监理帮您审报价</View>
          <View className='form-wrapper'>
            <FormItem
              line
              label='装修公司'
              value={companyName}
              placeholder='请输入装修公司名称'
              onInput={this.onInputCompanyName.bind(this)}
            />
          </View>
          <FormForHouse
            type='edit'
            budget={budget}
            bedroom={bedroom}
            important={false}
            cookroom={cookroom}
            washroom={washroom}
            requireId={requireId}
            startTime={startTime}
            houseType={houseType}
            sittingroom={sittingroom}
            ref={node => this.formForHouse = node}
            onUserNameChange={this.onUserNameChange.bind(this)}
          />
          <FormForUserInfo
            important={false}
            userName={userName}
            ref={node => this.formForUser = node}
          />
          <View className='fixed-bottom-btn'>
            <View className='bottom-tips'>监理审完报价后会通过手机跟您联系</View>
            <View className='btn-public default-btn' onClick={this.submit.bind(this)}>提交</View>
          </View>
        </View>
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(OfferExaminePublish)