/*
 * @Author: liuYang
 * @description: 招标公共state
 * @path: 引入路径
 * @Date: 2020-06-28 15:49:34
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 14:36:38
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import houseState from './houseState'

export default Object.assign({}, houseState, {
  remark: '',
  formType: 'edit',
  requireId: '',
  images: []
})