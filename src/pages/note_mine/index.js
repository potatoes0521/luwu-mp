/*
 * @Author: 我的笔记
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:36
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 13:31:41
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SaveAreaView from '@components/SafeAreaView'
import Skeleton from '@components/Skeleton'
import NoteItem from './components/NoteItem'
import NoteSelect from './components/NoteSelect'

import './index.scss'

const Mock = [
  {
    id: 1,
    goodsImageList: ['', '', '', '']
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
      noteList: Mock // 给骨架屏提供一个mock\数据
    }
  }
  loadingEnd() { 
    this.setState({
      loading: true
    })
  }
  config = {
    navigationBarTitleText: '我的笔记',
    navigationStyle: 'custom'
  }

  render() {
    const {
      loading,
      noteList
    } = this.state
    const noteListRender = noteList.map(item => {
      const key = item.id
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
          <NoteSelect onLoadEnd={this.loadingEnd.bind(this)} />
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