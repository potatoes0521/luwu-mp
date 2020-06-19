/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 10:17:37
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 13:26:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { selectData } from "../../../../mock/select"
import './index.scss'

class NoteSelect extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSelectMain: false,
      mainCategoryList: [],
      childrenCategoryList: [],
      selectMainCategoryData: {},
      selectChildCategoryData: {},
    }
    this.allData = []
    this.timer = null
  }

  componentDidMount() {
    setTimeout(() => {
      this.getData()
    }, 200)
  }
  componentWillUnmount() { 
    if(!this.timer) return
    clearTimeout(this.timer)
    this.timer = null
  }
  getData() { 
    const data = selectData()
    this.allData = data
    const mainCategoryList = data.map(item => {
      return {
        categoryId: item.categoryId,
        categoryName: item.categoryName,
      }
    })
    this.setState({
      mainCategoryList
    }, () => {
        this.timer = setTimeout(() => {
          this.props.onLoadEnd()
        },200)
    })
  }

  onChooseMainCategory(item, e) {
    e.stopPropagation()
    const { mainCategoryList } = this.state
    const childrenCategoryList = mainCategoryList.map(ite => {
      return {
        categoryId: ite.categoryId,
        categoryName: ite.categoryName,
      }
    })
    this.setState({
      childrenCategoryList,
      selectMainCategoryData: item
    })
  }
  /**
   * 当选择了子项
   * @param {Object} item 参数描述
   * @return void
   */
  onChooseChildCategory(item, e) {
    e.stopPropagation()
    this.setState({
      selectChildCategoryData: item,
    }, () => {
        this.props.onChooseLastItem()
    })
  }
  controlSelectModal(e) { 
    e.stopPropagation()
    const {showSelectMain} = this.state
    this.setState({
      showSelectMain: !showSelectMain
    })
  }

  static options = {
    addGlobalClass: true // 允许外部样式修改组件样式
  }

  stopPropagation(e) {
    e.stopPropagation()
  }

  render() {
    const {
      showSelectMain,
      mainCategoryList,
      childrenCategoryList,
      selectMainCategoryData,
      selectChildCategoryData,
    } = this.state
    const {
      titleText,
      system
    } = this.props
    const navHeight =( (system && system.navHeight) || 120)
    const modalHeight = `calc(100vh - ${navHeight}rpx)`
    // 文字颜色样式
    const titleTextClassName = classNames('note-select-title-wrapper note-select-title-text', {
      'note-select-title-text-active': titleText
    })
    // icon样式
    const iconRotateClassName = classNames('iconfont iconRectangle note-select-title-icon', {
      'rotate180': titleText
    })
    // 渲染主品类
    const mainCategoryRender = mainCategoryList.map(item => {
      const key = item.categoryId
      const noteItemClassName = classNames('note-select-modal-main-list-item', {
        'note-select-modal-main-list-item-active': selectMainCategoryData.categoryId === key
      })
      return (
        <View
          key={key}
          className={noteItemClassName}
          onClick={this.onChooseMainCategory.bind(this, item)}
        >
          {
            item.categoryName
          }
        </View>
      )
    })
    // 渲染子品类
    const childrenCategoryRender = childrenCategoryList.map(item => {
      const key = item.categoryId
      const noteItemClassName = classNames('note-select-modal-main-list-item', {
        'note-select-modal-main-list-item-active': selectChildCategoryData.categoryId === key
      })
      return (
        <View
          key={key}
          className={noteItemClassName}
          onClick={this.onChooseChildCategory.bind(this, item)}
        >
          {
            item.categoryName
          }
        </View>
      )
    })
    const modalClassName = classNames('note-select-modal-wrapper animation', {
      'fadeOut': !showSelectMain,
      'fadeIn': showSelectMain
    })
    const modalMainClassName = classNames('note-select-modal-main animation', {
      'fadeOutUp': !showSelectMain,
      'fadeInDown': showSelectMain
    })
    return (
      <View
        className='note-select-wrapper'
        style={{ top: `${navHeight}rpx` }}
        onTouchMove={this.stopPropagation.bind(this)}
      >
        <View
          className={titleTextClassName}
          onClick={this.controlSelectModal.bind(this)}
        >
          <Text>{ titleText || '全部' }</Text>
          <Text className={iconRotateClassName}></Text>
        </View>
        <View
          className={modalClassName}
          style={{
            height: modalHeight
          }}
          onClick={this.controlSelectModal.bind(this)}
        >
          <View className={modalMainClassName}>
            <View className='note-select-modal-main-list border-right'>
              {
                mainCategoryRender
              }
            </View>
            <View className='note-select-modal-main-list'>
              {
                childrenCategoryRender
              }
            </View>
          </View>
        </View>
      </View>
    )
  }

}

NoteSelect.defaultProps = {
  onLoadEnd: () => {},
  onChooseLastItem: () => {
    console.error('onChooseLastItem is not defined in note_mine/components/NoteSelect')
  }
}

NoteSelect.propTypes = {
  onChooseLastItem: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    system: state.system.systemInfo
  }
}
export default connect(mapStateToProps)(NoteSelect);