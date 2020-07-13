/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: '@services/modules/upload'
 * @Date: 2020-06-17 16:36:09
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 15:50:05
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */ 
import request from "../request";

// 获取oss参数
export const getOSSData = (data) => {
  return request.get(`thirdparty/v1/oss/uploadconfig`, data, false);
};

export const uploadFileToOSS = data => {
  return request.post(`OSSUpload`, data);
};
