/*
 * @Author: liuYang
 * @description: 招标公共state
 * @path: 引入路径
 * @Date: 2020-06-28 15:49:34
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 16:42:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import houseState from './houseState'

export default {
  ...houseState,
  remark: '',
  formType: 'edit',
  requireId: '',
  images: [],
  progress: 0
}

export const handleProgressText = (progress) => {
  switch (progress) {
    case 0:
      // return '未招标';
      return '审核中';
    case 1:
      return '招标中';
    case 2:
      return '招标成功';
    default:
      return '招标中';
  }
}