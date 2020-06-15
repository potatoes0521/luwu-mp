/*
 * @Author: liuYang
 * @description: 骨架屏
 *    skeleton样式类为骨架屏查找绘制节点的根节点
 *    skeleton-square 骨架节点样式为方形
 *    skeleton-circular 骨架节点为圆形
 *    skeleton-cylinder 骨架节点为长条形
 *    skeleton-light与.skeleton-dark为块元素背景骨架样式
 * @path: @components/Skeleton
 * @path: 引入路径
 * @Date: 2020-06-15 18:07:12
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-15 18:08:07
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
/*
 * @Author: liuYang

 * @Date: 2020-05-24 08:57:50
 * @LastEditors: liuYang
 * @LastEditTime: 2020-05-24 12:05:01
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropsType from 'prop-types'
import './index.scss'

class Skeleton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lights: [],
      darks: [],
      squares: [],
      circulars: [],
      cylinders: [],
    }
  }
 
  componentDidMount() {
    const { selector } = this.props
    Promise.all([
      this.selectAll(`.${selector} >>> .${selector}-light`),
      this.selectAll(`.${selector} >>> .${selector}-dark`),
      this.selectAll(`.${selector} >>> .${selector}-square`),
      this.selectAll(`.${selector} >>> .${selector}-circular`),
      this.selectAll(`.${selector} >>> .${selector}-cylinder`),
    ]).then(([lights, darks, squares, circulars, cylinders]) =>
      this.setState({
        lights,
        darks,
        squares,
        circulars,
        cylinders,
      }),
    )
  }
 
  /**
   * 查询全部样式组件
   * @param {String} selector 被引用为骨架屏的样式类名
   * @return void
   */
  selectAll(selector) {
    return new Promise(resolve =>
      Taro.createSelectorQuery()
      .selectAll(selector)
      .boundingClientRect()
        .exec(res => {
          resolve(res[0])
        }),
    )
  }
    
 
  /**
   * 计算view样式
   * @param {Number}width 参数描述
   * @param {Number} height 参数描述
   * @param {Number} top 参数描述
   * @param {Number} left 参数描述
   * @return void
   */
  createStyle({ width, height, top, left }) {
    return {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
    }
  }
 
  createCylinderStyle(rect) {
    return ({
      ...this.createStyle(rect),
      'border-radius': `${rect.height / 2}px`,
    })
  }
  
  render() {
    const { backgroundColor, lightColor, darkColor } = this.props
    const { lights, darks, circulars, squares, cylinders } = this.state
    const skeletonStyle = { backgroundColor }
    return (
      <View
        className='skeleton'
        style={skeletonStyle}
      >
        {darks.map(dark => (
          <View
            key={`${dark.top}-${dark.left}`}
            className='item dark'
            style={{ ...this.createStyle(dark), backgroundColor: darkColor }}
          />
        ))}
        {lights.map(light => (
          <View
            key={`${light.top}-${light.left}`}
            className='item light'
            style={{ ...this.createStyle(light), backgroundColor: lightColor }}
          />
        ))}
        {squares.map(square => (
          <View
            key={`${square.top}-${square.left}`}
            className='item square'
            style={this.createStyle(square)}
          />
        ))}
        {circulars.map(circular => (
          <View
            key={`${circular.top}-${circular.left}`}
            className='item circular'
            style={this.createStyle(circular)}
          />
        ))}
        {cylinders.map(cylinder => (
          <View
            key={`${cylinder.top}-${cylinder.left}`}
            className='item cylinder'
            style={this.createCylinderStyle(cylinder)}
          />
        ))}
      </View>
    )
  }
}
Skeleton.defaultProps = {
  selector: 'skeleton',
  backgroundColor: '#fff',
  lightColor: 'white',
  darkColor: '#2f3333',
}
Skeleton.propType = {
  selector: PropsType.string,
  backgroundColor: PropsType.string,
  lightColor: PropsType.string,
  darkColor: PropsType.string
}
export default Skeleton
