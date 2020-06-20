/*
 * @Author: 我的笔记
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:36
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-20 17:47:22
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
import Login from '@utils/login'
import NoteItem from './components/NoteItem'
import NoteSelect from './components/NoteSelect'

import './index.scss'

const Mock = [
  {
    id: 1,
    goodsImageList: [
      'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epUAVPUlLia4q2oqW9Mr9GLf9lSmD2xVMqkjut8GkjLiaK7ZTicMszqtwoo0GzYVmv5y6vLq8SVszEqw/132',
      'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epUAVPUlLia4q2oqW9Mr9GLf9lSmD2xVMqkjut8GkjLiaK7ZTicMszqtwoo0GzYVmv5y6vLq8SVszEqw/132',
      'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epUAVPUlLia4q2oqW9Mr9GLf9lSmD2xVMqkjut8GkjLiaK7ZTicMszqtwoo0GzYVmv5y6vLq8SVszEqw/132',
      'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epUAVPUlLia4q2oqW9Mr9GLf9lSmD2xVMqkjut8GkjLiaK7ZTicMszqtwoo0GzYVmv5y6vLq8SVszEqw/132']
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
      loading: false,
      noteList: Mock, // 给骨架屏提供一个mock\数据
      selectTitleText: '',
      noteList: []
    }
    this.propsMainCategoryData = {}
    this.propsChildCategoryData = {}
  }
  async componentDidMount() { 
    const {userInfo} = this.props
    !userInfo.token && await Login.login()
    this.getListData()
  }
  getListData() { 
    let sendData = {
      categoryId: this.propsMainCategoryData.categoryId || '',
      secondCategoryId: this.propsMainCategoryData.categoryId || ''
    }
    getNoteList(sendData).then(res => {
      this.setState({
        noteList: res
      })
    })
  }
  /**
   * loading结束
   * @return void
   */
  loadingEnd() { 
    this.setState({
      loading: true
    })
  }
  onChooseLastItem(item, FItem) {
    const selectTitleText = FItem.categoryName + '-' + item.categoryName
    this.setState({
      selectTitleText
    })
    this.propsMainCategoryData = FItem
    this.propsChildCategoryData = item
  }
  config = {
    navigationBarTitleText: '我的笔记',
    navigationStyle: 'custom'
  }

  render() {
    const {
      loading,
      noteList,
      selectTitleText
    } = this.state
    const noteListRender = noteList.map(item => {
      const key = item.noteId
      return (
        <NoteItem item={item} key={key} />
      )
    })
    return (
      <SaveAreaView
        title='的笔记'
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
        </View>
        {!loading && <Skeleton />}
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