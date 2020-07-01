/*
 * @Author: liuYang
 * @description: 选择类别
 * @path: 引入路径
 * @Date: 2020-06-18 18:18:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-01 13:28:39
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
import ListItem from '@/choose_components/ListItem'
import './index.scss'

class ChooseHouseType extends Component { 

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
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && Login.login()
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
        home
      >
        <View
          style={{
            height: `calc(100vh - ${navHeight}rpx)`
          }}
          className='page-wrapper'
        >
          <View className='fixed-nav'>
            <View className='fixed-nav-text'>房间</View>
            <View className='fixed-nav-text'>客厅</View>
            <View className='fixed-nav-text'>厨房</View>
            <View className='fixed-nav-text'>卫生间</View>
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
export default connect(mapStateToProps)(ChooseHouseType)
