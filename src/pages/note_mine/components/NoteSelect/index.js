/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 10:17:37
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-10 14:21:38
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 

import React, { Component } from 'react'
import {
  View,
  Text
} from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCategory } from '@services/modules/category'

import './index.scss'

class NoteSelect extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSelectModal: false,
      mainCategoriesList: [],
      childCategoriesList: [],
      selectMainCategoryData: {},
      selectChildCategoryData: {},
    }
    this.AllChildCategoriesList = []
    this.timer = null
  }

  componentDidMount() {
    this.getAllCategoryData()
  }
  componentWillReceiveProps(nextProps) { 
    this.handleSelectData(nextProps)
  }
  componentWillUnmount() { 
    if(!this.timer) return
    clearTimeout(this.timer)
    this.timer = null
  }
  /**
   * 获取全部品类数据
   * @return void
   */
  getAllCategoryData() {
    getCategory(this).then(res => {
      if (!res || res.length < 1) {
        this.props.onLoadEnd()
        return
      }
      res.forEach(item => {
        item.checked = false
      })
      const mainCategoriesList = res.filter(item => item.categoryLevel === 1)
      const childCategoriesList = res.filter(item => item.categoryLevel === 2)
      this.AllChildCategoriesList = childCategoriesList
      this.setState({
        mainCategoriesList
      }, () => {
        this.timer = setTimeout(() => {
          this.props.onLoadEnd()
        }, 200)
      })
    })
  }
  /**
   * 选择主品类
   * @param {Object} city 选中的主品类
   * @return void
   */
  onChooseMainCategory(item, autoSelectNext, e) {
    e && e.stopPropagation()
    const { selectMainCategoryData, selectChildCategoryData } = this.state;
    if (!autoSelectNext && item.categoryId === selectMainCategoryData.categoryId) {
      return
    }
    let childCategoriesList = this.AllChildCategoriesList.filter(child => child.parentId === item.categoryId)
    let data = {
      childCategoriesList,
    }
    // autoSelectNext 为true是编辑数据  自动选择下一项  故而不清除选中项
    if (autoSelectNext) {
      this.onChooseChildCategory(selectChildCategoryData, autoSelectNext)
    } else {
      data.selectMainCategoryData = item
      data.selectChildCategoryData = {}
    }
    this.setState(data);
  }
  /**
   * 选择子品类
   * @param {Object} city 选中的城市
   * @return void
   */
  onChooseChildCategory(item, autoSelectNext, e) {
    e && e.stopPropagation()
    let { selectChildCategoryData, selectMainCategoryData } = this.state;
    if (!autoSelectNext && item.categoryId === selectChildCategoryData.categoryId) {
      return
    }
    if (autoSelectNext) {
      this.props.onChooseLastItem(item, selectMainCategoryData)
    } else {
      this.setState({
        selectChildCategoryData: item,
      }, () => {
          this.props.onChooseLastItem(item, selectMainCategoryData)
          this.controlSelectModal()
      });
    }
  }
  /**
   * 控制显示隐藏选择栏
   * @param {Object} e event对象
   * @return void
   */
  controlSelectModal(e) { 
    e && e.stopPropagation()
    const { showSelectModal } = this.state
    if (!showSelectModal) {
      this.handleSelectData(this.props)
    }
    this.setState({
      showSelectModal: !showSelectModal
    })
  }
  /**
   * 处理选择数据   
   * @param {Object} props this.props
   * @return void
   */
  handleSelectData(props) { 
    const {selectMainCategoryData, selectChildCategoryData} = this.state
    if (selectMainCategoryData.categoryId !== props.propsMainCategoryData.categoryId) {
      let childCategoriesList = this.AllChildCategoriesList.filter(child => child.parentId === props.propsMainCategoryData.categoryId)
      this.setState({
        selectMainCategoryData: props.propsMainCategoryData,
        childCategoriesList
      })
    }
    if (selectChildCategoryData.categoryId !== props.propsChildCategoryData.categoryId) {
      this.setState({
        selectChildCategoryData: props.propsChildCategoryData
      })
    }
  }

  static options = {
    // addGlobalClass: true // 允许外部样式修改组件样式
  }

  stopPropagation(e) {
    e.stopPropagation()
  }

  render() {
    const {
      showSelectModal,
      mainCategoriesList,
      childCategoriesList,
      selectMainCategoryData,
      selectChildCategoryData,
    } = this.state
    const {
      titleText,
      system
    } = this.props
    const navHeight =( (system && system.navHeight) || 120)
    const modalHeight = `calc(100vh - ${navHeight}rpx)`
    // 渲染主品类
    const mainCategoryRender = mainCategoriesList.map(item => {
      const key = item.categoryId
      const noteItemClassName = classNames('note-select-modal-main-list-item', {
        'note-select-modal-main-list-item-active': selectMainCategoryData.categoryId === key
      })
      return (
        <View
          key={key}
          className={noteItemClassName}
          onClick={this.onChooseMainCategory.bind(this, item, false)}
        >
          {
            item.categoryName
          }
        </View>
      )
    })
    // 渲染子品类
    const childrenCategoryRender = childCategoriesList.map(item => {
      const key = item.categoryId
      const noteItemClassName = classNames('note-select-modal-main-list-item', {
        'note-select-modal-main-list-item-active': selectChildCategoryData.categoryId === key
      })
      return (
        <View
          key={key}
          className={noteItemClassName}
          onClick={this.onChooseChildCategory.bind(this, item, false)}
        >
          {
            item.categoryName
          }
        </View>
      )
    })
    // 文字颜色样式
    const titleTextClassName = classNames('note-select-title-wrapper note-select-title-text', {
      'note-select-title-text-active': titleText,
      'border-bottom': !showSelectModal
    })
    // icon样式
    const iconRotateClassName = classNames('iconfont iconsanjiaoxing1 note-select-title-icon', {
      'note-select-title-icon-active': titleText,
      'rotate180': showSelectModal
    })
    const modalClassName = classNames('note-select-modal-wrapper animation', {
      'fadeOut': !showSelectModal,
      'fadeIn': showSelectModal
    })
    const modalMainClassName = classNames('animation', {
      'fadeOutUp': !showSelectModal,
      'fadeInDown': showSelectModal
    })
    return (
      <View
        className='note-select-wrapper'
        style={{ top: `${navHeight}rpx` }}
      >
        <View
          className={titleTextClassName}
          onClick={this.controlSelectModal.bind(this)}
        >
          <Text>{ titleText || '筛选' }</Text>
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
            <View
              className='note-select-category-title-wrapper'
              onClick={this.stopPropagation.bind(this)}
            >
              <View className='category-title'>主品类</View>
              <View className='category-title'>子品类</View>
            </View>
            <View className='note-select-modal-main' >
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
      </View>
    )
  }

}

NoteSelect.defaultProps = {
  titleText: '全部',
  propsMainCategoryData: {},
  propsChildCategoryData: {},
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