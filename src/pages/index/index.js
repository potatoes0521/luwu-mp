/*
 * @Author: liuYang
 * @description: 首页
 * @path: 引入路径
 * @Date: 2020-06-17 11:12:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-18 10:20:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
  Block,
  ScrollView
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Actions from '@store/actions/index.js'
import { defaultResourceImgURL } from "@config/request_config"
import classNames from 'classnames'
// import bannerImg from "@img/index/banner.png"
import { getIndexListData } from '@services/modules/index'
import Skeleton from '@components/Skeleton'
import Login from '@utils/login'
import ListItem from './components/ListItem/index'
import './index.scss'

const bannerBigImg = `${defaultResourceImgURL}index/bannerBig.png`
class Index extends Component {
  constructor() { 
    this.state = {
      listData: [{},{},{},{},{}], // 默认数据为了做骨架屏
      loading: true
    }
  }
  componentDidMount() { 
    this.getListData()
    this.login()
  }
  async login() { 
    const userInfo = await Login.getUserInfo()
    userInfo && Login.useUserInfoLogin(userInfo)
  }
  /**
   * 获取首页列表JSON数据
   * @return void
   */
  getListData() { 
    getIndexListData(this).then(res => {
      this.setState({
        listData: res,
        loading: false
      })
    })
  }
  /**
   * 处理ListItem的warning icon被点击
   * @return void
   */
  handleListItemIconClick() { 
    console.log('handleListItemIconClick')
  }
  config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }

  render() {
    const {
      listData,
      loading
    } = this.state
    const listRender = listData.map(item => {
      const key = item.title
      return (
        <ListItem
          key={key}
          item={item}
          tips={item.tips}
          onClickWaringIcon={this.handleListItemIconClick.bind(this)}
        ></ListItem>
      )
    })
    const lineRender = listData.map((item, index) => {
      const key = item.title
      const lineClassName = classNames('bottom-line skeleton-cylinder', {
        'shot-line': index === listData.length - 1,
      })
      return (
        <Block key={key}>
          <View
            style={{ borderColor: item.color, color: item.color }}
            className='circular skeleton-circular'
          >{index + 1}</View>
          <View style={{ backgroundColor: item.color }} className={lineClassName}></View>
          {
            index === listData.length -1 && <View style={{color: item.color}} className='iconfont iconsanjiaoxing icon-triangle'></View>
          }
        </Block>
      )
    })
    return (
      <View className='page-wrapper skeleton'>
        <View className='banner-wrapper skeleton-square'>
          <Image className='image' src={bannerBigImg}></Image>
        </View>
        <ScrollView scrollY className='scroll-wrapper'>
          <View className='list-wrapper'>
            <View className='line-wrapper'>
              {
                lineRender
              }
            </View>
            <View className='list'>
              {
                listRender
              }
            </View>
          </View>
        </ScrollView>
        {
          loading && <Skeleton />
        }
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user_msg.userInfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userInfo => dispatch(Actions.changeUserInfo(userInfo)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
