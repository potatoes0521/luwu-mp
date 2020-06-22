/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 15:04:28
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-22 16:10:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

export const companyData = [
  {
    companyId: 1,
    companyName: '尚雅建筑',
    totalPrice: 22470.35,
  },
  {
    companyId: 2,
    companyName: '金科天籁',
    totalPrice: 22727.49,
  },
  {
    companyId: 3,
    companyName: '苗圃东里',
    totalPrice: 20736.60,
  },
  {
    companyId: 4,
    companyName: '生活家',
    totalPrice: 21350.97,
  },
  {
    companyId: 5,
    companyName: '佳时特',
    totalPrice: 22379.80,
  },
  {
    companyId: 6,
    companyName: '建华',
    totalPrice: 27966.90,
  },
  {
    companyId: 7,
    companyName: '名都',
    totalPrice: 22823.82,
  },
  {
    companyId: 8,
    companyName: '天鹏',
    totalPrice: 21136.84,
  },
  {
    companyId: 9,
    companyName: '装术',
    totalPrice: 23686.93,
  },
  {
    companyId: 10,
    companyName: '美家',
    totalPrice: 21766.11,
  }
]

export const canqiangpiData = {
  projectName: '墙顶面基层处理',
  data: [
    {
      companyId: 1,
      price: '尚雅建筑',
      total: 100,
      remark: ''
    }, {
      companyId: 2,
      price: '尚雅建筑',
      total: 100,
      remark: ''
    }, {
      companyId: 3,
      price: '尚雅建筑',
      total: 100,
      remark: ''
    }, {
      companyId: 4,
      price: '尚雅建筑',
      total: 100,
      remark: ''
    }
  ]
}

export const handleNewData = (mock) => {
  const data = mock.map(item => {
    const arr = item.items.map(ite => {
      const num = item.projectAreaId * 1000 + ite.projectId
      const priceArr = ite.shops.map(it => parseFloat(it[0]))
      const areaArr = ite.shops.map(it => parseFloat(it[1]))
      const totalPriceArr = ite.shops.map(it => parseFloat(it[2]))
      const maxPriceNum = findMaxNum(priceArr)
      const minPriceNum = findMinNum(priceArr)
      const maxAreaNum = findMaxNum(areaArr)
      const minAreaNum = findMinNum(areaArr)
      return Object.assign({}, ite, {
        projectId: num,
        priceArr,
        areaArr,
        totalPriceArr,
        maxPriceNum,
        minPriceNum,
        maxAreaNum,
        minAreaNum
      })
    })
    return Object.assign({}, item, {
      items: arr
    })
  })
  const deepArr = deepFoolData(data)
  return {
    data,
    deepArr
  }
}

const deepFoolData = (mock) => {
  const data = mock.map(item => item.items)
  let arr = []
  for (const i of data){
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
export const tableDataM = (mock) => {
  mock.forEach((item) => {
    item.priceList = []
    item.areaList = []
    item.remarkList = []
    if (item.jinchun && typeof item.jinchun === 'string') {
      handleTData(item, 'jinchun')
    }
    if (item.shenghuo && typeof item.shenghuo === 'string') {
      handleTData(item, 'shenghuo')
    }
    if (item.jiashite && typeof item.jiashite === 'string') {
      handleTData(item, 'jiashite')
    }
    if (item.jianhua && typeof item.jianhua === 'string') {
      handleTData(item, 'jianhua')
    }
    if (item.mingdu && typeof item.mingdu === 'string') {
      handleTData(item, 'mingdu')
    }
    if (item.tianpeng && typeof item.tianpeng === 'string') {
      handleTData(item, 'tianpeng')
    }
    if (item.zhuangshu && typeof item.zhuangshu === 'string') {
      handleTData(item, 'zhuangshu')
    }
    if (item.chengmei && typeof item.chengmei === 'string') {
      handleTData(item, 'chengmei')
    }
    if (item.zhujia && typeof item.zhujia === 'string') {
      handleTData(item, 'zhujia')
    }
    if (item.meijia && typeof item.meijia === 'string') {
      handleTData(item, 'meijia')
    }
  })
}

const handleTData = (item, key) => {
  item[key] = item[key].split('&')
  item[key] = item[key].slice(0, 10)
  item[key] = handleData(item[key])
  if (!item.hide) { 
    item.hide = handleHide(item, item[key])
  }
  item.priceList.push(item[key][0])
  item.areaList.push(item[key][1])
  item.remarkList.push(item[key][2])
}

const handleData = (data) => {
  if (Array.isArray(data)) { 
    const newData = data.map(item => {
      return item.split("：")[1]
    })
    return newData
  } else {
    return data
  }
}

const handleHide = (item, data) => {
  if (item.hide) return
  if (Array.isArray(data)) {
    let arr = data.slice(0,3)
    for (let i of arr) {
      if (!i) {
        console.log('i', i, data)
        return true
      }
    }
  } else {
    return data
  }
}