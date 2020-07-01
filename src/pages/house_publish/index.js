/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:27:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-01 11:24:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { publishOffer } from '@services/modules/offer'
import SafeAreaView from '@components/SafeAreaView'
import FormItem from '@components/FormItem'
// import Upload from '@components/Upload'
import Location from '@components/Location'
import Login from '@utils/login'
import biddingState from '@config/biddingState'
import { getImage } from '@img/cdn'

import './index.scss'

class BiddingPublish extends Component {

  constructor(props) {
    super(props)
    this.state = Object.assign({}, biddingState, {
      // 除去公共key以外的字段定在这里
    })
    this.timer = null
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    clearTimeout(this.timer)
    this.timer = null
  }
  handleClickHouseModel() {
    
  }
  handleClickHouseType() { 
    
  }
  onAreaInput(e) {
    const { target: { value } } = e
    this.setState({
      area: value
    })
  }
  onChooseStartTime(value) {
    this.setState({
      startTime: value
    })
  }
  submit() { 
    const {
      fileList,
      model,
      area,
    } = this.state
    const testKey = {
      fileList: '请上传报价文件',
      model: '请选择房屋类型',
      area: '请填写房屋面积',
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
  stopPropagation(e) {
    e.stopPropagation()
    this.handleClickModel()
  }
  handleClickModel() {
    const { openModelModal } = this.state
    this.setState({
      openModelModal: !openModelModal
    })
  }
  onClickAddress() { 
    
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
    navigationBarTitleText: '完善房屋信息',
    navigationStyle: 'custom'
  }
  render() {
    const {
      // imageList,
      model,
      type,
      area,
      startTime,
      address
    } = this.state
    return (
      <SafeAreaView
        title='发布招标信息'
        back
        home
      >
        <View className='page-wrapper'>
          <View className='form-wrapper'>
            <FormItem
              line
              important
              shortUnit
              unit='icon'
              label='房屋类型'
              canInput={false}
              placeholder='请选择'
              value={model.modelName || ''}
              iconName='iconRectangle rotated'
              onContentClick={this.handleClickHouseModel.bind(this)}
            />
            <FormItem
              line
              important
              shortUnit
              unit='icon'
              label='房屋户型'
              canInput={false}
              placeholder='请选择'
              value={type.modelName || ''}
              iconName='iconRectangle rotated'
              onContentClick={this.handleClickHouseType.bind(this)}
            />
            <FormItem
              line
              unitNum
              canInput
              shortUnit
              important
              unit='text'
              type='digit'
              value={area}
              label='房屋面积'
              unitContent='㎡'
              placeholder='请输入房屋面积'
              onInput={this.onAreaInput.bind(this)}
            />
            <Location
              line
              important
              style='form'
              label='房屋位置'
              placeholder='请选择'
              address={address.address || {}}
            />
            <FormItem
              shortUnit
              langLabel
              unit='icon'
              label='装修时间'
              placeholder='请选择'
              value={startTime || ''}
              iconName='iconRectangle rotated'
              onContentClick={this.onChooseStartTime.bind(this)}
            />
          </View>
          <View className='bottom-tips'>您的联系信息需要您的确认才会提供给装修公司</View>
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