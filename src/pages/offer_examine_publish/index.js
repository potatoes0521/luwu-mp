import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'
import Location from '@components/Location'
import FormItem from '@components/FormItem'
import RadioGroups from '@components/RadioGroup'
import { phoneNumberPatter } from '@utils/patter'
import OfferState from '@config/offerExamineState'
import SafeAreaView from '@components/SafeAreaView'
import { getUserPhone } from '@services/modules/user'
import { publishOffer } from '@services/modules/offer'
import { houseTypeRadioOptions } from '@config/houseType'
import FormItemCustomContent from '@components/FormItemCustomContent'
import { uploadImage, uploadFile } from '@components/Upload/utils/upload_type'
  
import './index.scss'

const fileIcon = getImage('icon/file_icon.png')

class OfferExaminePublish extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...OfferState,
      // 除去公共key以外的字段定在这里
    }
    this.timer = null
    this.formForHouse = null
    this.formForUser = null
    this.code = ''
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.handleCode()
  }
  componentWillUnmount() { 
    clearTimeout(this.timer)
    this.timer = null
  }
  async handleCode() {
    const {
      userInfo
    } = this.props
    if (!userInfo.phone) {
      try {
        this.code = (await Taro.login()).code
      } catch (err) {
        this.code = userInfo.code
      }
    } else {
      this.setState({
        phone: userInfo.phone
      })
    }
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
  // onUserNameChange(userName) {
  //   this.setState({ userName })
  // }
  async submit() { 
    const {
      fileList,
      phone,
      address,
      decorateType,
    } = this.state
    if (!fileList || !fileList.length) {
      this.showToast('至少上传一个报价文件/图片')
      return
    }
    if (decorateType === -1) {
      this.showToast('请选择房屋类型')
      return
    }
    if (!address || !address.address) {
      this.showToast('请完善所在地址')
      return
    }
    if (!phoneNumberPatter.test(phone)) {
      this.showToast('请输入正确的联系方式')
      return
    }
    const sendData = {
      data: {
        fileList,
        phone,
        address,
        decorateType,
      }
    }
    publishOffer(sendData).then(res => {
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
  /**
   * 当获取到位置数据
   * @param {Object} data 获取到的数据
   * @return void
   */
  onGetLocationData(data) {
    this.setState({
      address: data
    })
  }
  onInputPhone(e) { 
    const { target: {value} } = e
    this.setState({
      phone: value
    })
  }
  onGetPhoneNumber(e) {
    const { detail } = e
    if (detail.errMsg.startsWith('getPhoneNumber:fail')) {
      this.setState({
        getPhoneNumberError: true
      })
    } else {
      const sendData = {
        iv: detail.iv,
        encryptedData: detail.encryptedData,
        code: this.code,
      }
      getUserPhone(sendData).then(res => {
        const data = {
          ...res,
          isMember: 1
        }
        this.props.onChangeUserInfo(data)
        this.setState({
          phone: res.phone
        })
      })
    }
  }
  chooseAudio(type) {
    this.setState({
      decorateType: type.id
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
      phone,
      address,
      fileList,
      decorateType,
      getPhoneNumberError
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
    const phoneNumberClassName = classNames('get-phone-wrapper', {
      'placeholder-class': !phone
    })
    return (
      <SafeAreaView
        title='免费审装修报价'
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
            <FormItemCustomContent
              line
              height100
              label='房屋类型'
            >
              <RadioGroups
                activeIndex={decorateType}
                optionsList={houseTypeRadioOptions}
                onChooseAudio={this.chooseAudio.bind(this)}
              />
            </FormItemCustomContent>
            <Location
              line
              height100
              style='form'
              label='所在城市'
              placeholder='请选择'
              address={address || {}}
              onGetLocationData={this.onGetLocationData.bind(this)}
            />
            {
              getPhoneNumberError || phone ? (
                <FormItem
                  unit
                  shortUnit
                  langLabel
                  height100
                  type='number'
                  maxlength={11}
                  label='手机号码'
                  value={phone || ''}
                  placeholder='请输入手机号'
                  focus={getPhoneNumberError}
                  onInput={this.onInputPhone.bind(this)}
                />
              ) : (
                <FormItemCustomContent
                  unit
                  height100
                  shortUnit
                  label='手机号码'
                >
                  <View className={phoneNumberClassName}>
                    <Text>{phone || '请输入手机号'}</Text>
                    <Button
                      openType='getPhoneNumber'
                      className='get-phone-btn'
                      onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
                    ></Button>
                  </View>
                </FormItemCustomContent>
              )
            }
          </View>
          <View className='bottom-tips'>监理审完报价后会通过手机跟您联系</View>
          <View className='fixed-bottom-btn'>
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