/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 15:04:28
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-14 12:21:36
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import computedHandle from '@utils/computedPrice'
 /**
  * 根据用户选择的户型处理模板工艺
  * @param {Array} data 全部户型模板数据
  * @param {Object} params 使用参数里的name对应模板里的name
  * @return {Array} 全部户型区域  区域内包含工艺
  */
export const handleTemplateData = (data, params) => {
  const templateData = data.filter(item => item.name === params.name)[0] || {}
  return templateData.data
}
/**
* 处理工艺吧工艺和工作单位取出来其他多余数据不要
* @param {Array} templateData 模板数据  工艺和区域
* @return void
*/
export const handleProjectArea = (templateData) => {
  const projectAreaList = templateData.map((item, index) => {
    return {
      projectAreaList: item.projectList.map((ite, idx) => {
        return {
          projectName: ite.projectName,
          unit: ite.units,
          projectId: (index + 1) * 1000 + idx
        }
      }),
      projectArea: item.spaceName,
      projectAreaId: item.spaceId,
      index
    }
  }).filter(item => !!item)
  return projectAreaList
}
 /**
  * 处理每个公司的每个工艺展示数据  单公司数据单独处理为了更快的渲染
  * @param {Array} templateData 模板参数
  * @param {Array} shopList 商铺数据
  * @return void
  */
export const handleCompanyData = (templateData, shopList, state) => {
  let createCompanyStateData = {}
  for (let i = 0; i < shopList.length; i++) {
    // 如果是二次渲染全部  并且  数值不是null 
    if (createCompanyStateData[`companyData${i}`]) {
      continue
    }
    const data = handleTemplatePrice(templateData, shopList[i].templateData)
    createCompanyStateData[`companyData${i}`] = {
      data,
      companyId: shopList[i].shopId,
    }
  }
  for (const i in createCompanyStateData) {
    if (state[i] && createCompanyStateData[i].companyId === state[i].companyId) {
      delete createCompanyStateData[i]
    }
  }
  return createCompanyStateData
}
/**
* 根据对应工艺单价计算总面积下的价格
* @param {Array} templateData 全部工艺和面积数据
* @param {Array} priceData 装企工艺单价
* @return void
*/
const handleTemplatePrice = (templateData, priceData) => {
  const deepArr = deepFoolData(templateData)
  const data = deepArr.map(item => {
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
/**
* 数组扁平化并将所有工艺 以区域为单位定ID  每个区域的ID相差1000
* @param {Array} data 要扁平的数据
* @return void
*/
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

export const handleAllDataMaxData = (companyData, projectAreaList) => {
  let companyDataArr = [] // 吧对象转换为数组用
  for (const i in companyData) {
    companyDataArr.push(companyData[i])
  }
  let companyDataToContrast = [] // 把数据转换成对应工艺的二维数组 主要用来做数据对比的处理用
  for (let i = 0; i < companyDataArr[0].data.length; i++) {
    const arr = []
    for (let j = 0; j < companyDataArr.length; j++) {
      arr.push({
        ...companyDataArr[j].data[i],
        companyId: companyDataArr[j].companyId
      })
    }
    companyDataToContrast.push(arr)
  }
  for (let i = 0; i < companyDataToContrast.length; i++) {
    const priceArr = companyDataToContrast[i].map(item => item.price)
    const maxPriceNum = findMaxNum(priceArr)
    const minPriceNum = findMinNum(priceArr)
    const priceSpecial = findUndefined(priceArr)
    const numArr = companyDataToContrast[i].map(item => item.num)
    const maxAreaNum = findMaxNum(numArr)
    const minAreaNum = findMinNum(numArr)
    if (priceSpecial) {
      const specialData = companyDataToContrast[i][0]
      const index = Math.floor(specialData.projectId / 1000)
      const projectIndex = specialData.projectId - index * 1000
      projectAreaList[index - 1].projectAreaList[projectIndex].special = true
    }
    companyDataToContrast[i] = companyDataToContrast[i].map(item => ({
      ...item,
      minAreaNum,
      maxAreaNum,
      maxPriceNum,
      minPriceNum,
      special: priceSpecial
    }))
  }
  let handleOverCompanyData = [] // 对比完之后的数据
  for (let i = 0; i < companyDataArr.length; i++) {
    let arr = []
    for (let j = 0; j < companyDataToContrast.length; j++) {
      const arrData = companyDataToContrast[j].filter(item => item.companyId === companyDataArr[i].companyId)[0]
      arr.push(arrData)
    }
    handleOverCompanyData.push(arr)
  }
  for (let i = 0; i < handleOverCompanyData.length; i++) {
    for (const j in companyData) {
      if (companyData[j].companyId === handleOverCompanyData[i][0].companyId) {
        companyData[j].data = handleOverCompanyData[i]
      }
    }
  }
  return {
    companyData,
    projectAreaList
  }
}

/**
* 计算最大值
* @param {Array} arr 参数描述
* @return void
*/
const findMaxNum = (arr) => {
  arr = arr.map(item => parseFloat(item) || 0)
  arr.sort((a, b) => b - a)
  arr = arr.filter(item => !!item)
  return arr[0]
}

/**
* 计算最小值
* @param {Array} arr 参数描述
* @return void
*/
const findMinNum = (arr) => {
  arr = arr.map(item => parseFloat(item) || 0)
  arr.sort((a, b) => a - b)
  arr = arr.filter(item => !!item)
  return arr[0]
}

/**
* 计算有无空值
* @param {Array} arr 参数描述
* @return void
*/
const findUndefined = (arr) => {
  arr = arr.find(item => (!item || item === '-'))
  return !!arr
}