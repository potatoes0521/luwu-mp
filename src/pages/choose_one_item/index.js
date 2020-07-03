/*
 * @Author: liuYang
 * @description: 选择类别
 * @path: 引入路径
 * @Date: 2020-06-18 18:18:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 18:44:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SaveAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getStorage } from '@utils/storage'
import ListItem from '@/components_choose/ListItem'
import { moneyData, timeData } from '@config/chooseOneState'

import './index.scss'

class ChooseCategory extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      title: '录屋',
      data: [],
      selectData: {},
      valueKey: '',
      valueKeyId: ''
    }
    this.pageParams = {}
  }

  componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && Login.login()
    this.handleInitPageData()
  }
  handleInitPageData() { 
    let state = {}
    const { chooseType, pageType} = this.pageParams
    if (chooseType === 'time') {
      state.title = '装修时间'
      state.valueKey = 'timeText'
      state.valueKeyId = 'timeId'
      state.data = timeData
      if (pageType === 'edit') {
        getStorage('choose_timer').then(res => {
          this.setState({
            selectData: res
          })
        })
      }
    } else {
      state.title = '装修预算'
      state.valueKey = 'moneyText'
      state.valueKeyId = 'moneyId'
      state.data = moneyData
      if (pageType === 'edit') {
        getStorage('choose_budget').then(res => {
          this.setState({
            selectData: res
          })
        })
      }
    }
    this.setState(state)
  }
  chooseItem(item) { 
    this.setState({
      selectData: item
    }, () => {
        const { chooseType } = this.pageParams
        let data = {}
        if (chooseType === 'time') { 
          data.startTime = item
        } else {
          data.budget = item
        }
        this.handlePrePageData(data)
    })
  }
  /**
   * 处理上一页数据并返回
   * @return void
   */
  handlePrePageData(data) { 
    let pages = Taro.getCurrentPages() //  获取页面栈
    let prevPage = pages[pages.length - 2] // 上一个页面
    if (!prevPage) {
      return
    }
    prevPage.$component.setState(data, () => {
      Taro.navigateBack()
    })
  }

  config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  render() {
    const {
      title,
      data,
      selectData,
      valueKey,
      valueKeyId
    } = this.state
    const {system} = this.props
    const navHeight = system && system.navHeight || 120
    const listRender = data.map(item => {
      const key = item[valueKeyId]
      const active = key === selectData[valueKeyId]
      return (
        <ListItem
          key={key}
          item={item}
          borderRight
          active={active}
          valueKey={valueKey}
          onClickItem={this.chooseItem.bind(this)}
        />
      )
    })
   
    return (
      <SaveAreaView
        title={title}
        back
      >
        <View
          style={{
            height: `calc(100vh - ${navHeight}rpx)`
          }}
          className='page-wrapper'
        >
          <View className='main-wrapper'>
            <View className='child-list-wrapper'>
              {
                listRender
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
export default connect(mapStateToProps)(ChooseCategory)
