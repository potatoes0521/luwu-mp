/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-18 18:18:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 09:25:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
// import {} from '@services/modules/index'
import SaveAreaView from '@components/SafeAreaView'


import './index.scss'

class ChooseItem extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      mainCategoriesList: [], // 主品类
      childCategoriesList: [], // 子品类
      brandList: [] // 品牌
    }
  }

  componentDidMount() {
  }
  /**
   * 选择省份
   * @param {Object} city 选中的省份
   * @return void
   */
  chooseMainCategories(item) {
    let { mainCategoriesList } = this.state;
    mainCategoriesList = this.handleDataChooseData(item, mainCategoriesList)
    this.setState({
      mainCategoriesList,
      childCategoriesList: item.children,
      brandList: [],
    });
  }
  /**
   * 选择城市
   * @param {Object} city 选中的城市
   * @return void
   */
  chooseChildCategoriesList(city) {
    console.log('city', city);
    if (city.locationId === 1) {
      return;
    }
    let {
      childCategoriesList,
      mainCategoriesList
    } = this.state;
    this.handleFatherCity(city, mainCategoriesList);
    childCategoriesList = this.handleDataChooseData(city, childCategoriesList);
    // this.backGoFirstLine();
    this.setState({
      childCategoriesList,
      brandList: city.children || [],
    });
  }
  /**
   * 选择区\县
   * @param {Object} city 选中的区\县
   * @return void
   */
  chooseArea(city) {
    if (city.locationId === 1) {
      return;
    }
    let {
      brandList,
      childCategoriesList
    } = this.state;
    // 找到当前区\县所在的城市  并判断这个城市是不是在现在的列表内
    this.handleFatherCity(city, childCategoriesList);
    brandList = this.handleDataChooseData(city, brandList, this.lastChoose);
    // this.backGoFirstLine();
    this.setState({
      brandList,
    });
  }
  handleFatherCity(city, FatherCategoriesList, onlyFind) {
    let fatherCity = FatherCategoriesList.filter(item => {
      return item.children ?
        item.children.some(ite => ite.locationId === city.locationId) :
        item.locationId === city.locationId;
    })[0];
    if (onlyFind) {
      return fatherCity;
    }
  }
  /**
   * 并且处理数据
   * @return void
   */
  handleDataChooseData(category, data) {
    data.forEach(item => {
      if (item.categoryId === category.categoryId) {
        // 如果子集有选中的 他就不是取消
        if (item.children && item.children.some(ite => ite.checked)) {
          item.checked = true;
        } else {
          item.checked = !item.checked;
        }
      } else {
        item.checked = false;
      }
    });
    return data;
  }

  config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  render() {
    return (
      <SaveAreaView
        title='选择品类'
        back
        home
      >
        <View className='page-wrapper'>
          <View className='fixed-nav'>
            <View className='fixed-nav-text'>主品类</View>
            <View className='fixed-nav-text'>子品类</View>
            <View className='fixed-nav-text'>建材品牌</View>
          </View>
          <View className='main-wrapper'>
            <View className='child-list-wrapper'>
              <View className='list-item'>瓷砖</View>
            </View>
            <View className='child-list-wrapper'>

            </View>
            <View className='child-list-wrapper'>

            </View>
          </View>
        </View>
      </SaveAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(ChooseItem)