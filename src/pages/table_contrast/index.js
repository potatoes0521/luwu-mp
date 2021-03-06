/*
 * @Author: liuYang
 * @description: 比价表格
 *  定义N多个公司按照N多个公司数据渲染 为了提高渲染效率
 * @path: 引入路径
 * @Date: 2020-06-18 19:38:34
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 13:36:13
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
  handleProjectArea,
  handleCompanyData,
  handleAllDataMaxData
} from './utils/table'
  
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
      shopListLength: -1,
    }
    this.mockData = []
    this.pageParams = {}
    this.templateData = []
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
    this.templateData = handleTemplateData(offerCase, activeTemplate)
    this.handleMockData({
      templateData: this.templateData
    })
  }
  /**
   * 处理模拟数据源
   * @return void
   */
  async handleMockData({
    showAll = false,
    templateData = this.templateData,
  }) {
    const shopList = await getStorage(`bidding_shop_price_${this.pageParams.requireId}`)
    const companyTableList = shopList.map(item => ({
      shopId: item.shopId,
      shopName: item.shopName
    }))
    this.setState({
      companyTableList,
      shopListLength: shopList.length
    })
    let projectAreaList = []
    // 如果是展示相同项  数据没有必要再处理一次
    if (!showAll) {
      // 取出来工艺列表
      projectAreaList = handleProjectArea(templateData)
      this.setState({
        projectAreaList
      })
    } else {
      projectAreaList = this.state.projectAreaList
    }
    // 处理每个公司的数据
    let createCompanyStateData = handleCompanyData(templateData, shopList, this.state)
    this.setState(createCompanyStateData)
    this.handleMaxData(createCompanyStateData, projectAreaList)
  }
  /**
   * 处理公司数据里的最大值/最小值/增漏项
   * @param {Object} companyData 要处理的公司的数据
   * @param {Array} projectAreaList 工艺
   * @return void
   */
  handleMaxData(companyData, projectAreaList = this.state.projectAreaList) {
    const data = handleAllDataMaxData(companyData, projectAreaList)
    this.setState({
      ...data.companyData,
      projectAreaList: data.projectAreaList
    })
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
  
  /**
   * 隐藏一个公司
   * @param {Number} index 要隐藏的下标
   * @param {Sting} companyId 公司Id
   * @return void
   */
  hiddenCompany(index, companyId) {
    let { companyTableList } = this.state
    companyTableList.splice(index, 1)
    let state = {
      companyTableList,
    }
    for (const key in this.state) {
      if (key.indexOf('companyData') !== -1 && this.state[key] && this.state[key].companyId === companyId) {
        state[key] = null
      }
    }
    this.setState(state, () => {
      const data = this.getNowHasDataState()
      this.handleMaxData(data, handleProjectArea(this.templateData))
    })
  }
  /**
   * 获取现在有数据的state里的companyDataX
   * @return void
   */
  getNowHasDataState() { 
    let data = {}
    for (const key in this.state) {
      if (key.indexOf('companyData') !== -1 && this.state[key]) {
        data[key] = this.state[key]
      }
    }
    return data
  }
  /**
   * 展示全部公司
   * @return void
   */
  showAllData() { 
    this.handleMockData({ showAll: true })
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
      shopListLength
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
        back
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
              <View className='border-bottom head-background company-title-all'>
                <View className='company-title padding-top10'>公 司</View>
                {
                  shopListLength !== companyTableList.length && (
                    <View className='company-handle' onClick={this.showAllData.bind(this)}>全部展开</View>
                  )
                }
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
              <View className='company-list-wrapper'>
                {
                  companyTotalPriceListRender
                }
              </View>
              <TableMain
                {...this.state}
              />
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