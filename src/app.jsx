import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configStore from './store/index.js'

import './assets/icon_font/icon.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore

class App extends Component {
  componentDidMount() {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function () {
      //请求完新版本信息的回调

    })
    //下载新版本
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好,是否重启应用?',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    //新版本下载失败
    updateManager.onUpdateFailed(function (res) {
      console.log(res)
    })
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }
  
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
