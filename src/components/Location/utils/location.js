/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-17 18:16:31
 * @LastEditors: liuYang
 * @LastEditTime: 2020-07-16 10:05:36
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro from '@tarojs/taro'
import QQMapWX from '@js/qqmap-wx-jssdk.min.js'

/**
 * 获取用户地理位置信息
 * @return void
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    Taro.getLocation({
      type: 'gcj02'
    }).then(res => {
      resolve(res)
    }).catch((err) => {
      reject(err);
    })
  })
}
 /**
  * 打开地图选择位置 参数与微信文档一样
  * @return void
  */
export const chooseLocation = ({
  latitude,
  longitude,
  }) => {
  return new Promise((resolve, reject) => {
    Taro.chooseLocation({
      latitude,
      longitude,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


var QQMapSDK;

QQMapSDK = new QQMapWX({
  key: 'MVTBZ-KGHKK-ZCMJP-AFTS5-2NQO2-ZHBMJ'
});

/**
 * 使用腾讯地图SDK把坐标转换成地址
 * @param {Number} latitude 纬度
 * @param {Number} longitude 经度
 * @param {Object | String} resultType 
 *     formatted_addresses   // 详细地址
 *     ad_info // 行政区划信息
 *     // 可自我拓展  不传默认返回全部信息
 * @return void
 */
export const convertingGPS = (latitude, longitude, resultType = 'formatted_addresses') => {
  return new Promise((resolve, reject) => {
    QQMapSDK.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: (res) => {
        if (res.status === 0) {
          const data = res.result
          switch (resultType) {
            case 'formatted_addresses':
              resolve(data.formatted_addresses && data.formatted_addresses.recommend)
              break;
            case 'ad_info':
              data.ad_info.city_code = data.ad_info.city_code.substr(3, 6)
              resolve(data.ad_info && data.ad_info)
              break;
            case 'address_component':
              resolve(data.address_component && data.address_component)
              break;
            default:
              resolve(data)
              return;
          }
        } else {
          Taro.showToast(res.message)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
