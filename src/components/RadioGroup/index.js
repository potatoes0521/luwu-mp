/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-07-15 11:01:31
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 11:11:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

function RadioGroup(props) {

  const chooseAudio = (item) => {
    props.onChooseAudio(item)
  }

  const { activeIndex, optionsList } = props

  return (
    <View className='radio-group'>
      {
        optionsList.map(item => {
          const key = item.id
          return (
            <View
              key={key}
              className='option'
              onClick={() => chooseAudio(item)}
            >
              <View className='circular'>
                {activeIndex === item.id && <View className='circular-active'></View>}
              </View>
              <View className='option-title'>{item.text}</View>
            </View>
          )
        })
      }
    </View>
  )
}

RadioGroup.defaultProps = {
  activeIndex: -1,
  optionsList: [],
  onChooseAudio: () => {console.error('onChooseAudio is not defined in @components/AudioGroup')}
}

RadioGroup.propTypes = {
  optionsList: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onChooseAudio: PropTypes.func.isRequired,
}