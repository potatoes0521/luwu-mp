/*
 * @Author: liuYang
 * @description: 公共form组件  创建房屋/创建招标/创建免费审报价都用了 
 * 使用说明
 *  需定义ref来获取子组件数据
 *    this.formForHouse = null
 *    this.formForHouse.judgeAndEmitData() 返回值如果是false就证明没有用过表单验证 如果正确返回数据
 * @path: '@/components_bidding/FormForHouse'
 * @Date: 2020-07-02 09:41:42
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 16:52:07
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 *  important 必填选项是否展示    这里字段几乎必填  这个只是用来控制
 * @emitFunction: 函数
 */ 
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import Location from '@components/Location'
import houseState from '@config/houseState.js'
import { oneMouthTimer } from '@config/houseType'
import { getDateTime } from '@utils/timer'
import FormItem from '@components/FormItem'
import './index.scss'

export default class FormForHouse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...houseState,
      // 除去公共key以外的字段定在这里
    }
    this.firstLoading = false
  }
  /**
   * 点了房屋户型
   * @return void
   */
  handleClickHouseType() { 
    this.props.onChooseHouseType()
  }
  onAreaInput(e) {
    const { target: { value } } = e
    this.setState({
      area: value
    })
  }
  onChooseStartTime() {
    console.log('1', 1)
  }

  onChooseBudget() {
    this.props.onChooseBudget()
  }
  
  getLocationData(address) {
    this.setState({ address })
  }
  onInputXiaoQu(e) { 
    const { target: { value } } = e
    this.setState({
      xiaoqu: value
    })
  }
  /**
   * 判断并传递数据  主要是父组件调用
   * @return void
   */
  judgeAndEmitData() {
    const {
      area,
      startTime,
      address,
      decorateType,
      xiaoqu
    } = this.state
    const { budget } = this.props
    if (decorateType < 0) {
      this.showToast('请选择房屋类型')
      return false
    }
    if (!area) {
      this.showToast('请填写房屋面积')
      return false
    }
    if (!address.address) {
      this.showToast('请选择房屋位置')
      return false
    }
    if (!budget.moneyText) {
      this.showToast('请选择预算')
      return false
    }
    const { latitude, longitude } = address
    const date = this.handleTimer(startTime)
    const sendData = {
      area,
      address: address.address,
      longitude,
      latitude,
      xiaoqu,
      budgetMin: budget.min,
      budgetMax: budget.max,
      decorateTimeBefore: date.decorateTimeBefore,
      decorateTimeAfter: date.decorateTimeAfter
    }
    return sendData
  }
  /**
   * 显示toast
   * @param {String} text 参数描述
   * @return void
   */
  showToast(text) {
    Taro.showToast({
      title: text,
      icon: 'none',
      duration: 2000
    })
  }
  handleTimer(data) {
    if (!data.timeMouth || data.timeMouth <= 0) {
      return {
        decorateTimeBefore: '',
        decorateTimeAfter: ''
      }
    }
    const nowDate = +new Date()
    const afterDate = getDateTime(nowDate)
    const beforeDate = getDateTime(nowDate + oneMouthTimer * data.timeMouth)
    return {
      decorateTimeBefore: beforeDate,
      decorateTimeAfter: afterDate
    }
  }

  render() {
    const {
      area,
      address,
      startTime,
    } = this.state
    const {
      important,
      budget,
      decorateTypeText
    } = this.props
    return (
      <View className='form-house-msg-components-wrapper'>
        <Location
          line
          style='form'
          label='房屋位置'
          placeholder='请选择'
          important={important}
          address={address || {}}
          onGetLocationData={this.getLocationData.bind(this)}
        />
        <FormItem
          line
          label='小区名称'
          placeholder='请选择'
          important={important}
          // value={decorateTypeText || ''}
          iconName='iconRectangle rotated'
          onInput={this.onInputXiaoQu.bind(this)}
        />
        <FormItem
          line
          shortUnit
          unit='icon'
          label='房屋户型'
          canInput={false}
          placeholder='请选择'
          important={important}
          value={decorateTypeText || ''}
          iconName='iconRectangle rotated'
          onContentClick={this.handleClickHouseType.bind(this)}
        />
        <FormItem
          line
          unitNum
          canInput
          shortUnit
          unit='text'
          type='digit'
          value={area}
          label='房屋面积'
          unitContent='㎡'
          important={important}
          placeholder='请输入房屋面积'
          onInput={this.onAreaInput.bind(this)}
        />
        
        <FormItem
          line
          shortUnit
          langLabel
          unit='icon'
          label='装修预算'
          canInput={false}
          placeholder='请选择'
          important={important}
          value={budget.moneyText || ''}
          iconName='iconRectangle rotated'
          onContentClick={this.onChooseBudget.bind(this)}
        />
        <FormItem
          shortUnit
          langLabel
          unit='icon'
          label='装修时间'
          canInput={false}
          placeholder='请选择'
          value={startTime.timeText || ''}
          iconName='iconRectangle rotated'
          onContentClick={this.onChooseStartTime.bind(this)}
        />
      </View>
    )
  }

}

FormForHouse.defaultProps = {
  startTime: {},
  budget: {},
  bedroom: {},
  sittingroom: {},
  cookroom: {},
  washroom: {},
  important: false,
  onClick: () => {console.error('onClick is not defined')}
}

FormForHouse.propTypes = {
  onClick: PropTypes.func.isRequired
}