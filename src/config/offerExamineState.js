/*
 * @Author: liuYang
 * @description: 审核报价公用state
 * @path: 引入路径
 * @Date: 2020-06-24 10:03:17
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-03 10:45:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import houseState from './houseState'

export default Object.assign({}, houseState, {
  fileList: [],
})
