/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-12 10:04:11
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-21 11:52:13
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Taro from '@tarojs/taro'
import {getOSSData} from '@services/modules/upload';

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
        var tempFilePaths = res.tempFilePaths;
        uploadMultipleFiles(tempFilePaths, that).then(filePathArray => {
          resolve(filePathArray)
        })
      }
    })
  })
}

 /**
  * 上传多个文件
  * @param {Array} filePathsArray 图片临时路径的数组  里面是 字符串  ['1.png','2.png']
  * @param {Object} that this
  * @return void
  */
export const uploadMultipleFiles = (filePathsArray, that) => {
  return new Promise(resolve => {
    let count = 0
    let completeFilePathsArray = []
    uploadHandle({
      filePathsArray,
      count,
      resolve,
      completeFilePathsArray,
      that
    })
  })
}
 /**
  * 递归处理上传图片 对象方式传参
  * @param {Array} {filePathsArray 图片临时路径的数组  里面是 字符串  ['1.png','2.png']
  * @param {Number} count 现在是第几张
  * @param {Array} completeFilePathsArray 将来存返回值的地方
  * @param {Function} resolve promise
  * @param {Object} that} this
  * @return void
  */
export const uploadHandle = async ({
  filePathsArray,
  count,
  completeFilePathsArray,
  resolve,
  that,
}) => {
  if (filePathsArray.length > 1) {
    Taro.showLoading({
      title: '正在上传第' + (count + 1) + '张图片',
      mask: true
    })
  }
  const aliOSSData = await getOSSData({}, that);
  const file = filePathsArray[count]
  const list = file.split('/')
  const fileName = list[list.length - 1]
  const formData = {
    key: aliOSSData.dir + "${filename}",
    policy: aliOSSData.policy,
    OSSAccessKeyId: aliOSSData.accessId,
    success_action_status: 200,
    signature: aliOSSData.signature,
    name: fileName
  }
  Taro.uploadFile({
    url: aliOSSData.host,
    filePath: file,
    name: 'file',
    formData,
    header: {
      "Content-Type": "multipart/form-data"
    },
    success: async (res) => {
      if (!res || res.statusCode !== 200) {
        console.log(res, '上传失败')
        return
      }
      if (res.statusCode === 200) {
        count++ //下一张
        const path = aliOSSData.host + '/' + aliOSSData.dir + fileName
        completeFilePathsArray.push(path)
        // 判断成功了多少张图片 如果跟传入的数组一样 就直接
        if (count == filePathsArray.length) {
          resolve(completeFilePathsArray)
          Taro.hideLoading()
          Taro.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          uploadHandle({
            filePathsArray,
            count,
            completeFilePathsArray,
            resolve,
            that
          })
          console.log('正在上传第' + count + '张');
        }
      } else {
        resolve(res)
      }
    },
    fail: (err) => {
      console.log('第' + count + '张失败', err)
      count-- // 上一张
    }
  })
}
