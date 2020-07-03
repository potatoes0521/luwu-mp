/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 09:47:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 17:28:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
      title: '比价成功'
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