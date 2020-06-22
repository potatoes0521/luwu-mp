/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-22 14:31:15
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-22 15:44:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Block
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.scss'

export default class TableMain extends Component { 
  _renderCell({data}) {
    const {
      hiddenRemark,
      hiddenIdentical
    } = this.props
    if (hiddenIdentical) {
      data = data.filter(item => item.special)
    }
    const renderDom = data.map((item, index) => {
      const key = item.projectId
      // 下边框显示规则  下一个不能是换区域  下一个不能是最后一个 不能打开备注
      const pingMiClassName = classNames('right-item-child border-right', {
        'border-bottom': hiddenRemark && index !== data.length - 1 && !(data[index + 1].projectId - item.projectId > 10)
      })
      const remarkClassName = classNames('right-item-child right-item-child-remark border-right border-top', {
        'border-bottom': index === 0 || !(item.projectId - data[index - 1].projectId > 10)
      })
      return (
        <Block key={key}>
          {
            index === 0 || (item.projectId - data[index - 1].projectId > 10) ? <View className='area-static' > </View> : null
          }
          <View className='right-item-child border-right border-bottom'>{item.price || '-'}</View>
          <View className={pingMiClassName}>{item.num || '-'}</View>
          <View
            className={remarkClassName}
            style={{display: hiddenRemark ? 'none' : 'flex'}}
          >{item.remark || '-'}</View>
        </Block>
      )
    })
    return renderDom
  }
  render() {
    let { 
      companyData0,
      companyData1,
      companyData2,
      companyData3,
      companyData4,
      companyData5,
      companyData6,
      companyData7,
      companyData8,
      companyData9,
      companyData10,
    } = this.props
    const companyData0Render = companyData0 ? this._renderCell(companyData0) : null
    const companyData1Render = companyData1 ? this._renderCell(companyData1) : null
    const companyData2Render = companyData2 ? this._renderCell(companyData2) : null
    const companyData3Render = companyData3 ? this._renderCell(companyData3) : null
    const companyData4Render = companyData4 ? this._renderCell(companyData4) : null
    const companyData5Render = companyData5 ? this._renderCell(companyData5) : null
    const companyData6Render = companyData6 ? this._renderCell(companyData6) : null
    const companyData7Render = companyData7 ? this._renderCell(companyData7) : null
    const companyData8Render = companyData8 ? this._renderCell(companyData8) : null
    const companyData9Render = companyData9 ? this._renderCell(companyData9) : null
    const companyData10Render = companyData10 ? this._renderCell(companyData10) : null
    return (
      <Block>
        {
          companyData0 && <View className='right-table-item-wrapper'>{companyData0Render}</View>
        }
        {
          companyData1 && <View className='right-table-item-wrapper'>{companyData1Render}</View>
        }
        {
          companyData2 && <View className='right-table-item-wrapper'>{companyData2Render}</View>
        }
        {
          companyData3 && <View className='right-table-item-wrapper'>{companyData3Render}</View>
        }
        {
          companyData4 && <View className='right-table-item-wrapper'>{companyData4Render}</View>
        }
        {
          companyData5 && <View className='right-table-item-wrapper'>{companyData5Render}</View>
        }
        {
          companyData6 && <View className='right-table-item-wrapper'>{companyData6Render}</View>
        }
        {
          companyData7 && <View className='right-table-item-wrapper'>{companyData7Render}</View>
        }
        {
          companyData8 && <View className='right-table-item-wrapper'>{companyData8Render}</View>
        }
        {
          companyData9 && <View className='right-table-item-wrapper'>{companyData9Render}</View>
        }
        {
          companyData10 && <View className='right-table-item-wrapper'>{companyData10Render}</View>
        }
      </Block>
    )
  }

}

TableMain.defaultProps = {
  onClick: () => {console.error('onClick is not defined')}
}

TableMain.propTypes = {
  onClick: PropTypes.func.isRequired
}