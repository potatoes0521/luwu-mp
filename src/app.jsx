import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store/index.js'

import './assets/icon_font/icon.scss'
import './app.scss'

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

  config = {
    pages: [
      // 首页
      'pages/index/index',
      // 我的
      'pages/mine/index',
      // 笔记模块
      'pages/note_mine/index', // 我的笔记
      'pages/note_publish/index', // 发布笔记
      'pages/note_details/index', // 发布的笔记详情
      // 权限鉴权
      'pages/auth/index',
      // 选择品类
      'pages/choose_category/index',
      'pages/choose_brand/index',
      // 表格
      'pages/table_contrast/index',
      // 审报价
      'pages/offer_examine_details/index',
      'pages/offer_examine_publish/index'
    ],
    // tabBar: {
    //   color: "#D8D8D8",
    //   selectedColor: "#333333",
    //   borderStyle: "black",
    //   backgroundColor: "#ffffff",
    //   list: [
    //     {
    //       pagePath: "pages/index/index",
    //       iconPath: "assets/img/tab_bar/home.png",
    //       selectedIconPath: "assets/img/tab_bar/home_active.png",
    //       text: "首页"
    //     },
    //     {
    //       pagePath: "pages/mine/index",
    //       iconPath: "assets/img/tab_bar/mine.png",
    //       selectedIconPath: "assets/img/tab_bar/mine_active.png",
    //       text: "我的"
    //     }
    //   ]
    // },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    "permission": {
      "scope.userLocation": {
        "desc": "您的位置将用于记录您最近去过的建材城效果展示" // 高速公路行驶持续后台定位
      }
    }
  }

  
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
