/*
 * @Author: liuYang
 * @description: 招标公共state
 * @path: 引入路径
 * @Date: 2020-06-28 15:49:34
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 15:27:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import houseState from './houseState'

export default Object.assign({}, houseState, {
  remark: '',
  formType: 'edit',
  requireId: '',
  images: [],
  progress: 0
})

export const handleProgressText = (progress) => {
  switch (progress) {
    case 0:
      // return '未招标';
      return '招标方案比价中';
    case 1:
      return '招标方案比价中';
    case 2:
      return '量房方案比价中';
    case 3:
      return '方案报价审批中';
    case 4:
      return '签订装修合约中';
    case 5:
      return '装修施工监管中';
    case 6:
      return '装修竣工';
  }
}