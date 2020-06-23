/*
 * @Author: liuYang
 * @description: 首页
 * @path: 引入路径
 * @Date: 2020-06-17 11:12:51
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-23 11:20:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Image,
} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Actions from '@store/actions/index.js'
import { defaultResourceImgURL } from "@config/request_config"
import { getIndexListData } from '@services/modules/index'
import Skeleton from '@components/Skeleton'
import Login from '@utils/login'
import ListItem from './components/ListItem/index'

import './index.scss'

const bannerBigImg = `${defaultResourceImgURL}index/bannerBig.png?${Math.random()}`

class Index extends Component {
  constructor() { 
    this.state = {
      listData: [{},{},{},{},{}], // 默认数据为了做骨架屏
      loading: true,
      showIndex: -1
    }
  }
  componentDidMount() { 
    this.getListData()
    this.login()
  }
  login() { 
    Login.login()
  }
  /**
   * 获取首页列表JSON数据
   * @return void
   */
  getListData() { 
    getIndexListData(this).then(res => {
      this.setState({
        listData: res,
      })
    })
  }
  /**
   * 处理ListItem的warning icon被点击
   * @return void
   */
  handleListItemIconClick(index) { 
    this.setState({
      showIndex: index
    })
  }
  /**
   * 图片信息获取完成之后给骨架屏关了
   * @return void
   */
  onImageLoadEnd() { 
    this.setState({
      loading: false
    })
  }

  /**
   * 页面内转发
   * @param {Object} res 微信返回参数
   * @return void
   */
  onShareAppMessage() {
    const {userInfo} = this.props
    return {
      title: `录屋,和监理一起开启装修之旅吧~`,
      path: `/pages/index/index?shareType=1&userId=${userInfo.userId}`,
      imageUrl: `${defaultResourceImgURL}/share/share_index.png`
    }
  }
  
  config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }

  render() {
    const {
      listData,
      loading,
      showIndex
    } = this.state
    const listRender = listData.map((item, index) => {
      const key = item.title
      return (
        <ListItem
          key={key}
          item={item}
          index={index}
          showIndex={showIndex}
          listDataLength={listData.length}
          tips={item.tips}
          onImageLoadEnd={this.onImageLoadEnd.bind(this)}
          onClickImage={this.handleListItemIconClick.bind(this)}
        ></ListItem>
      )
    })
    
    return (
      <View className='page-wrapper skeleton'>
        <View className='banner-wrapper skeleton-square'>
          <Image className='image' src={bannerBigImg}></Image>
        </View>
        <View className='list-wrapper'>
          {listRender}
        </View>
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
