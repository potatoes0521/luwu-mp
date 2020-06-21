/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-19 15:04:28
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-19 21:53:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */

export const companyData = [
  {
    companyId: 1,
    companyName: '尚雅建筑',
    totalPrice: 100,
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
    totalPrice: 20736.60,
  },
  {
    companyId: 5,
    companyName: '佳时特',
    totalPrice: 20736.60,
  },
  {
    companyId: 6,
    companyName: '建华',
    totalPrice: 20736.60,
  },
  {
    companyId: 7,
    companyName: '名都',
    totalPrice: 20736.60,
  },
  {
    companyId: 8,
    companyName: '天鹏',
    totalPrice: 20736.60,
  },
  {
    companyId: 9,
    companyName: '装术',
    totalPrice: 20736.60,
  },
  {
    companyId: 9,
    companyName: '美家',
    totalPrice: 20736.60,
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