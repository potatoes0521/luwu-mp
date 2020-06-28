/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-28 17:13:53
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-28 18:22:41
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './index.scss'

export default class StickyTab extends Component {

  // static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  // }

  constructor(props) {
    super(props)
    this.state = {
      list: [1, 2, 3, 4],
      fixed: false,
      viewTop: 0
    }
    this.stickyScrollTop = 0
  }

  componentDidMount() {
    this.getStickyScrollTop()
  }
  componentWillReceiveProps(nextProps) { 
    if (nextProps.pageScrollTop === this.props.pageScrollTop) return
    const { fixed } = this.state
    if (nextProps.pageScrollTop > this.stickyScrollTop && !fixed) {
      this.setState({
        fixed: true
      })
    } else if (nextProps.pageScrollTop < this.stickyScrollTop && fixed) {
      this.setState({
        fixed: false
      })
    }
  }
  getStickyScrollTop() {
    Promise.all([
      this.select('#sticky >>> .banner-wrapper'),
      this.select('#sticky >>> .sticky-wrapper')
    ]).then(res => {
      console.log('res', res)
      this.stickyScrollTop = res[1].top - res[0].height
      this.setState({
        viewTop: res[0].height
      })
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
      list,
      fixed,
      viewTop
    } = this.state
    const { activeIndex } = this.props
    const itemListRender = list.map((item, index) => {
      const itemClassName = classNames('sticky-list-item', {
        'sticky-list-item-active': index === activeIndex
      })
      return (
        <View key={item} className={itemClassName}>1</View>
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
            top: viewTop * 2 + 'rpx'
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