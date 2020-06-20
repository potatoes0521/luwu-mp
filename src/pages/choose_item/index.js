/*
 * @Author: liuYang
 * @description: 选择类别
 * @path: 引入路径
 * @Date: 2020-06-18 18:18:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-20 15:42:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getCategory, getBrandList } from '@services/modules/category'
import SaveAreaView from '@components/SafeAreaView'
import Login from '@utils/login'
import { getStorage } from '@utils/storage'
import ListItem from './components/ListItem'
import './index.scss'

class ChooseItem extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      mainCategoriesList: [], // 主品类
      childCategoriesList: [], // 子品类
      brandList: [], // 品牌
      selectMainCategoriesData: {}, // 选中的品类
      selectChildCategoriesData: {}, // 选中的子品类
      selectBrandData: {}
    }
    this.AllChildCategoriesList = [] // 全部子品类数据
    this.brandList = []
    this.pageParams = {}
  }

  componentDidMount() {
    this.getAllCategoryData()
    this.pageParams = this.$router.params
    this.pageParams.pageType === 'edit' && this.handleEdit()
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
      console.log('mainCategoriesList', mainCategoriesList)
      console.log('childCategoriesList', childCategoriesList)
      this.setState({
        mainCategoriesList
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
        selectBrandData: res.selectChildCategoriesData
      }, () => {
          this.chooseMainCategories(res.selectMainCategoriesData , true)
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
      selectMainCategoriesData: item,
      brandList: [],
    }
    // autoSelectNext 为true是编辑数据  自动选择下一项  故而不清除选中项
    if (autoSelectNext && selectChildCategoriesData) {
      this.chooseChildCategories(selectChildCategoriesData, autoSelectNext)
    } else {
      data.selectChildCategoriesData = {}
      data.selectBrandData = {}
    }
    this.brandList = []
    this.setState(data, () => {
      getBrandList({
        categoryId: item.categoryId,
        status: 1
      }, this).then(res => {
        this.brandList = res
      })
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
    let data = {
      brandList: this.brandList
    }
    // autoSelectNext 为true是编辑数据 故而不清除选中项
    if (!autoSelectNext) {
      data.selectChildCategoriesData = item
      data.selectBrandData = {}
    }
    this.setState(data);
  }
  /**
   * 选择品牌
   * @param {Object} city 选中的品牌
   * @return void
   */
  chooseBrand(item) {
    if (!item.categoryId) {
      return;
    }
    this.setState({
      selectBrandData: item,
    });
  }
  handlePrePageData() { 
    let pages = Taro.getCurrentPages() //  获取页面栈
    let prevPage = pages[pages.length - 2] // 上一个页面
    if (!prevPage) {
      return
    }
    const {
      selectMainCategoriesData, // 选中的品类
      selectChildCategoriesData, // 选中的子品类
      selectBrandData
    } = this.state
    prevPage.$component.setState({
      mainCategory: selectMainCategoriesData,
      childCategory: selectChildCategoriesData,
      brand: selectBrandData
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
      brandList,
      selectMainCategoriesData, // 选中的品类
      selectChildCategoriesData, // 选中的子品类
      selectBrandData
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
          borderRight
          active={active}
          onClickItem={this.chooseMainCategories.bind(this)}
        />
      )
    })
    const childCategoriesRender = childCategoriesList.map(item => {
      const key = item.categoryId
      const active = key === selectChildCategoriesData.categoryId
      const borderRight = brandList && brandList.length
      return (
        <ListItem
          key={key}
          item={item}
          borderRight={!borderRight}
          active={active}
          onClickItem={this.chooseChildCategories.bind(this)}
        />
      )
    })
    const brandListRender = brandList.map(item => {
      const key = item.brandId
      const active = key === selectBrandData.brandId
      return (
        <ListItem 
          key={key}
          item={item}
          borderLeft
          active={active}
          onClickItem={this.chooseBrand.bind(this)}
        />
      )
    })
    return (
      <SaveAreaView
        title='选择品类'
        back
        home
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
            <View className='fixed-nav-text'>建材品牌</View>
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
            <View className='child-list-wrapper'>
              {
                brandListRender
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
export default connect(mapStateToProps)(ChooseItem)
