import Taro, { Component } from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { publishOffer } from '@services/modules/offer'
import { phoneNumberPatter } from '@utils/patter'
import SafeAreaView from '@components/SafeAreaView'
import FormItem from '@components/FormItem'
import Login from '@utils/login'
import { uploadImage, uploadFile } from '@components/Upload/utils/upload_type'
import OfferState from '@/config/offerExamineState'
import { defaultResourceImgURL } from '@config/request_config'

import './index.scss'

class OfferExaminePublish extends Component {

  constructor(props) {
    super(props)
    this.state = Object.assign({}, OfferState, {
      // 除去公共key以外的字段定在这里
      openModelModal: false,
      modelViewTop: 490
    })
    this.timer = null
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    clearTimeout(this.timer)
    this.timer = null
  }
  handleClickModel() {
    const { openModelModal } = this.state
    this.setState({
      openModelModal: !openModelModal
    })
  }
  onClickModelModalItem(item, e) { 
    e.stopPropagation();
    console.log('item', item)
    this.setState({
      model: item
    }, () => {
        this.handleClickModel()
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
            }, () => {
                this.getHideLineTop()
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
  getHideLineTop() {
    Taro.createSelectorQuery()
      .select('.hide-line')
      .boundingClientRect()
      .exec(res => {
        const { system } = this.props
        console.log('system', system)
        console.log('res', res)
        this.setState({
          modelViewTop: res[0].top * 2 - (system && system.navHeight)
        })
      })
  }
  onAreaInput(value) { 
    this.setState({
      area: value
    })
  }
  onRemarkInput(e) { 
    const { target: value } = e
    this.setState({
      remark: value
    })
  }
  onUserNameInput(value) { 
    this.setState({
      userName: value
    })
  }
  onMobileInput(value) { 
    this.setState({
      mobile: value
    })
  }
  submit() { 
    const {
      fileList,
      model,
      area,
      remark,
      mobile,
      userName,
    } = this.state
    const testKey = {
      fileList: '请上传报价文件',
      model: '请选择房屋类型',
      area: '请填写房屋面积',
      userName: '请填写联系人',
      mobile: '请填写手机号',
    }
    let breakName = ''
    for (const key in testKey) {
      if (key === 'fileList' && fileList.length < 1) {
        breakName = key
        break
      } else if (key === 'model' && !model.modelName) {
        breakName = key
        break
      } else if (!this.state[key]) { 
        breakName = key
        break
      }
    }
    if (!phoneNumberPatter.test(mobile)) {
      breakName = 'mobile'
    }
    if (breakName) {
      Taro.showToast({
        title: testKey[breakName],
        icon: 'none',
        duration: 2000
      })
      return
    }
    const sendData = {
      data: {
        fileList,
        model,
        area,
        remark,
        mobile,
        userName,
      }
    }
    publishOffer(sendData, this).then(res => {
      if (!res || !res.quotationId) {
        return
      }
      Taro.showToast({
        title: '发布成功'
      })
      this.timer = setTimeout(() => {
        Taro.redirectTo({
          url: `/pages/offer_examine_details/index?quotationId=${res.quotationId}`
        })
      }, 1800)
    })
  }
  /**
   * 公共标题
   * @param {String} title 标题文字
   * @return void
   */
  renderTitle(title) { 
    return (
      <View className='title'>{title}</View>
    )
  }
  stopPropagation(e) {
    e.stopPropagation()
    this.handleClickModel()
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
      imageUrl: `${defaultResourceImgURL}/share/share_index.png`
    }
  }
  config = {
    navigationBarTitleText: '免费申报价',
    navigationStyle: 'custom'
  }
  render() {
    const {
      fileList,
      model,
      area,
      remark,
      mobile,
      userName,
      openModelModal,
      modelModalData,
      modelViewTop
    } = this.state
    const fileListRender = fileList.map((file, index) => {
      const key = file.url
      const fileName = `文件${index + 1}`
      return (
        <View
          className='file-item'
          key={key}
          onClick={this.handleClickFile.bind(this, file)}
        >{fileName}</View>
      )
    })
    const modelModalRender = modelModalData.map(item => {
      const key = item.modelId
      const itemClassName = classNames('model-item', {
        'model-item-active': item.modelId === model.modelId
      })
      return (
        <View
          className={itemClassName}
          key={key}
          onClick={this.onClickModelModalItem.bind(this, item)}
        >{item.modelName}</View>
      )
    })
    const modelFormClassName = classNames('iconRectangle', {
      'rotated-90': openModelModal,
      'rotated': !openModelModal
    })
    return (
      <SafeAreaView
        title='免费帮您审报价'
        back
        home
      >
        <View className='page-wrapper'>
          {
            this.renderTitle('上传户型图和报价单')
          }
          <View className='upload-wrapper'>
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
          {
            this.renderTitle('您的房屋信息')
          }
          <View className='form-wrapper'>
            <FormItem
              line
              label='类型'
              unit='icon'
              iconName={modelFormClassName}
              shortUnit
              value={model.modelName || ''}
              canInput={false}
              placeholder={openModelModal ? '' : '请选择'}
              onContentClick={this.handleClickModel.bind(this)}
            />
            <View className='hide-line'></View>
            {
              openModelModal && (
                <View
                  className='model-modal-wrapper'
                  style={{top: modelViewTop + 'rpx'}}
                  onClick={this.stopPropagation.bind(this)}
                >
                  <View className='modal-main'>
                    {
                      modelModalRender
                    }
                  </View>
                </View>
              )
            }
            <FormItem
              label='面积'
              type='digit'
              unit
              shortUnit
              value={area}
              placeholder='请输入'
              canInput
              onInput={this.onAreaInput.bind(this)}
            />
          </View>
          {
            this.renderTitle('补充信息')
          }
          <View className='remark-wrapper'>
            <Textarea
              autoHeight
              className='textarea'
              placeholderClass='placeholder-class'
              value={remark}
              onInput={this.onRemarkInput.bind(this)}
              maxlength={500}
            ></Textarea>
          </View>
          {
            this.renderTitle('您的个人信息')
          }
          <View className='form-wrapper'>
            <FormItem
              line
              label='联系人'
              unit
              shortUnit
              value={userName}
              placeholder='请输入'
              canInput
              maxlength={6}
              onInput={this.onUserNameInput.bind(this)}
            />
            <FormItem
              label='手机号码'
              type='number'
              unit
              shortUnit
              maxlength={11}
              value={mobile}
              placeholder='请输入'
              canInput
              onInput={this.onMobileInput.bind(this)}
            />
          </View>
          <View className='bottom-tips'>监理审完报价后会通过手机跟您联系</View>
          <View className='fixed-bottom-btm'>
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