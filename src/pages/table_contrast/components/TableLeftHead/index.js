/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-22 10:35:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-22 14:20:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.scss'

export default class TableLeftHead extends Component {
  render() {
    const {
      item,
      hiddenIdentical,
      hiddenRemark
    } = this.props
    let data = item.projectAreaList
    if (hiddenIdentical) {
      data = item.projectAreaList.filter(ite => ite.hide)
    }
    const headListRender = data.map((ite, idx) => {
      const headTitleClassName = classNames('table-item-title', {
        'border-bottom': idx !== data.length - 1,
        'height180': hiddenRemark,
        'height300': !hiddenRemark,
      })
      const pingMiClassName = classNames('left-head-item-child border-right', {
        'border-bottom': hiddenRemark && idx !== data.length - 1
      })
      const remarkClassName = classNames('left-head-item-child table-item-bottom border-right border-top', {
        'border-bottom': idx !== data.length - 1
      })
      return (
        <View
          className='table-item-col-span head-background'
          key={ite}
        >
          <View className={headTitleClassName}>{ite}</View>
          <View className='table-item-right border-left'>
            <View className='left-head-item-child border-bottom border-right'>元</View>
            <View className={pingMiClassName}>㎡</View>
            <View
              className={remarkClassName}
              style={{display: hiddenRemark ? 'none' : 'flex'}}
            >工艺说明</View>
          </View>
        </View>
      )
    })
    return (
      <Block>
        <View className='area'>{item.projectArea}</View>
        {
          headListRender
        }
      </Block>
    )
  }

}

TableLeftHead.defaultProps = {
  item: {
    projectAreaList: [],
  },
  onClick: () => {console.error('onClick is not defined')}
}

TableLeftHead.propTypes = {
  onClick: PropTypes.func.isRequired
}