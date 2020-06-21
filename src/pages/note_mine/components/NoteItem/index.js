/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 09:47:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 12:14:38
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import Upload from '@components/Upload'
import Location from '@components/Location'
import { setStorage, removeStorage } from '@utils/storage'
import NoteFromMain from '@/note_components/NoteFormMain'

import './index.scss'

export default class NoteItem extends Component { 
  componentWillUnmount() { 
    removeStorage('note_details')
  }
  HandleEditData(e) { 
    e && e.stopPropagation();
    const { item } = this.props
    setStorage('note_details', item)
    Taro.navigateTo({
      url: `/pages/note_publish/index?noteId=${item.noteId}&pageType=edit`
    })
  }
  navigatorToDetails() { 
    const { item } = this.props
    Taro.navigateTo({
      url: `/pages/note_details/index?noteId=${item.noteId}`
    })
  }
  submitOffer() {
    Taro.showToast({
      title: '询价成功'
    })
  }
  render() {
    const { item } = this.props
    
    return (
      <View className='note-item'>
        <Location onlyShow address={item.address} >
          <View className='tips'>
            <Text className='tips-text' onClick={this.HandleEditData.bind(this)}>编辑</Text>
            <Text className='text-line'></Text>
            <Text className='tips-text' onClick={this.submitOffer.bind(this)}>询底价</Text>
          </View>
        </Location>
        <View className='note-main' onClick={this.navigatorToDetails.bind(this)}>
          <NoteFromMain item={item} />
          <View className='upload'>
            <Upload
              marginRightSize={42}
              imageList={item.goodsImageList || []}
              imageSize={140}
            ></Upload>
          </View>
        </View>
      </View>
    )
  }

}

NoteItem.defaultProps = {
  item: {
    goodsImageList: []
  },
}

NoteItem.propTypes = {
  item: PropTypes.object.isRequired
}