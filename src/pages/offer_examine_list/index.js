/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-23 18:42:57
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 10:28:32
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getOfferList } from '@services/modules/offer'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getImage } from '@img/cdn'

import './index.scss'

class OfferExamineDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offerList: []
    }
    this.pageNum = 1
    this.pageSize = 1000
    this.flag = false
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getOfferList()
  }
  getOfferList() { 
    if(this.flag) return
    const {userInfo} = this.props
    getOfferList({
      userId: userInfo.userId,
      current: this.pageNum,
      pageSize: this.pageSize
    }).then(res => {
      this.flag = false
      if (!res || !res.data || !res.data.length) { 
        return
      }
      if (res.data.length < this.pageSize) { 
        this.flag = true
      }
      const { offerList } = this.state
      let data = []
      if (this.pageNum === 1) { 
        data = res.data
      } else {
        data = [...offerList, ...res.data]
      }
      this.pageNum += 1
      this.setState({
        offerList: data
      })
    })
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
        success: ({
          tempFilePath
        }) => {
          Taro.openDocument({
            filePath: tempFilePath
          })
        }
      })
    }
  }
  navigatorTo(quotationId) {
    Taro.navigateTo({
      url: `/pages/offer_examine_details/index?quotationId=${quotationId}`
    })
  }
  renderItem(label, content) { 
    return (
      <View className='offer-detail-item'>
        <View className='offer-detail-item-label'>{label}</View>
        <View className='offer-detail-item-content'>{content}</View>
      </View>
    )
  }
  /**
   * 下拉刷新
   * @return void
   */
  onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading()
    this.pageNum = 1
    this.flag = false
    this.getOfferList()
    // 隐藏导航栏加载框
    Taro.hideNavigationBarLoading();
    // 停止下拉动作
    Taro.stopPullDownRefresh();
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
    navigationBarTitleText: '我发布的免费审报价',
    enablePullDownRefresh: true,
    navigationStyle: 'custom'
  }

  render() {
    const { offerList } = this.state
    const offerListRender = offerList.map(item => {
      const itemKey = item.data.quotationId || ''
      const data = item.data || {}
      const fileList = item && item.data && item.data.fileList || []
      const fileListRender = fileList.map((file, index) => {
        const key = file.url
        return (
          <View className='file-item' onClick={this.handleClickFile.bind(this, file)} key={key}>{`文件${index+1}`}</View>
        )
      })
      return (
        <View className='list-item' onClick={this.navigatorTo.bind(this, itemKey)} key={itemKey}>
          <View className='title'>{item.createAt}</View>
          <View className='list-item-main'>
            <View className='offer-line-details skeleton-square'>
              {this.renderItem('房屋类型', data.model && data.model.modelName || '')}
              {this.renderItem('房屋面积', `${data.area}㎡`)}
            </View>
            <View className='offer-line-details skeleton-square'>
              {this.renderItem('量房联系人', data.userName)}
              {this.renderItem('联系电话', data.mobile)}
            </View>
            <View className='file-wrapper'>
              <View className='file-label'>相关文件</View>
              <View className='file-content'>
                {
                  fileListRender
                }
              </View>
            </View>
          </View>
        </View>
      )
    })
    return (
      <SafeAreaView
        title='我的报价'
        back
        home
      >
        <View className='page-wrapper skeleton'>
          {
            offerListRender
          }
        </View>
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo,
  }
}
export default connect(mapStateToProps)(OfferExamineDetails)