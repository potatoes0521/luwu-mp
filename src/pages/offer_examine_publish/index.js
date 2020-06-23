import Taro, { Component } from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import FormItem from '@components/FormItem'
import Login from '@utils/login'

import './index.scss'

class OfferExaminePublish extends Component {

  constructor(props) {
    super(props)
    this.state={}
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }
  handleClickModel() { 
    
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
  config = {
    navigationBarTitleText: '免费申报价',
    navigationStyle: 'custom'
  }
  onUploadOK(fileList) {
    console.log('fileList', fileList)
  }
  render() {
    const {fileList} = this.state
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
            <View className='upload-view'></View>
            <View className='upload-tips'>文件支持jpg/png/doc/docx/pdf/xls/xlsx  ( 5MB以内 )</View>
          </View>
          {
            this.renderTitle('您的房屋信息')
          }
          <View className='form-wrapper'>
            <FormItem
              line
              label='类型'
              unit='icon'
              iconName='iconRectangle rotated'
              shortUnit
              value=''
              canInput={false}
              placeholder='请选择'
              onContentClick={this.handleClickModel.bind(this)}
            />
            <FormItem
              label='面积'
              unit
              shortUnit
              value=''
              placeholder='请输入'
              onContentClick={this.handleClickModel.bind(this)}
            />
          </View>
          {
            this.renderTitle('补充信息')
          }
          <View className='remark-wrapper'>
            <Textarea className='textarea'></Textarea>
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
              value=''
              placeholder='请输入'
              onContentClick={this.handleClickModel.bind(this)}
            />
            <FormItem
              label='手机号码'
              type='number'
              unit
              shortUnit
              value=''
              placeholder='请输入'
              onContentClick={this.handleClickModel.bind(this)}
            />
          </View>
          <View className='bottom-tips'>监理审完报价后会通过手机跟您联系</View>
          <View className='fixed-bottom-btm'>
            <View className='btn-public default-btn'>提交</View>
          </View>
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
export default connect(mapStateToProps)(OfferExaminePublish)