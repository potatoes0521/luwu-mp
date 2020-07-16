/*
 * @Author: liuYang
 * @description: 处理收藏和选择对比
 * @path: 引入路径
 * @Date: 2020-07-06 11:59:55
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 17:59:01
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
// import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import { getBiddingTemplate, getBidList } from '@services/modules/bidding'
import SafeAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { setStorage } from '@utils/storage'
import ListItem from './components/ListItem'
import Explain from './components/Explain'

import './index.scss'

class BiddingCompany extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      shopList: [],
      userId: '',
      selectContrastList: [],
      showSelectContrastModal: false,
      showSign: false
    }
    this.selectContrastList = []
    this.pageParams = {}
    this.shopId = ''
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
    getBidList({ requireId: this.pageParams.requireId }).then(res => {
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
    if (selectContrastList.length >= 15) {
      Taro.showToast({
        icon: 'none',
        title: '最多选择十五家进行对比哦~',
      })
      return
    }
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
  /**
   * 获取要比价的公司的数据
   * @param {Object} shopId 解构出来商铺ID
   * @return void
   */
  getShopOfferPrice({ shopId }) { 
    getBiddingTemplate({ shopId }).then(res => {
      this.selectContrastList.forEach(item => {
        if (shopId === item.shopId) {
          item.templateData = res
        }
      })
    })
  }
  /**
   * 处理打开选中项
   * @return void
   */
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
  /**
   * 处理关闭选中项
   * @return void
   */
  handleCloseModal() { 
    this.setState({
      showSelectContrastModal: false
    })
  }
  /**
   * 处理删除
   * @param {Object} item 点击删除的那一项
   * @return void
   */
  handleDelete(item) { 
    const {
      selectContrastList,
      shopList
    } = this.state
    const data = selectContrastList.filter(ite => ite.shopId !== item.shopId)
    this.selectContrastList = this.selectContrastList.filter(ite => ite.shopId !== item.shopId)
    shopList.forEach(ite => {
      if (item.shopId === ite.shopId) {
        ite.selectContrast = false
      }
    })
    this.setState({
      selectContrastList: data,
      shopList
    })
  }
  /**
   * 导航到去表格比价
   * @return void
   */
  navigatorToTable() { 
    const {
      selectContrastList,
      userId
    } = this.state
    if (!selectContrastList || !selectContrastList.length || selectContrastList.length < 2) {
      Taro.showToast({
        icon: 'none',
        title: '至少选择两家公司进行对比哦~',
      })
      return
    }
    // 选中的数据   顺便吧价格也放在里面了防止进去比价界面循环请求N多公司加载慢
    setStorage(`bidding_shop_price_${this.pageParams.requireId}`, this.selectContrastList)
    Taro.navigateTo({
      url: `/pages/table_contrast/index?requireId=${this.pageParams.requireId}&userId=${userId}`
    })
  }
  stopPropagation(e) {
    e.stopPropagation()
  }
  handleSignShow(shopId) {
    this.shopId = shopId
    this.setState({
      showSign: true
    })
  }
  handleSignClose() {
    this.setState({
      showSign: false
    })
  }
  handleExamine() { 
    console.log('this.shopId', this.shopId)
  }
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  render() {
    const {
      userId,
      shopList,
      showSign,
      selectContrastList,
      showSelectContrastModal
    } = this.state
    const shopListRender = shopList.map((item, index) => {
      const key = item.shopId
      return (
        <ListItem
          key={key}
          {...item}
          userId={userId}
          index={index}
          onClickSign={this.handleSignShow.bind(this)}
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
                              className='shop-delete iconfont iconhuaban'
                              onClick={this.handleDelete.bind(this, item)}
                            ></Text>
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
            <View className='select-btn' onClick={this.navigatorToTable.bind(this)}>开始对比</View>
          </View>
        </View>
        <Explain
          visit={showSign}
          onSubmit={this.handleExamine.bind(this)}
          onClose={this.handleSignClose.bind(this)}
        />
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