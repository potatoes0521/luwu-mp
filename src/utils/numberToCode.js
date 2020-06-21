/*
 * @Author: liuYang
 * @description: 把数字转换成对应文字
 * @path: 引入路径
 * @Date: 2020-06-21 10:57:24
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 11:45:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

export const SectionToChinese = (section) => {
  var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  var chnUnitChar = ["", "十", "百", "千", "万", "亿", "万亿", "亿亿"];
  var strIns = '',
    chnStr = '';
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}