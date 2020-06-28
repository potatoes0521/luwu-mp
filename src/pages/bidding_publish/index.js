/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-28 13:28:05
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-28 15:38:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { publishOffer } from '@services/modules/offer'
import { phoneNumberPatter } from '@utils/patter'
import SafeAreaView from '@components/SafeAreaView'
import FormItem from '@components/FormItem'
import FormItemPicker from '@components/FormItemPicker'
import Upload from '@components/Upload'
import Login from '@utils/login'
import OfferState from '@config/offerExamine'
import houseType from '@config/houseType'
import { defaultResourceImgURL } from '@config/request_config'

import './index.scss'

class BiddingPublish extends Component {

  constructor(props) {
    super(props)
    this.state = Object.assign({}, OfferState, houseType, {
      // 除去公共key以外的字段定在这里
      openModelModal: false,
      houseModelViewTop: 490,
      houseTypeViewTop: 490,
      startTime: '',
      endTime: '',
      imageList: []
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
    e.stopPropagation()
    this.setState({
      model: item
    }, () => {
        this.handleClickModel()
    })
  }
  onImageUpload(imgList) { 
    const {imageList} = this.state
    this.setState({
      imageList: [...imageList, ...imgList]
    }, () => {
      this.getHideLineTop()
    })
  }
  getHideLineTop() {
    Taro.createSelectorQuery()
      .select('.hide-line')
      .boundingClientRect()
      .exec(res => {
        const { system } = this.props
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
    const { target: { value } } = e
    this.setState({
      remark: value
    })
  }
  onChooseStartTime(value) {
    this.setState({
      startTime: value
    })
  }
  onChooseEndTime(value) {
    this.setState({
      endTime: value
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
    navigationBarTitleText: '发布招标信息',
    navigationStyle: 'custom'
  }
  render() {
    const {
      imageList,
      model,
      area,
      remark,
      mobile,
      userName,
      openModelModal,
      houseTypeData,
      houseModelViewTop,
      houseTypeViewTop,
      startTime,
      endTime
    } = this.state
    const modelModalRender = houseTypeData.map(item => {
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
        title='发布招标信息'
        back
        home
      >
        <View className='page-wrapper'>
          {
            this.renderTitle('上传户型图')
          }
          <View className='upload-wrapper' >
            <View className='upload-list-wrapper'>
              <Upload
                imageList={imageList}
                autoChoose
                imageSize={180}
                addBtnSizeType={86}
                showAddBtn
                onUploadOK={this.onImageUpload.bind(this)}
              />
            </View>
            <View className='upload-tips'>请上传清晰完整的户型图~</View>
          </View>
          {
            this.renderTitle('您的房屋信息')
          }
          <View className='form-wrapper'>
            <FormItem
              line
              label='房屋类型'
              important
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
                  style={{top: houseModelViewTop + 'rpx'}}
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
              line
              label='房屋户型'
              important
              unit='icon'
              iconName={modelFormClassName}
              shortUnit
              value={model.modelName || ''}
              canInput={false}
              placeholder={openModelModal ? '' : '请选择'}
              onContentClick={this.handleClickModel.bind(this)}
            />
            <View className='hide-line2'></View>
            {
              openModelModal && (
                <View
                  className='model-modal-wrapper'
                  style={{top: houseTypeViewTop + 'rpx'}}
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
              label='房屋面积'
              important
              line
              type='digit'
              unit='text'
              unitContent='㎡'
              unitNum
              shortUnit
              value={area}
              placeholder='请输入房屋面积'
              canInput
              onInput={this.onAreaInput.bind(this)}
            />
            <FormItem
              line
              label='区域位置'
              important
              unit='icon'
              iconName={modelFormClassName}
              shortUnit
              value={model.modelName || ''}
              canInput={false}
              placeholder={openModelModal ? '' : '请选择'}
              onContentClick={this.handleClickModel.bind(this)}
            />
            <FormItemPicker
              label='预计装修时间'
              unit='icon'
              iconName={modelFormClassName}
              shortUnit
              langLabel
              value={startTime || ''}
              placeholder={openModelModal ? '' : '请选择'}
              onPickerValueChange={this.onChooseStartTime.bind(this)}
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
              placeholder='请补充你对房屋的个性化要求, 更方便装企投标'
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
              important
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
              important
              shortUnit
              maxlength={11}
              value={mobile}
              placeholder='请输入'
              canInput
              onInput={this.onMobileInput.bind(this)}
            />
            <FormItemPicker
              label='有效期限'
              important
              notPast
              unit='icon'
              iconName='iconRectangle rotated'
              shortUnit
              value={endTime || ''}
              placeholder={openModelModal ? '' : '请选择'}
              onPickerValueChange={this.onChooseEndTime.bind(this)}
            />
          </View>
          <View className='bottom-tips'>您的联系信息需要您的确认才会提供给装企</View>
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
export default connect(mapStateToProps)(BiddingPublish)