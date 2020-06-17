/*
 * @Author: liuYang
 * @description: 对象转化为  key=value&格式
 * @path: @utils/handleParams
 * @Date: 2020-06-17 11:37:16
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 17:33:08
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