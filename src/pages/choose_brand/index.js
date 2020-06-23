/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-23 15:49:04
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-23 18:24:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getBrandList } from '@services/modules/category'
import SafeAreaView from '@components/SafeAreaView'
import classNames from 'classnames'
import Login from '@utils/login'
import SearchInput from '@components/SearchInput'
import { getStorage } from '@utils/storage'
  
import './index.scss'

class ChooseBrand extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      brandList: [],
      selectData: {},
      filterList: [],
      loading: true
    }
    this.pageParams = {}
  }

  async componentDidMount() {
    this.pageParams = this.$router.params
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getBrandListData()
  }
  /**
   * 获取品牌列表
   * @return void
   */
  getBrandListData() { 
    this.setState({
      loading: true
    }, () => {
      getBrandList({
        categoryId: this.pageParams.categoryId || '',
        status: 1
      }).then(res => {
        this.setState({
          brandList: res,
          loading: false
        }, () => {
            this.pageParams.pageType === 'edit' && this.handleEdit()
        })
      })
    })
  }
  /**
   * 如果是编辑来处理编辑
   * @return void
   */
  handleEdit() {
    getStorage('choose_brand').then(res => {
      this.setState({
        selectData: res
      })
    })
  }
  onChooseBrand(item, e) {
    e && e.stopPropagation()
    this.setState({
      selectData: item
    }, () => {
        this.handlePrePageData({ brand: item})
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
  onSearchBrandOver(data) { 
    this.setState({filterList: data})
  }
  onClearInput() { 
    this.setState({filterList: []})
  }
  onClickNoData() { 
    this.handlePrePageData({canInputBrand: true})
  }
  stopPropagation(e) {
    e.stopPropagation()
  }
  config = {
    navigationBarTitleText: '选择品牌',
    navigationStyle: 'custom'
  }

  render() {
    const { brandList, selectData, filterList, loading } = this.state
    const { system } = this.props
    const navHeight = system && system.navHeight || 120
    const brandListRender = brandList.map(item => {
      const key = item.brandId
      const itemClassName = classNames('list-item', {
        'list-item-active': item.brandId === selectData.brandId
      })
      return (
        <View
          key={key}
          className={itemClassName}
          onClick={this.onChooseBrand.bind(this, item)}
        >{item.brandName}</View>
      )
    })
    const filterListRender = filterList.map(item => {
      const key = item.brandId
      const itemClassName = classNames('list-item', {
        'list-item-active': item.brandId === selectData.brandId
      })
      return (
        <View
          key={key}
          className={itemClassName}
          onClick={this.onChooseBrand.bind(this, item)}
        >{item.brandName}</View>
      )
    })
    return (
      <SafeAreaView
        title='选择品牌'
        back
        home
      >
        <View
          style={{
            height: `calc(100vh - ${navHeight}rpx)`
          }}
          className='page-wrapper'
        >
          <View className='choose-brand-search-wrapper'>
            <SearchInput
              data={brandList}
              filterKey='brandName'
              onClearInput={this.onClearInput.bind(this)}
              onSearchBrandOver={this.onSearchBrandOver.bind(this)}
            />
          </View>
          <View className='page-main'>
            {
              brandListRender
            }
            {
              !loading && (
                <View className='bottom-tips'>
                  <Text>没有找到该品牌？</Text>
                  <Text className='click-text' onClick={this.onClickNoData.bind(this)}>点击输入</Text>
                </View>
              )
            }
          </View>
          {
            filterList && filterList.length && (
              <View className='filter-wrapper'>
                <View className='filter-main'>
                  {
                    filterListRender
                  }
                  <View className='bottom-tips'>
                    <Text>没有找到该品牌？</Text>
                    <Text className='click-text' onClick={this.onClickNoData.bind(this)}>点击输入</Text>
                  </View>
                </View>
              </View>
            )
          }
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
export default connect(mapStateToProps)(ChooseBrand)