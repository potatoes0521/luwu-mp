/*
 * @Author: liuYang
 * @description: 选择类别
 * @path: 引入路径
 * @Date: 2020-06-18 18:18:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 11:59:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import { getCategory } from '@services/modules/category'
import SaveAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getStorage } from '@utils/storage'
import ListItem from '@/components_choose/ListItem'
import './index.scss'

class ChooseCategory extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      mainCategoriesList: [], // 主品类
      childCategoriesList: [], // 子品类
      selectMainCategoriesData: {}, // 选中的品类
      selectChildCategoriesData: {}, // 选中的子品类
    }
    this.AllChildCategoriesList = [] // 全部子品类数据
    this.pageParams = {}
  }

  componentDidMount() {
    this.getAllCategoryData()
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && Login.login()
  }
  /**
   * 获取全部品类数据
   * @return void
   */
  getAllCategoryData() { 
    getCategory(this).then(res => {
      if (!res || res.length < 1) return
      const mainCategoriesList = res.filter(item => item.categoryLevel === 1)
      const childCategoriesList = res.filter(item => item.categoryLevel === 2)
      this.AllChildCategoriesList = childCategoriesList
      this.setState({
        mainCategoriesList
      }, () => {
        this.pageParams.pageType === 'edit' && this.handleEdit()
      })
    })
  }
  /**
   * 如果是编辑来处理编辑
   * @return void
   */
  handleEdit() { 
    getStorage('choose_category').then(res => {
      this.setState({
        selectMainCategoriesData: res.selectMainCategoriesData, // 选中的品类
        selectChildCategoriesData: res.selectChildCategoriesData, // 选中的子品类
      }, () => {
          this.chooseMainCategories(res.selectMainCategoriesData, true)
      })
    })
  }
  /**
   * 选择主品类
   * @param {Object} city 选中的主品类
   * @param {Boolean} autoSelectNext 自动选择下一个 Level
   * @return void
   */
  chooseMainCategories(item, autoSelectNext) {
    const { selectMainCategoriesData, selectChildCategoriesData } = this.state
    if (!autoSelectNext && item.categoryId === selectMainCategoriesData.categoryId) {
      return
    }
    let childCategoriesList = this.AllChildCategoriesList.filter(child => child.parentId === item.categoryId)
    let data = {
      childCategoriesList,
    }
    // autoSelectNext 为true是编辑数据  自动选择下一项  故而不清除选中项
    if (!autoSelectNext) {
      data.selectMainCategoriesData = item
      data.selectChildCategoriesData = {}
    }
    this.setState(data, () => {
      if (autoSelectNext) {
        this.chooseChildCategories(selectChildCategoriesData, autoSelectNext)
      }
    });
  }
  /**
   * 选择子品类
   * @param {Object} city 选中的城市
   * @param {Boolean} autoSelectNext 自动选择下一个 Level
   * @return void
   */
  chooseChildCategories(item, autoSelectNext) {
    const { selectChildCategoriesData } = this.state
    if (!autoSelectNext && item.categoryId === selectChildCategoriesData.categoryId) {
      return
    }
    let data = {}
    // autoSelectNext 为true是编辑数据 故而不清除选中项
    if (!autoSelectNext) {
      data.selectChildCategoriesData = item
    }
    this.setState(data, () => {
      !autoSelectNext && this.handlePrePageData()
    });
  }
  /**
   * 处理上一页数据并返回
   * @return void
   */
  handlePrePageData() { 
    let pages = Taro.getCurrentPages() //  获取页面栈
    let prevPage = pages[pages.length - 2] // 上一个页面
    if (!prevPage) {
      return
    }
    const {
      selectMainCategoriesData, // 选中的品类
      selectChildCategoriesData, // 选中的子品类
    } = this.state
    prevPage.$component.setState({
      mainCategory: selectMainCategoriesData,
      childCategory: selectChildCategoriesData,
      priceUnit: selectChildCategoriesData.unit,
      brand: {}
    }, () => {
      Taro.navigateBack()
    })
  }

  config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  render() {
    const {
      mainCategoriesList,
      childCategoriesList,
      selectMainCategoriesData, // 选中的品类
      selectChildCategoriesData, // 选中的子品类
    } = this.state
    const {system} = this.props
    const navHeight = system && system.navHeight || 120
    const mainCategoriesRender = mainCategoriesList.map(item => {
      const key = item.categoryId
      const active = key === selectMainCategoriesData.categoryId
      return (
        <ListItem
          key={key}
          item={item}
          valueKey='categoryName'
          borderRight
          active={active}
          onClickItem={this.chooseMainCategories.bind(this)}
        />
      )
    })
    const childCategoriesRender = childCategoriesList.map(item => {
      const key = item.categoryId
      const active = key === selectChildCategoriesData.categoryId
      return (
        <ListItem
          key={key}
          valueKey='categoryName'
          item={item}
          active={active}
          onClickItem={this.chooseChildCategories.bind(this)}
        />
      )
    })
   
    return (
      <SaveAreaView
        title='选择品类'
        back
      >
        <View
          style={{
            height: `calc(100vh - ${navHeight}rpx)`
          }}
          className='page-wrapper'
        >
          <View className='fixed-nav'>
            <View className='fixed-nav-text'>主品类</View>
            <View className='fixed-nav-text'>子品类</View>
          </View>
          <View className='main-wrapper'>
            <View className='child-list-wrapper'>
              {
                mainCategoriesRender
              }
            </View>
            <View className='child-list-wrapper'>
              {
                childCategoriesRender
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
