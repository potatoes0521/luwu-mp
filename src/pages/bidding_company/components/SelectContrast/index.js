/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-17 10:12:20
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-17 10:20:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'

import './index.scss'

export default class SelectContrast extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }
  handleDelete(item, e) { 
    e.stopPropagation()
    this.props.onDelete(item)
  }
  stopPropagation(e) {
    e.stopPropagation()
  }

  render() {
    const {  
      selectContrastList,
      showSelectContrastModal
    } = this.props
    return (
      <View className='bottom-select-components-wrapper'>
        {
          showSelectContrastModal && selectContrastList.length && (
            <View className='modal-select-wrapper'>
              <View
                className='modal-bg'
                onClick={this.props.onClickCloseModal}
                onTouchMove={this.stopPropagation.bind(this)}
              ></View>
              <View className='select-list-wrapper'>
                {
                  selectContrastList.map(item => {
                    const key = item.shopId
                    return (
                      <View key={key} className='select-list-item'>
                        <Text className='shop-name'>{item.shopName}</Text>
                        <Text
                          className='shop-delete iconfont iconhuaban'
                          onClick={this.handleDelete.bind(this, item)}
                        ></Text>
                      </View>
                    )
                  })
                }
              </View>
            </View>
          )
        }
        <View className='select-num-wrapper' onClick={this.props.onClickSelectModal}>
          {
            selectContrastList && selectContrastList.length ? (
              <Block>
                <Text>选中</Text>
                <Text className='heigh-light'>{selectContrastList.length}</Text>
                <Text>家</Text>
              </Block>
            ) : (
              <Text className='select-num-no'>您还未选择</Text>
            )
          }
        </View>
        <View className='select-btn' onClick={this.props.onNavigatorToTable}>开始对比</View>
      </View>
    )
  }

}

SelectContrast.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}