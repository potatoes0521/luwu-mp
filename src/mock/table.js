/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 15:04:28
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-13 16:22:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import computedHandle from '@utils/computedPrice'

export const companyData = [
  {
    companyId: 1,
    companyName: '尚雅建筑',
    totalPrice: 22470.35,
  },
]

export const handleTemplateData = (data, params) => {
  console.log('object', params)
  const templateData = data.filter(item => item.name === params.name)[0] || {}
  console.log('templateData', templateData)
  const deepArr = deepFoolData(templateData.data)
  return {
    data: templateData,
    deepArr
  }
}
export const handleTemplatePrice = (dataArr, priceData) => {
  const data = dataArr.map(item => {
    const priceItem = priceData.filter(ite => ite.projectName === item.projectName)[0]
    const price = computedHandle.multiply((item.count || 0), (priceItem.price || 0))
    return {
      projectId: item.projectId,
      projectName: item.projectName,
      remark: priceItem.remark,
      price: price || '-',
      num: item.count || '-',
      // totalPrice: totalPrice || '-',
      special: item.special,
      maxPriceNum: item.maxPriceNum,
      minPriceNum: item.minPriceNum,
      maxAreaNum: item.maxAreaNum,
      minAreaNum: item.minAreaNum
    }
  })
  return data
}

const deepFoolData = (data) => {
  const newData = data.map((item, index) => {
    return item['projectList'].map((ite,idx) => {
      return {...ite, projectId: (index + 1) * 1000 + idx}
    })
  })
  let arr = []
  for (const i of newData) {
    arr = [...arr, ...i]
  }
  return arr
}

const findMaxNum = (arr) => {
  arr = arr.map(item => parseFloat(item) || 0)
  arr.sort((a, b) => b - a)
  arr = arr.filter(item => !!item)
  return arr[0]
}
const findMinNum = (arr) => {
  arr = arr.map(item => parseFloat(item) || 0)
  arr.sort((a, b) => a - b)
  arr = arr.filter(item => !!item)
  return arr[0]
}