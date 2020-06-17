/*
 * @Author: liuYang
 * @description: 数据控制跳转
 * @path: @utils/navigator
 * @Date: 2020-06-17 11:30:28
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-17 17:32:35
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Taro from '@tarojs/taro'
import { objectToString } from './hadleParams'

/**
 * 函数跳转
 * @param {String} openMode 跳转方式
 * @param {String} pageName 跳转页面
 * @param {Object} params 参数
 * @param {String} appId openMode 为mp时跳转小程序的小程序appid
 * @return void
 */
// eslint-disable-next-line import/prefer-default-export
export const handleNavigator = ({openMode, pageName, params, appId}) => {
  const strParams = objectToString(params)
  switch (openMode) {
    case 'h5': // 跳转H5
      Taro.navigateTo({
        url: `/pages/web_view/index?${strParams || ''}`
      })
      break;
    case 'mp': // 跳转小程序
      Taro.navigateToMiniProgram({
        appId,
        path: pageName,
      })
      break;
    case 'navigator': // 小程序页面跳转 可以返回
      Taro.navigateTo({
        url: `/pages/${pageName}/index?${strParams || ''}`
      })
      break;
    case 'redirectTo': // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
      Taro.redirectTo({
        url: `/pages/${pageName}/index?${strParams || ''}`
      })
      break;
    case 'switchTab': // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
      Taro.switchTab({
        url: `/pages/${pageName}/index`
      })
      break;
    case 'reLaunch': // 关闭所有页面，打开到应用内的某个页面
      Taro.reLaunch({
        url: `/pages/${pageName}/index?${strParams || ''}`
      })
      break;
    default:
      console.error('handleNavigator default in utils/navigator.js')
      return
  }
}
