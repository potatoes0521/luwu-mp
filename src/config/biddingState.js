/*
 * @Author: liuYang
 * @description: 招标公共state
 * @path: 引入路径
 * @Date: 2020-06-28 15:49:34
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-15 16:04:09
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
  progress: 0,
  decorateTypeText: ''
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

export const RadioOptions = [
  {
    id: 0,
    text: '先生'
  },
  {
    id: 1,
    text: '女士'
  },
]