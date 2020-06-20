/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-18 19:38:34
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 22:13:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Block
} from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import {} from '@services/modules'
import SaveAreaView from '@components/SafeAreaView'
import {
  companyData,
  tableDataM
} from '../../mock/table'
import './index.scss'
import mock from '../../mock/table.json'

class TableContrast extends Component {

  constructor(props) {
    super(props)
    this.state = {
      companyTableList: companyData,
      tableData: [],
      hiddenRemark: true,
      hiddenIdentical: false
      // projectAreaList: [],
    }
    this.offsetTop = 99999
    this.mockData = []
  }

  componentDidMount() {
    this.handleMockData()
    this.getTableOffset()
  }
  getTableOffset() { 
    Taro.createSelectorQuery()
      .selectAll('.house-msg-wrapper')
      .boundingClientRect()
      .exec(res => {
        this.offsetTop = res[0][0].height
      })
  }
  handleMockData() { 
    tableDataM(mock)
    const projectAreaList = mock.map((item, index) => {
      if (item.projectArea) {
        return {
          projectArea: item.projectArea,
          index
        }
      }
    }).filter(item => !!item)
    let data = []
    for (let i = 0; i < projectAreaList.length; i++) {
      let arr = []
      mock.forEach((item, index) => {
        if (item.projectArea && item.projectArea === projectAreaList[i].projectArea) {
          arr = mock.slice(index + 1, projectAreaList[i + 1] ? projectAreaList[i + 1].index - 1 : -1)
        }
      })
      data.push({
        projectArea: projectAreaList[i].projectArea,
        data: arr
      })
    }
    console.log(data)
    this.mockData = [...data]
    this.setState({
      tableData: data,
      // projectAreaList: projectAreaList
    })
  }
  
