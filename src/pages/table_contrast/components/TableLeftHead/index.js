/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-22 10:35:01
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-23 09:33:25
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
      data = item.projectAreaList.filter(ite => ite.special)
    }
    const headListRender = data.map((ite, idx) => {
      // 打开工艺说明 高度变高
      const headTitleClassName = classNames('table-item-title', {
        'border-bottom': idx !== data.length - 1,
        'height180': hiddenRemark,
        'height300': !hiddenRemark,
      })
      const headTitleRightClassName = classNames('table-item-right border-left', {
        'height180': hiddenRemark,
        'height300': !hiddenRemark,
      })
      // 打开工艺说明 没有下边框 用工艺说明的上边框
      const pingMiClassName = classNames('left-head-item-child border-right', {
        'border-bottom': hiddenRemark && idx !== data.length - 1
      })
      // 该区域最后一个工艺说明没有下边框
      const remarkClassName = classNames('left-head-item-child-remark border-right border-top', {
        'border-bottom': idx !== data.length - 1
      })
      const HeaderClassName = classNames('table-item-col-span head-background', {
        'warning-background': ite.special
      })
      return (
        <View
          className={HeaderClassName}
          key={ite}
        >
          <View className={headTitleClassName}>{ite.projectName}</View>
          <View className={headTitleRightClassName}>
            <View className='left-head-item-child border-bottom border-right'>元</View>
            <View className={pingMiClassName}>{ite.unit || '㎡'}</View>
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