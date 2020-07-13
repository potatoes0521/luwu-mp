/*
 * @Author: liuYang
 * @description: 比价表格
 *  定义N多个公司按照N多个公司数据渲染 为了提高渲染效率
 * @path: 引入路径
 * @Date: 2020-06-18 19:38:34
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 16:31:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getOfferCase } from '@services/modules/bidding'
import SaveAreaView from '@components/SafeAreaView'
import { getImage } from '@assets/cdn'
import { getStorage } from '@utils/storage'
import HouseMsg from './components/HouseMsg'
import TableLeftHead from './components/TableLeftHead'
import TableMain from './components/TableMain'

import {
  handleTemplateData,
  handleTemplatePrice
} from '../../mock/table'
  
import './index.scss'

class TableContrast extends Component {

  constructor(props) {
    super(props)
    this.state = {
      companyTableList: [],
      hiddenRemark: true,
      hiddenIdentical: false,
      projectAreaList: [],
      // isShare: false,
      companyData0: null,
      companyData1: null,
      companyData2: null,
      companyData3: null,
      companyData4: null,
      companyData5: null,
      companyData6: null,
      companyData7: null,
      companyData8: null,
      companyData9: null,
      companyData10: null,
      companyData11: null,
      companyData12: null,
      companyData13: null,
      companyData14: null,
    }
    this.mockData = []
    this.pageParams = {}
  }

  componentDidMount() {
    this.pageParams = this.$router.params
    // this.setState({
    //   isShare: params && params.shareType === '1'
    // })
    this.handleGetStorageData(this.pageParams)
  }
  async handleGetStorageData(params) {
    const activeTemplate = await getStorage(`active_template_${params.requireId}`)
    const offerCase = await getOfferCase({})
    const templateData = handleTemplateData(offerCase, activeTemplate)
    this.handleMockData({ templateData })
  }
  /**
   * 处理模拟数据源
   * @return void
   */
  async handleMockData({
    showAll = false,
    templateData,
  }) {
    const shopList = await getStorage(`bidding_shop_price_${this.pageParams.requireId}`)
    const companyData = shopList.map(item => ({
      shopId: item.shopId,
      shopName: item.shopName
    }))
    this.setState({
      companyTableList: companyData,
    })
    if (!showAll) {
      // 取出来工艺列表
      const handleData = templateData.data.data
      const projectAreaList = handleData.map((item, index) => {
        return {
          projectAreaList: item.projectList.map(ite => {
            return {
              projectName: ite.projectName,
              unit: ite.units
            }
          }),
          projectArea: item.spaceName,
          projectAreaId: item.spaceId,
          index
        }
      }).filter(item => !!item)
      this.setState({
        projectAreaList: projectAreaList
      })
    }
    // 处理每个公司的数据
    let createCompanyStateData = {}
    for (let i = 0; i < companyData.length; i++) {
      // 如果是二次渲染全部  并且  数值不是null 
      if (showAll && createCompanyStateData[`companyData${i}`]) {
        break
      }
      const data = handleTemplatePrice(templateData.deepArr, shopList[i].templateData)
      createCompanyStateData[`companyData${i}`] = {
        data,
        companyId: companyData[i].companyId,
      }
    }
    this.setState(createCompanyStateData)
  }
  /**
   * 处理切换显示工艺说明
   * @return void
   */
  toggleHiddenRemark() {
    const { hiddenRemark } = this.state
    this.setState({
      hiddenRemark: !hiddenRemark
    })
  }
  /**
   * 处理隐藏相同项
   * @return void
   */
  toggleHiddenIdentical() {
    const { hiddenIdentical } = this.state
    this.setState({
      hiddenIdentical: !hiddenIdentical
    })
  }
  
  hiddenCompany(index, companyId) {
    let { companyTableList } = this.state
    companyTableList.splice(index, 1)
    let state = {
      companyTableList,
    }
    for (const key in this.state) {
      if (key.indexOf('companyData') !== -1 && this.state[key] && this.state[key].companyId === +companyId) {
        state[key] = null
      }
    }
    this.setState(state)
  }

  showAllData() { 
    this.handleMockData({
      showAll: true
    })
  }
  /**
   * 页面内转发
   * @param {Object} res 微信返回参数
   * @return void
   */
  onShareAppMessage() {
    const { userInfo } = this.props
    return {
      title: `录屋,和监理一起开启装修之旅吧`,
      path: `/pages/index/index?shareType=1&userId=${userInfo.userId}`,
      imageUrl: getImage('share/share_table_contrast.png')
    }
  }
  config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  render() {
    const {
      companyTableList,
      hiddenRemark,
      projectAreaList,
      hiddenIdentical,
      // isShare
    } = this.state
    // 公司列表
    const companyListRender = companyTableList.map((item, index) => {
      const key = item.shopId
      return (
        <View
          key={key}
          className='head-background left-table-item-90 width196 border-right border-bottom'
        >
          <View className='company-title padding-top10'>{item.shopName}</View>
          <View className='company-handle' onClick={this.hiddenCompany.bind(this, index, key)}>隐藏</View>
        </View>
      )
    })
    // 总价列表
    const companyTotalPriceListRender = companyTableList.map(item => {
      const key = item.shopId
      return (
        <View
          className='left-table-item-90 border-right font26 width196'
          key={key}
        >{item.totalPrice}</View>
      )
    })
    // 所有工艺项的列表
    const projectAreaListArea = projectAreaList.map(item => {
      const key = item.index
      return (
        <TableLeftHead
          key={key}
          item={item}
          hiddenRemark={hiddenRemark}
          hiddenIdentical={hiddenIdentical}
        />
      )
    })
    
    return (
      <SaveAreaView
        title='TA家的比价'
        // back={!isShare}
      >
        <View className='page-wrapper'>
          <HouseMsg
            hiddenRemark={hiddenRemark}
            hiddenIdentical={hiddenIdentical}
            onClickRemarkBtn={this.toggleHiddenRemark.bind(this)}
            onClickIdenticalBtn={this.toggleHiddenIdentical.bind(this)}
          />
          <View className='table-wrapper'>
            <View className='table-left border-bottom border-right'>
              <View className='border-bottom left-table-item-90 head-background'>
                <View className='company-title padding-top10'>公 司</View>
                <View className='company-handle' onClick={this.showAllData.bind(this)}>全部展开</View>
              </View>
              <View className='head-background left-table-item-90'>总价 (元)</View>
              <View className='head-list-wrapper'>
                {
                  projectAreaListArea
                }
              </View>
            </View>
            <View className='table-right border-bottom' >
              <View className='company-list-wrapper'>
                {
                  companyListRender
                }
              </View>
              <View className='company-list-wrapper' >
                {
                  companyTotalPriceListRender
                }
              </View>
              <View className='company-list-wrapper'>
                <TableMain
                  {...this.state}
                />
              </View>
            </View>
          </View>
        </View>
      </SaveAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo,
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(TableContrast)