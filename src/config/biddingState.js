/*
 * @Author: liuYang
 * @description: 招标公共state
 * @path: 引入路径
 * @Date: 2020-06-28 15:49:34
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-28 16:20:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import houseType from './houseType'

export default {
  startTime: '', // 开始时间
  endTime: '', // 结束时间
  imageList: [], // 图片列表
  houseTypeModalData: houseType, // 选择房屋类型的数据
  model: {}, // 房屋类型
  type: {}, // 房屋户型
  area: '', // 房屋面积
  address: {},
  remark: '', // 备注
  mobile: '', // 手机号
  userName: '', // 用户名
}