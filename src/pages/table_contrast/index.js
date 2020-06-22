/*
 * @Author: liuYang
 * @description: 比价表格
 *  定义N多个公司按照N多个公司数据渲染 为了提高渲染效率
 * @path: 引入路径
 * @Date: 2020-06-18 19:38:34
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-22 15:07:28
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import {} from '@services/modules'
import SaveAreaView from '@components/SafeAreaView'
import HouseMsg from './components/HouseMsg'
import TableLeftHead from './components/TableLeftHead'
import TableMain from './components/TableMain'

import {
  companyData,
  handleNewData
} from '../../mock/table'
import newMock from '../../mock/table_new.json'

import './index.scss'

class TableContrast extends Component {

  constructor(props) {
    super(props)
    this.state = {
      companyTableList: [...companyData],
      hiddenRemark: true,
      hiddenIdentical: false,
      projectAreaList: [],
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
    }
    this.mockData = []
  }

  componentDidMount() {
    this.handleMockData()
  }
  /**
   * 处理模拟数据源
   * @return void
   */
  handleMockData(showAll) {
    const handleEndMockData = handleNewData(newMock)
    if (showAll) { // 如果是二次显示  没必要处理一下施工区域
      this.setState({
        companyTableList: [...companyData],
      })
    } else {
      // 取出来工艺列表
      const handleData = handleEndMockData.data
      const projectAreaList = handleData.map((item, index) => {
        return {
          projectAreaList: item.items.map(ite => {
            return {
              projectName: ite.projectName,
              projectId: ite.projectId,
              special: ite.special,
              unit: ite.unit
            }
          }),
          projectArea: item.projectArea,
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
      const data = handleEndMockData.deepArr.map(item => {
        return {
          projectId: item.projectId,
          projectName: item.projectName,
          remark: item.remark,
          price: item.shops[i][0] || '-',
          num: item.shops[i][1] || '-',
          totalPrice: item.shops[i][2] || '-',
          special: item.special
        }
      })
      createCompanyStateData[`companyData${i}`] = data
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
  
  hiddenCompany(index) {
    let { companyTableList } = this.state
    companyTableList.splice(index, 1)
    const state = {
      companyTableList,
    }
    this.setState(state)
  }

  showAllData() { 
    console.log('click showAllData')
    this.handleMockData(true)
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
      hiddenIdentical
    } = this.state
    // 公司列表
    const companyListRender = companyTableList.map((item, index) => {
      const key = item.companyId
      return (
        <View
          className='head-background left-table-item-90 width196 border-right border-bottom'
          key={key}
        >
          <View className='company-title padding-top10'>{item.companyName}</View>
          <View className='company-handle' onClick={this.hiddenCompany.bind(this, index)}>隐藏</View>
        </View>
      )
    })
    // 总价列表
    const companyTotalPriceListRender = companyTableList.map(item => {
      const key = item.companyId
      return (
        <View
          className='left-table-item-90 border-right font26 width196'
          key={key}
        >
          <Text className='company-title'>{item.totalPrice}</Text>
        </View>
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
              <View className='border-bottom left-table-item-90 head-background'>
                <View className='company-title padding-top10'>公 司</View>
                <View className='company-handle' onClick={this.showAllData.bind(this)}>全部展开</View>
              </View>
              <View className='head-background left-table-item-90' >
                <Text className='company-title'>总价 (元)</Text>
              </View>
              {
                projectAreaListArea
              }
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