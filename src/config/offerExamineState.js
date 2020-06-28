/*
 * @Author: liuYang
 * @description: 审核报价公用state
 * @path: 引入路径
 * @Date: 2020-06-24 10:03:17
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-28 15:50:32
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 

export default {
  fileList: [],
  model: {},
  area: '',
  remark: '',
  mobile: '',
  userName: '',
  modelModalData: [{
      modelId: 0,
      modelName: '老房'
    },
    {
      modelId: 1,
      modelName: '新房'
    }
  ]
 }