/*
 * @Author: liuYang
 * @description: 时间处理
 * @path: 引入路径
 * @Date: 2020-06-28 14:49:24
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-28 14:49:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
/**
  * 获取当天时分秒的时间戳
  * @param {Number} hours 时
  * @param {Number} minutes 分
  * @param {Number} seconds 秒
  * @param {Number} milliseconds 毫秒
  * @return Number  时间戳 精确到毫秒
  * 
  * 
  * new Date(new Date(new Date().toLocaleDateString()).getTime());
    全世界的手机里面 就华为执行这个方法是 给个英文时间 别的全都是 2019 - 10 - 08
  * 
  */
export const timestampOfDay = (hours = 0, minutes = 0, seconds = 0, milliseconds = 0) => {
  return new Date(new Date().setHours(hours, minutes, seconds, milliseconds)).getTime()
}

/**
 * 时间操作 有参数时，时间转换成时间戳 | 无参数就是，获取现在的时间戳
 */
export const getTimeDate = times => {
  if (times) {
    return new Date(times).getTime();
  } else {
    return new Date().getTime();
  }
};
