/*
 * @Author: 我的笔记
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:36
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 19:54:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SaveAreaView from '@components/SafeAreaView'
import Skeleton from '@components/Skeleton'
import { getNoteList } from '@services/modules/note'
import { defaultResourceImgURL } from '@config/request_config'
import Login from '@utils/login'
import BottomBtn from '@/note_components/BottomBtn'
import NoteItem from './components/NoteItem'
import NoteSelect from './components/NoteSelect'

import './index.scss'

const Mock = [
  {
    id: 1,
    goodsImageList: [
      '1.png',
      '2.png',
      '3.png',
      '4.png']
  },
  {
    id: 2,
    goodsImageList: ['', '', '', '']
  },
  {
    id: 3,
    goodsImageList: ['', '', '', '']
  },
  {
    id: 4,
    goodsImageList: ['', '', '', '']
  }
]
class NoteMine extends Component { 

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      noteList: Mock, // 给骨架屏提供一个mock\数据
      selectTitleText: '',
      firstLoading: true
    }
    this.propsMainCategoryData = {}
    this.propsChildCategoryData = {}
  }
  async componentDidMount() { 
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getListData()
  }
  componentDidShow() { 
    const { userInfo } = this.props
    if (!userInfo.token || !this.state.firstLoading) {
      return
    }
    this.getListData()
  }
  getListData() { 
    let sendData = {
      categoryId: this.propsMainCategoryData.categoryId || '',
      secondCategoryId: this.propsChildCategoryData.categoryId || ''
    }
    getNoteList(sendData).then(res => {
      const newData = res.map(item => {
        const json = Object.assign({}, item.data)
        delete item['data']
        const data = Object.assign({}, item, json)
        return data
      })
      this.setState({
        noteList: newData,
        firstLoading: false
      })
    })
  }
  /**
   * loading结束
   * @return void
   */
  loadingEnd() { 
    this.setState({
      loading: false
    })
  }
  onChooseLastItem(item, FItem) {
    const selectTitleText = FItem.categoryName + '-' + item.categoryName
    this.setState({
      selectTitleText
    })
    this.propsMainCategoryData = FItem
    this.propsChildCategoryData = item
    this.getListData()
  }

  /**
   * 下拉刷新
   * @return void
   */
  onPullDownRefresh() {
    // 显示顶部刷新图标
    Taro.showNavigationBarLoading()
    this.getListData()
    // 隐藏导航栏加载框
    Taro.hideNavigationBarLoading();
    // 停止下拉动作
    Taro.stopPullDownRefresh();
  }
  
  handleOnRightBtnClick() { 
    Taro.navigateTo({
      url: `/pages/note_publish/index`
    })
  }

  /**
   * 页面内转发
   * @param {Object} res 微信返回参数
   * @return void
   */
  onShareAppMessage() {
    return {
      title: `文案暂定`,
      path: `/pages/index/index`,
      imageUrl: `${defaultResourceImgURL}/share/share_note_mine.png`
    }
  }
  
  config = {
    navigationBarTitleText: '我的笔记',
    enablePullDownRefresh: true,
    navigationStyle: 'custom'
  }

  render() {
    const {
      loading,
      noteList,
      firstLoading,
      selectTitleText
    } = this.state
    const { userInfo } = this.props
    console.log('noteList', noteList)
    const noteListRender = noteList.map(item => {
      const key = item.noteId
      return (
        <NoteItem item={item} key={key} />
      )
    })
    const navTitle = userInfo.userName ? userInfo.userName + '的笔记' : '笔记'
    return (
      <SaveAreaView
        title={navTitle}
        back
        home
      >
        <View className='page-wrapper skeleton'>
          <NoteSelect
            titleText={selectTitleText}
            propsMainCategoryData={this.propsMainCategoryData}
            propsChildCategoryData={this.propsChildCategoryData}
            onChooseLastItem={this.onChooseLastItem.bind(this)}
            onLoadEnd={this.loadingEnd.bind(this)}
          />
          {
            noteListRender
          }
          <BottomBtn
            onRightBtnClick={this.handleOnRightBtnClick.bind(this)}
          />
        </View>
        {(loading || firstLoading) && <Skeleton />}
      </SaveAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user_msg.userInfo
  }
}
export default connect(mapStateToProps)(NoteMine)