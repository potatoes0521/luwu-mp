/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-23 18:42:57
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-23 19:12:17
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'

import './index.scss'

class OfferExamineDetails extends Component {

  constructor(props) {
    super(props)
    this.state={}
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }
  renderItem(label, content) { 
    return (
      <View className='offer-detail-item'>
        <View className='offer-detail-item-label'>{label}</View>
        <View className='offer-detail-item-content'>{content}</View>
      </View>
    )
  }
  config = {
    navigationBarTitleText: '我发布的免费审报价',
    navigationStyle: 'custom'
  }

  render() {
    return (
      <SafeAreaView
        title='我的报价'
        back
        home
      >
        <View className='page-wrapper skeleton' >
          <View className='list-item'>
            <View className='title'>2020/10/10</View>
            <View className='list-item-main'>
              <View className='offer-line-details skeleton-square'>
                {this.renderItem('房屋类型', '1')}
                {this.renderItem('房屋面积', `${1}㎡`)}
              </View>
              <View className='offer-line-details skeleton-square'>
                {this.renderItem('量房联系人', '1')}
                {this.renderItem('联系电话', '1')}
              </View>
              <View className='file-wrapper'>
                <View className='file-label'>相关文件</View>
                <View className='file-content'>
                  {[1, 2, 3, 4,5,6,7,8,9].map(item => {
                    const key = item.url
                    return (
                      <View className='file-item' key={key}>1111</View>
                    )
                  })}
                </View>
              </View>
            </View>
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
export default connect(mapStateToProps)(OfferExamineDetails)