  toggleHiddenRemark() { 
    const { hiddenRemark } = this.state
    this.setState({
      hiddenRemark: !hiddenRemark
    })
  }
  toggleHiddenIdentical() {
    const { hiddenIdentical } = this.state
    this.setState({
      hiddenIdentical: !hiddenIdentical
    })
  }
  hiddenCompany(index) { 
    console.log('index', index)
    let { companyTableList, tableData } = this.state
    companyTableList.splice(index, 1)
    tableData.forEach(item => {
      item.data.forEach(ite => {
        ite.priceList.splice(index, 1)
        ite.areaList.splice(index, 1)
        ite.remarkList.splice(index, 1)
      })
    })
    this.setState({
      companyTableList,
      tableData
    })
    
  }
  showAllData() { 
    this.setState({
      tableData: this.mockData
    }, () => {
        console.log('1111', 1111)
        this.forceUpdate()
    })
  }
  config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  render() {
    const {
      companyTableList,
      hiddenRemark,
      tableData,
      // projectAreaList
      hiddenIdentical
    } = this.state
    // 左边数量要不要展示下边框   不展示工艺说明就有下边框
    const leftItemChildClassName = classNames('item-child item-child-90', {
      'border-bottom': !hiddenRemark
    })
    // 右边数量要不要展示下边框   不展示工艺说明就有下边框
    const rightItemChildClassName = classNames('right-col-span-item-child item-child-90 area-background', {
      'border-bottom': !hiddenRemark
    })
    const companyListRender = companyTableList.map((item, index) => {
      const key = item.companyId
      return (
        <View
          className='head-background left-table-item-90 width196 border-top'
          key={key}
        >
          <View className='company-title padding-top10'>{item.companyName}</View>
          <View className='company-handle' onClick={this.hiddenCompany.bind(this, index)}>隐藏</View>
        </View>
      )
    })
    const companyTotalPriceListRender = companyTableList.map(item => {
      const key = item.companyId
      return (
        <View
          className='left-table-item-90 align-canter font26 width196'
          key={key}
        >
          <Text className='company-title'>{item.totalPrice}</Text>
        </View>
      )
    })
    const headTitleClassName = classNames('table-item-title', {
      'shengluehao': hiddenRemark
    })
    const projectAreaListArea = tableData.map(item => {
      const key = item.projectArea
      let data = item.data
      if (hiddenIdentical) {
        data = item.data.filter(ite => ite.hide)
        console.log('data', data)
      }
      const headListRender = data.map(ite => {
        const ke = ite.projectName
        return (
          <View
            className='table-item-col-span head-background'
            key={ke}
          >
            <View className={headTitleClassName}>{ite.projectName}</View>
            <View className='table-item-right'>
              <View className='item-child border-bottom'>元</View>
              <View className={leftItemChildClassName}>数量</View>
              <View
                className='item-child table-item-bottom'
                style={{display: hiddenRemark ? 'none' : 'flex'}}
              >工艺说明</View>
            </View>
          </View>
        )
      })
      return (
        <Block key={key}>
          <View className='area'>{item.projectArea}</View>
          {/* <View className='area'></View> */}
          {
            headListRender
          }
        </Block>
      )
    })
    const projectListRender = tableData.map(item => {
      const key = item.projectArea
      let data = item.data
      if (hiddenIdentical) {
        data = item.data.filter(ite => ite.hide)
      }
      const list = data.map(ite => {
        const ke = ite.projectName
        const sonItem = ite && ite.priceList && ite.priceList.map((it, index) => {
          const k = it
          return (
            <View className='right-col-span' key={k}>
              <View className='right-col-span-item-child border-bottom price-background'>{it || '-'}</View>
              <View className={rightItemChildClassName}>{ite.areaList[index] || '-'}</View>
              <View
                className='right-col-span-item-child table-item-bottom remark-font'
                style={{display: hiddenRemark ? 'none' : 'flex'}}
              >
                <View className='remark'>
                  {ite.remark || '-'}
                </View>
              </View>
            </View>
          )
        })
        return (
          <View
            className='company-list-wrapper'
            key={ke}
          >
            {
              sonItem
            }
          </View>
        )
      })
      return (
        <Block key={key}>
          <View className='area-static'></View>
          {
            list
          }
        </Block>
      )
    })
    return (
      <SaveAreaView
        title='TA家的比价'
        back
      >
        <View className='page-wrapper'>
          <View className='house-msg-wrapper'>
            <View className='msg-tips'>
              <Text className='text'>昌平区</Text>
              <Text className='msg-tips-line'></Text>
              <Text className='text'>张先生</Text>
              <Text className='msg-tips-line'></Text>
              <Text className='text'>48㎡</Text>
              <Text className='msg-tips-line'></Text>
              <Text className='text'>一室一厅</Text>
              <Text className='msg-tips-line'></Text>
              <Text className='text'>新房</Text>
            </View>
            <View className='handle-wrapper'>
              <View
                className='options-wrapper'
                onClick={this.toggleHiddenIdentical.bind(this)}
              >
                <View className={classNames('circular', {
                  'circular-active': hiddenIdentical
                })}
                ></View>
                <View className='options-label'>隐藏相同项</View>
              </View>
              <View
                className='options-wrapper'
                onClick={this.toggleHiddenRemark.bind()}
              >
                <View className={classNames('circular', {
                  'circular-active': !hiddenRemark
                  })}
                ></View>
                <View className='options-label'>显示工艺说明</View>
              </View>
            </View>
          </View>
          <View className='table-wrapper'>
            <View className='table-left'>
              <View className='left-table-item-90 head-background'>
                <View className='company-title padding-top10'>公 司</View>
                <View className='company-handle' onClick={this.showAllData.bind(this)}>全部展开</View>
              </View>
              <View className='head-background left-table-item-90 align-canter'>
                <Text className='company-title'>总价 (元)</Text>
              </View>
              {
                projectAreaListArea
              }
            </View>
            <View className='table-right'>
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
              {
                projectListRender
              }
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