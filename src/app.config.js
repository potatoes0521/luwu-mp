export default {
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
    'pages/choose_house_type/index',
    'pages/choose_one_item/index',
    // 表格
    'pages/table_contrast/index',
    // 审报价
    'pages/offer_examine_details/index',
    'pages/offer_examine_publish/index',
    // 招标
    'pages/bidding_publish/index',
    'pages/bidding_details/index',
    'pages/bidding_list/index',
    'pages/bidding_company/index',

    'pages/house_publish/index',
    'pages/vip/index'
  ],
  tabBar: {
    color: "#D8D8D8",
    selectedColor: "#333333",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    list: [{
        pagePath: "pages/index/index",
        iconPath: "assets/img/tab_bar/home.png",
        selectedIconPath: "assets/img/tab_bar/home_active.png",
        text: "装修|建材"
      },
      {
        pagePath: "pages/mine/index",
        iconPath: "assets/img/tab_bar/mine.png",
        selectedIconPath: "assets/img/tab_bar/mine_active.png",
        text: "我的"
      }
    ]
  },
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
