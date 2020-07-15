/*
 * @Author: liuYang
 * @description: 房屋类型
 * @path: 引入路径
 * @Date: 2020-06-28 13:44:27
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 15:42:35
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import { moneyData, timeData } from '@config/chooseOneState'
import { getTimeDate } from '@utils/timer'

export const houseType = [
  {
    num: 0,
    chinese: '零'
  },
  {
    num: 1,
    chinese: '一'
  },
  {
    num: 2,
    chinese: '二'
  },
  {
    num: 3,
    chinese: '三'
  },
  {
    num: 4,
    chinese: '四'
  },
  {
    num: 5,
    chinese: '五'
  },
  {
    num: 6,
    chinese: '六'
  },
  {
    num: 7,
    chinese: '七'
  },
  {
    num: 8,
    chinese: '八'
  },
  {
    num: 9,
    chinese: '九'
  },
  {
    num: 10,
    chinese: '十'
  }
]
export const oneMouthTimer = 2592000000

export const handleHouseType = (res) => {
  const bedroom = houseType.filter(item => item.num === res.bedroom)[0] || {}
  const sittingroom = houseType.filter(item => item.num === res.sittingroom)[0] || {}
  const cookroom = houseType.filter(item => item.num === res.cookroom)[0] || {}
  const washroom = houseType.filter(item => item.num === res.washroom)[0] || {}
  return {
    bedroom,
    sittingroom,
    cookroom,
    washroom
  }
}

export const handleRequestData = (res) => {
  const mouth = (getTimeDate(res.decorateTimeBefore) - getTimeDate(res.decorateTimeAfter)) / oneMouthTimer || 0
  const startTime = timeData.filter(item => item.timeMouth === mouth) || {}
  const budget = moneyData.filter(item => item.min === res.budgetMin)[0] || {}
  const roomData = handleHouseType(res)
  const address = {
    address: res.address,
    longitude: res.longitude,
    latitude: res.latitude
  }
  const data = {
    ...res,
    startTime: startTime[0] || {},
    budget,
    address,
    ...roomData
  }
  return data
}