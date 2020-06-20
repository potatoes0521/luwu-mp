/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-20 13:44:04
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-20 15:04:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.scss'

export default class ListItem extends Taro.Component {
  handleClickItem(item) { 
    this.props.onClickItem(item)
  }
  render() {
    const {
      item,
      active,
      borderRight,
      borderLeft
    } = this.props
    const listItemClassName = classNames('list-item', {
      'list-item-active': active,
      'border-right': borderRight,
      'border-left': borderLeft
    })
    return (
      <View
        onClick={this.handleClickItem.bind(this, item)}
        className={listItemClassName}
      >{item.categoryName || item.brandName || '-'}</View>
    )
  }

}

ListItem.defaultProps = {
  item: {},
  active: false,
  borderRight: false,
  borderLeft: false,
  onClickItem: () => {
    console.error('onClick is not defined')
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  borderRight: PropTypes.bool,
  borderLeft: PropTypes.bool,
  onClickItem: PropTypes.func.isRequired
}