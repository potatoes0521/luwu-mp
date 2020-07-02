/*
 * @Author: liuYang
 * @description: 正则文件
 * @path: 引入路径
 * @Date: 2020-06-20 22:42:11
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-02 13:21:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 


// 姓名正则
export const realNamePatter = /^[\u4E00-\u9FA5]{1,8}$/
// 手机号正则
export const phoneNumberPatter = /^1[3456789]\d{9}$/
// 验证码正则
export const verificationCodePatter = /^\d{4,6}\b/
// 处理金额
export const handleMoney = (price) => {
  price = price.replace(/[^\d.]/g, "") //清除"数字"和"."以外的字符
  price = price.replace(/^\./g, "") //验证第一个字符是数字
  price = price.replace(/\.{2,}/g, ".") //只保留第一个, 清除多余的
  price = price.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
  price = price.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
  return price
}