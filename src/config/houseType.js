/*
 * @Author: liuYang
 * @description: 房屋类型
 * @path: 引入路径
 * @Date: 2020-06-28 13:44:27
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-01 19:02:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 

export const houseType = [
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
  }
]

export const handleHouseType = (res) => {
  const bedroom = houseType.filter(item => item.num === res.bedroom)[0]
  const sittingroom = houseType.filter(item => item.num === res.sittingroom)[0]
  const cookroom = houseType.filter(item => item.num === res.cookroom)[0]
  const washroom = houseType.filter(item => item.num === res.washroom)[0]
  return {
    bedroom,
    sittingroom,
    cookroom,
    washroom
  }
}