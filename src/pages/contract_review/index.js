/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-17 11:07:23
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-17 11:47:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View , Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'
import { } from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'

import './index.scss'

const fileIcon = getImage('icon/file_icon.png')

class ContractReview extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }

  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    const fileListRender = [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
      <View className='file-item' key={item}>
        <Image className='file-icon' src={fileIcon}></Image>
        <View className='file-text'>图纸{index + 1}</View>
      </View>
    ))
    return (
      <SafeAreaView
        title='上传文件'
        back
      >
        <View className='page-wrapper'>
          <View className='form-wrapper'>
            <View className='upload-wrapper'>
              <View className='title'>上传图纸</View>
              <View className='iconfont iconbianzu icon-add'></View>
            </View>
            <View className='file-list-wrapper'>
              <View className='title'>已上传图纸</View>
              <View className='file-list'>
                {
                  fileListRender
                }
              </View>
            </View>
          </View>
          <View className='form-wrapper scend-form'>
            <View className='upload-wrapper'>
              <View className='title'>上传合同</View>
              <View className='iconfont iconbianzu icon-add'></View>
            </View>
            <View className='file-list-wrapper'>
              <View className='title'>已上传合同</View>
              <View className='file-list'>
                {
                  fileListRender
                }
              </View>
            </View>
          </View>
          <View className='fixed-bottom'>
            <View className='default-btn'>提交</View>
          </View>
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
export default connect(mapStateToProps)(ContractReview)