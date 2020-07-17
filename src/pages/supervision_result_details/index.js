/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-17 13:57:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-17 15:16:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {} from '@services/modules/index'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import SwitchBtn from '@components/Switch'
  
import './index.scss'

class SupervisionResultDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hideQualified: false
    }
  }

  async componentDidMount() {
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
  }
  onSwitchChange(type) { 
    this.setState({
      hideQualified: type
    })
  }
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    const { hideQualified } = this.state
    const { system } = this.props
    console.log('system', system)
    const navHeight = system && system.navHeight || 120
    console.log('navHeight', navHeight)
    return (
      <SafeAreaView
        title='审核详情'
        back
      >
        <View
          className='page-wrapper'
          style={{
            height: `calc(100vh - ${navHeight}rpx)`
          }}
        >
          <View className='table-head-wrapper'>
            <View className='title-wrapper'>
              <View className='title-left'>
                <View className='line'></View>
                <Text>北京春秋装饰</Text>
              </View>
              <View className='right-wrapper'>
                <SwitchBtn checked={hideQualified} onSwitchChange={this.onSwitchChange.bind(this)} />
                <View className='text'>隐藏合格项</View>
              </View>
            </View>
            <View className='table-row'>
              <View className='table-name-item table-item-public'>项目名称</View>
              <View className='table-item table-item-public'>单价</View>
              <View className='table-item table-item-public'>单位</View>
              <View className='table-num-item table-item-public'>工程量</View>
              <View className='table-total-item table-item-public'>合计</View>
            </View> 
          </View>
          <View className='table-main'>
            <View className='table-title'>一、客餐厅</View>
            <Block>
              <View className='table-row'>
                <View className='table-name-item table-item-public'>铲墙顶亲水腻子</View>
                <View className='table-item table-item-public'>8</View>
                <View className='table-item table-item-public'>㎡</View>
                <View className='table-num-item table-item-public'>79</View>
                <View className='table-total-item table-item-public'>123456</View>
              </View> 
              <View className='table-remark-public'>
                <View className='table-remark-left'>
                  <View>工艺</View>
                  <View>说明</View>
                </View>
                <View className='table-remark-content'>墙面铲除人工费，如原墙面为普通腻子将原始腻子铲除。如原始墙面为耐水腻子，仅铲除原漆面层</View>
              </View>
              <View className='table-remark-public warning'>
                <View className='table-remark-left'>
                  <View>审核</View>
                  <View>建议</View>
                </View>
                <View className='table-remark-content'>墙面铲除人工费，如原墙面为普通腻子将原始腻子铲除。如原始墙面为耐水腻子，仅铲除原漆面层</View>
              </View>
            </Block>
            <Block>
              <View className='table-row'>
                <View className='table-name-item table-item-public'>墙面石膏找平</View>
                <View className='table-item table-item-public'>8</View>
                <View className='table-item table-item-public'>㎡</View>
                <View className='table-num-item table-item-public'>79</View>
                <View className='table-total-item table-item-public'>123456</View>
              </View> 
              <View className='table-remark-public'>
                <View className='table-remark-left'>
                  <View>工艺</View>
                  <View>说明</View>
                </View>
                <View className='table-remark-content'>
                  1. 顶面、墙面的阴角区域弹线找顺直，苏皖专用石膏填充电路改造的墙面沟槽
                  2. 整体对露出基层的墙面，顶面进行找顺平处理，阴角区域要求与事先弹线一致
                  3. 门窗洞口减半计算
                </View>
              </View>
              <View className='table-remark-public warning'>
                <View className='table-remark-left'>
                  <View>审核</View>
                  <View>建议</View>
                </View>
                <View className='table-remark-content'>
                  1. 石膏专用品牌也有辅料名称， 须注明， 避免后期出现问题
                  2. 阴阳角找直， 用拐角尺检验阴阳角找直后的90度误差， 要求误差在3mm以内
                  3. 石膏找平后用2cm靠尺检验墙面找平后平整误差， 要求误差在3mm以内
                </View>
              </View>
            </Block>
            <View className='table-total'>
              <View className='table-total-title'>增项漏项</View>
              <View className=''>
                1. 墙顶面刷漆未报价，后期产生增项（一般刷漆人工费5-10元/平米）
                2. 地面找平处理，建议地面做地固处理，请知晓
              </View>
            </View>
            <View className='table-total-price'>小计：xxxxxx元</View>
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
export default connect(mapStateToProps)(SupervisionResultDetails)