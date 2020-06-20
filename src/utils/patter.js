/*
 * @Author: liuYang
 * @description: 正则文件
 * @path: 引入路径
 * @Date: 2020-06-20 22:42:11
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-20 22:42:29
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 


// 姓名正则
export const realNamePatter = /^[\u4E00-\u9FA5]{2,8}$/
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
// 身份证正则
export const idCardPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/

export const validateIdCard = idCard => {
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (idCardPatter.test(idCard)) {
    if (idCard.length == 18) {
      // eslint-disable-next-line prettier/prettier
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2) //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0 //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
      }
      var idCardMod = idCardWiSum % 11 //计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17) //得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true
        } else {
          return false
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true
        } else {
          return false
        }
      }
    }
  } else {
    return false
  }
}
