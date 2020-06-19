/*
 * @Author: 我的笔记
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:08:36
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 09:53:00
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SaveAreaView from '@components/SafeAreaView'
import NoteItem from './components/NoteItem'
  
import './index.scss'

class index extends Component { 

  constructor(props) {
    super(props)
    this.state={}
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '我的笔记',
    navigationStyle: 'custom'
  }

  render() {
    const noteListRender = [1, 2].map(item => {
      const key = item.key
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
        <View className='page-wrapper'>
          <View className=''></View>
          {
            noteListRender
          }
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
export default connect(mapStateToProps)(index)