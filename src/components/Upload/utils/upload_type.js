/*
 * @Author: liuYang
 * @description: 处理上传类型  文档/图片
 * @Date: 2019-11-12 10:04:11
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-24 09:51:00
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro from '@tarojs/taro'
import { uploadMultipleFiles } from './upload_request';
 /**
  * 选择图片并上传
  * @param {Number} count=9 选择张数
  * @param {Array} sizeType=['compressed'] 压缩格式
  * @param {Array} sourceType=['album', 'camera'] 选择类型
  * @param {Object} that this指针
  * @return void
  */
export const uploadImage = ({
  count = 9,
  sizeType = ['compressed'],
  sourceType = ['album', 'camera'],
  that,
}) => {
  return new Promise(resolve => {
    Taro.chooseImage({
      count,
      sizeType,
      sourceType,
      success: async (res) => {
        const tempFilePaths = res.tempFilePaths;
        uploadMultipleFiles({
            filePathsArray: tempFilePaths,
            that
          }).then(filePathArray => {
          resolve(filePathArray)
        })
      }
    })
  })
}
 /**
  * 选择图片/文件/视频/
  * 参照文档 https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html
  * @param {Number} count=9 选择个数0-100
  * @param {String} type='file' 选择类型  默认是图片
  * @return void
  */
export const uploadFile = ({
  count = 9,
  type = 'file',
  that,
  extension = ['doc', 'docx', 'pdf', 'xsl', 'xlsx']
}) => {
  return new Promise(resolve => {
    Taro.chooseMessageFile({
      count,
      type,
      extension,
      success(res) {
        console.log('res', res)
      const tempFilePaths = res.tempFiles;
      uploadMultipleFiles({
          filePathsArray: tempFilePaths,
          fileType: 'file',
          that
        }).then(filePathArray => {
        resolve(filePathArray)
      })
      }
    })
  })
}