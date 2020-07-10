/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-29 17:27:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 09:28:37
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { publishBidding } from '@services/modules/bidding'
import { getHouseList, publishHouse } from '@services/modules/house'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'
import { removeStorage } from "@utils/storage"
import biddingState from '@config/biddingState'
import FormForHouse from '@/components_bidding/FormForHouse'
import FormForUserInfo from '@/components_bidding/FormForUserInfo'
import Upload from '@components/Upload'

import './index.scss'

class BiddingPublish extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...biddingState,
      // 除去公共key以外的字段定在这里
    }
    this.pageParams = {}
    this.timer = null
    this.formForHouse = null
    this.formForUser = null
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    // 判断进来的时候有么有房屋ID  有就处理  没有就去下一个判断
    if (this.pageParams.requireId) {
      this.setState({
        requireId: this.pageParams.requireId
      })
    }
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
  onRemarkInput(e) { 
    const { target: {value} } = e
    this.setState({
      remark: value
    })
  }

  async submit() {
    const {
      images,
      remark
    } = this.state
    let { requireId } = this.state
    if (!requireId) { 
      requireId = await publishHouse({}).requireId
    }
    const formForHouse = this.formForHouse.judgeAndEmitData()
    if (!formForHouse) return
    const formForUser = this.formForUser.judgeAndEmitData()
    if (!formForUser) return
    if (!images || !images.length) {
      this.showToast('至少上传一张户型图')
      return
    }
    let sendData = {
      requireId,
      images,
      remark,
      ...formForHouse,
      ...formForUser,
    }
    publishBidding(sendData, this).then(() => {
      this.showToast('发布成功')
      removeStorage('choose_house_type')
      removeStorage('choose_budget')
      removeStorage('choose_timer')
      this.timer = setTimeout(() => {
        Taro.redirectTo({
          url: `/pages/bidding_details/index?requireId=${requireId}`
        })
      }, 1800)
    })
  }
  /**
   * 显示toast
   * @param {String} text 参数描述
   * @return void
   */
  showToast(text) {
    Taro.showToast({
      title: text,
      icon: 'none',
      duration: 2000
    })
  }
  onImageUpload(imageList) { 
    const { images } = this.state
    this.setState({
      images: [...images, ...imageList]
    })
  }
  onUserNameChange(userName) {
    this.setState({
      userName
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
    navigationBarTitleText: '发布招标信息',
    navigationStyle: 'custom'
  }
  render() {
    const {
      startTime,
      budget,
      remark,
      formType,
      requireId,
      houseType,
      bedroom,
      sittingroom,
      cookroom,
      washroom,
      images,
      userName
    } = this.state
    return (
      <SafeAreaView
        title='发布招标信息'
        back
      >
        <View className='page-wrapper'>
          <FormForHouse
            type={formType}
            budget={budget}
            bedroom={bedroom}
            cookroom={cookroom}
            washroom={washroom}
            requireId={requireId}
            startTime={startTime}
            houseType={houseType}
            sittingroom={sittingroom}
            ref={node => this.formForHouse = node}
            onUserNameChange={this.onUserNameChange.bind(this)}
          />
          <View className='form-wrapper upload-wrapper'>
            <View className='form-label-title'>上传图片</View>
            <View className='upload-view'>
              <Upload
                autoChoose
                showAddBtn
                imageSize={96}
                imageList={images}
                addBtnSizeType={96}
                onUploadOK={this.onImageUpload.bind(this)}
              />
            </View>
            <View className='upload-tips'>请上传清晰完整的户型图片</View>
          </View>
          <View className='form-wrapper textarea-wrapper'>
            <View className='form-label-title'>补充信息</View>
            <Textarea
              autoHeight
              value={remark}
              maxlength={300}
              className='textarea'
              placeholderClass='placeholder-class'
              onInput={this.onRemarkInput.bind(this)}
              placeholder='请补充您对房屋的个性化需求，更方便装修公司投标'
            ></Textarea>
            <View className='num-tips'>{300 - remark.length}</View>
          </View>
          <FormForUserInfo
            userName={userName}
            ref={node => this.formForUser = node}
          />
          <View className='fixed-bottom-btm'>
            <View className='btn-public default-btn submit-btn' onClick={this.submit.bind(this)}>提交</View>
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