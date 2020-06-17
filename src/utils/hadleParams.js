/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 11:37:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 11:57:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
// eslint-disable-next-line import/prefer-default-export
export const objectToString = (params) => {
  let str = ''
  for (const i in params) {
    str += i + '=' + params[i] + '&'
  }
  return str
}