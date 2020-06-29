/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-28 17:13:53
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-29 10:20:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'

import './index.scss'

class StickyTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          imageUrl: '',
          text: '招标比价'
        },
        {
          imageUrl: '',
          text: '合作装企'
        },
        {
          imageUrl: '',
          text: '建材询价'
        },
        {
          imageUrl: '',
          text: '建材商店'
        }
      ],
    }
  }

  componentDidMount() {
    this.getStickyScrollTop()
  }
  getStickyScrollTop() {
    Promise.all([
      this.select('#sticky >>> .banner-wrapper'),
      this.select('#sticky >>> .sticky-wrapper')
    ]).then(res => {
      console.log('res', res)
      const { system } = this.props
      const statusBarHeight = system && system.statusBarHeight || 88
      const stickyScrollTop = res[1].top - statusBarHeight
      this.props.onComputedScrollTop(stickyScrollTop)
    })
  }
  /**
   * 查询全部样式组件
   * @param {String} selector 被引用为骨架屏的样式类名
   * @return void
   */
  select(selector) {
    return new Promise(resolve =>
      Taro.createSelectorQuery().select(selector).boundingClientRect().exec(res => {
        resolve(res[0])
      })
    )
  }
  render() {
    const {
      list
    } = this.state
    const {
      activeIndex,
      system,
      fixed
    } = this.props
    const statusBarHeight = system && system.statusBarHeight || 88
    const itemListRender = list.map((item, index) => {
      const itemClassName = classNames('sticky-list-item', {
        'sticky-list-item-active': index === activeIndex
      })
      return (
        <View key={item} className={itemClassName}>
          <Text className='item-text'></Text>
        </View>
      )
    })
    const stickyClassWrapper = classNames('sticky-wrapper', {
      'sticky-fixed-wrapper': fixed
    })
    return (
      <Block>
        <View
          className={stickyClassWrapper}
          style={{
            paddingTop: fixed ? statusBarHeight + 'rpx' : 0
          }}
        >
          {
            itemListRender
          }
        </View>
        {
          fixed && <View className='sticky-wrapper'></View>
        }
      </Block>
    )
  }

}

StickyTab.defaultProps = {
  pageScrollTop: 0,
  onClick: () => {console.error('onClick is not defined')}
}

StickyTab.propTypes = {
  pageScrollTop: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(StickyTab);