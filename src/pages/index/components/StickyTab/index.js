/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-28 17:13:53
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-30 11:24:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Image,
  Block
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { getImage } from '@assets/cdn'
import { getSystemInfo } from '@utils/publicWX'

import './index.scss'

class StickyTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          imageUrl: getImage('index/stickyTab/zhaobiaobijia.png'),
          text: '装修招标'
        },
        {
          imageUrl: getImage('index/stickyTab/hezuozhuangqi.png'),
          text: '装修公司'
        },
        {
          imageUrl: getImage('index/stickyTab/jiancaixunjia.png'),
          text: '建材比价'
        },
        {
          imageUrl: getImage('index/stickyTab/jiancaishangdian.png'),
          text: '建材商店'
        }
      ],
    }
    this.loading = false // 用来判断是否计算过高度
    this.scrollData = {}
  }

  componentDidMount() {
    this.getStatusBarHeight()
  }
  componentDidUpdate() { 
    const { system } = this.props
    if (system && system.statusBarHeight && !this.loading) {
      this.getStickyScrollTop()
    }
  }
  getStatusBarHeight() { 
    const { system } = this.props
    if (!system || !system.statusBarHeight){
      getSystemInfo()
    }
  }
  getStickyScrollTop() {
    Promise.all([
      this.select('#sticky >>> .sticky-wrapper'),
      this.select('#sticky >>> .bidding'),
      this.select('#sticky >>> .company'),
      this.select('#sticky >>> .brand'),
      this.select('#sticky >>> .store'),

    ]).then(res => {
      this.loading = true
      const { system } = this.props
      const statusBarHeight = system && system.statusBarHeight || 88
      // 计算粘性tab的滚动高度
      const stickyScrollTop = res[0].top - (statusBarHeight / 2)
      const biddingScrollTop = res[1].top
      const companyScrollTop = res[2].top
      const brandScrollTop = res[3].top
      const storeScrollTop = res[4].top
      const screenHalf = system.safeArea.height / 2
      this.scrollData = {
        stickyScrollTop,
        biddingScrollTop,
        companyScrollTop,
        brandScrollTop,
        storeScrollTop,
        screenHalf
      }
      this.props.onComputedScrollTop(this.scrollData)
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
  handleScrollPage(index) { 
    const {
      biddingScrollTop,
      companyScrollTop,
      brandScrollTop,
      storeScrollTop,
      screenHalf
    } = this.scrollData
    let scrollTop = 0
    if (index === 3) {
      scrollTop = storeScrollTop
    } else if (index === 2) {
      scrollTop = brandScrollTop - screenHalf
    } else if (index === 1) {
      scrollTop = companyScrollTop - screenHalf
    } else if (index === 0) {
      scrollTop = biddingScrollTop - screenHalf
    }
    Taro.pageScrollTo({
      scrollTop: scrollTop,
      duration: 100
    })
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
      const key = item.text
      return (
        <View
          key={key}
          className={itemClassName}
          onClick={this.handleScrollPage.bind(this, index)}
        >
          <Image className='item-image' src={item.imageUrl}></Image>
          <Text className='item-text'>{item.text}</Text>
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
            height: fixed ? statusBarHeight + 170 + 'rpx' : '170rpx',
            paddingTop: fixed ? statusBarHeight + 'rpx' : 0
          }}
        >
          {
            itemListRender
          }
        </View>
        {
          fixed && (
            <View
              style={{
                height: '170rpx',
              }}
              className='sticky-wrapper'
            ></View>
          )
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