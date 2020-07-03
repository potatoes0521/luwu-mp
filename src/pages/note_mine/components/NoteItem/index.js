/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 09:47:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 17:50:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import PropTypes from 'prop-types'
import Upload from '@components/Upload'
import Location from '@components/Location'
import { setStorage, removeStorage } from '@utils/storage'
import NoteFromMain from '@/components_note/NoteFormMain'

import './index.scss'

export default class NoteItem extends Component { 
  componentWillUnmount() { 
    removeStorage('note_details')
  }

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
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
      title: '询底价成功'
    })
  }
  render() {
    const { item } = this.props
    const {
      brand,
      model,
      price,
      noteId,
      updateAt,
      priceUnit,
      mainCategory,
      childCategory,
    } = item
    return (
      <View className='note-item'>
        <View className='note-main' onClick={this.navigatorToDetails.bind(this)}>
          <NoteFromMain
            brand={brand}
            model={model}
            price={price}
            noteId={noteId}
            rightType='time'
            updateAt={updateAt}
            priceUnit={priceUnit}
            mainCategory={mainCategory}
            childCategory={childCategory}
          />
          <View className='upload'>
            <Upload
              marginRightSize={30}
              imageList={item.goodsImageList || []}
              imageSize={120}
            ></Upload>
          </View>
          <Location onlyShow address={item.address} />
        </View>
        <View className='handle-wrapper'>
          <View className='handle-item' onClick={this.HandleEditData.bind(this)}>
            <Text className='iconfont iconjiahao handle-icon-style'></Text>
            <Text>编辑</Text>
          </View>
          <View className='handle-item' onClick={this.submitOffer.bind(this)}>
            <Text className='iconfont iconjiahao handle-icon-style'></Text>
            <Text>询底价</Text>
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