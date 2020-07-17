/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-17 13:10:26
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-17 13:53:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getImage } from '@assets/cdn'

import './index.scss'

const image = getImage('mock.png')

class SupervisionDetails extends Component {

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
    return (
      <SafeAreaView
        title='招标监理'
        back
      >
        <View className='page-wrapper'>
          <View className='card-wrapper'>
            <View className='card-main'>
              <View className='card-msg-left flex'>
                <View className='image'>
                  <Image className='image' src='https://luwu.oss-cn-beijing.aliyuncs.com/luwu-mp/image/index/freeEvent/mock1.png'></Image>
                </View>
                <View className='user-name'>名字</View>
                <View className='title'>审核经理</View>
              </View>
              <View className='card-msg-right flex'>
                <View className='form-item'>
                  <View className='dot'></View>
                  <View>从事家装行业11年，深知装修行业的坑点</View>
                </View>
                <View className='form-item'>
                  <View className='dot'></View>
                  <View>从事家装行业11年，深知装修行业的坑点</View>
                </View>
                <View className='form-item'>
                  <View className='dot'></View>
                  <View>从事家装行业11年，深知装修行业的坑点</View>
                </View>
                <View className='form-item'>
                  <View className='dot'></View>
                  <View>从事家装行业11年，深知装修行业的坑点</View>
                </View>
              </View>
            </View>
          </View>
          <View className='main-wrapper'>
            <View className='history-box'>
              <View className='title-wrapper'>
                <View className='line'></View>
                <View className='title'>过往项目案例</View>
              </View>
              <View className='history-main'>
                <Image className='image-max' src={image}></Image>
                <View className='image-middle-box'>
                  <Image className='image-middle' src={image}></Image>
                  <Image className='image-middle' src={image}></Image>
                </View>
                <View className='image-min-box'>
                  <Image className='image-min' src={image}></Image>
                  <Image className='image-min' src={image}></Image>
                </View>
              </View>
            </View>
            <View className='phone'>咨询电话：11111111111</View>
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
export default connect(mapStateToProps)(SupervisionDetails)