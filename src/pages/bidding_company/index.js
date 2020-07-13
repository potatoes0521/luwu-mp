/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-06 11:59:55
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 15:04:49
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { getBiddingTemplate } from '@/services/modules/bidding'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getStorage } from '@utils/storage'
import ListItem from './components/ListItem'

import './index.scss'

class BiddingCompany extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      shopList: [],
      userId: '',
      selectContrastList: [],
      showSelectContrastModal: false
    }
    this.selectContrastList = []
    this.pageParams = {}
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.handleRequestData()
  }
  /**
   * 请求公司数据
   * @return void
   */
  handleRequestData() { 
    this.setState({
      userId: this.pageParams.userId
    })
    getStorage(`bid_list_${this.pageParams.requireId}`).then(res => {
      const data = res.map(item => {
        return {...item, selectContrast: false, selectCollection: false}
      })
      this.setState({
        shopList: data
      })
    })
  }
  /**
   * 处理选中要对比的公司
   * @param {Object} shopMsg 参数描述
   * @return void
   */
  handleContrast(shopMsg) {
    let { shopList, selectContrastList } = this.state
    this.getShopOfferPrice(shopMsg)
    shopList.forEach(item => {
      if (shopMsg.shopId === item.shopId) {
        item.selectContrast = true
      }
    })
    selectContrastList.push(shopMsg)
    this.selectContrastList.push(shopMsg)
    this.setState({
      shopList,
      selectContrastList
    })
  }
  getShopOfferPrice({ shopId }) { 
    getBiddingTemplate({ shopId }).then(res => {
      this.selectContrastList.forEach(item => {
        if (shopId === item.shopId) {
          item.templateData = res
        }
      })
    })
  }
  handleShowSelectModal() { 
    const {
      selectContrastList,
      showSelectContrastModal
    } = this.state
    if (!selectContrastList.length || showSelectContrastModal) return
    this.setState({
      showSelectContrastModal: true
    })
  }
  handleCloseModal() { 
    this.setState({
      showSelectContrastModal: false
    })
  }
  handleDelete(item) { 
    const { selectContrastList } = this.state
    const data = selectContrastList.filter(ite => ite.shopId !== item.shopId)
    this.selectContrastList = this.selectContrastList.filter(ite => ite.shopId !== item.shopId)
    this.setState({
      selectContrastList: data
    })
  }
  stopPropagation(e) {
    e.stopPropagation()
  }
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    const {
      userId,
      shopList,
      selectContrastList,
      showSelectContrastModal
    } = this.state
    console.log('shopList', shopList)
    const shopListRender = shopList.map((item, index) => {
      const key = item.shopId
      return (
        <ListItem
          key={key}
          {...item}
          userId={userId}
          index={index}
          onSelectContrast={this.handleContrast.bind(this)}
        />
      )
    })
    return (
      <SafeAreaView
        title='选择对比装修公司'
        back
      >
        <View className='page-wrapper'>
          {
            shopListRender
          }
          <View className='bottom-select-wrapper'>
            {
              showSelectContrastModal && selectContrastList.length && (
                <View className='modal-select-wrapper'>
                  <View
                    className='modal-bg'
                    onClick={this.handleCloseModal.bind(this)}
                    onTouchMove={this.stopPropagation.bind(this)}
                  ></View>
                  <View className='select-list-wrapper'>
                    {
                      selectContrastList.map(item => {
                        const key = item.shopId
                        return (
                          <View key={key} className='select-list-item'>
                            <Text className='shop-name'>{item.shopName}</Text>
                            <Text
                              className='shop-delete'
                              onClick={this.handleDelete.bind(this, item)}
                            >删除</Text>
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
              )
            }
            <View className='select-num-wrapper' onClick={this.handleShowSelectModal.bind(this)}>
              {
                selectContrastList && selectContrastList.length ? (
                  <Block>
                    <Text>选中</Text>
                    <Text className='heigh-light'>{selectContrastList.length}</Text>
                    <Text>家</Text>
                  </Block>
                ) : (
                  <Text className='select-num-no'>您还未选择</Text>
                )
              }
            </View>
            <View className='select-btn'>开始对比</View>
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
export default connect(mapStateToProps)(BiddingCompany)