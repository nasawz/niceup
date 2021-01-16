import { miniTitle } from './variables';
export default {
  pages: [
    'pages/index/index',
    // 'pages/detail/detail',
    'pages/profile/profile',
    'pages/groupon/groupon',
    'pages/bag/bag',
    'pages/h5/h5',
    // 'pages/bag/confirm/confirm',
    // 'pages/order/list/list',
    // 'pages/order/detail/detail',
    'pages/login/login',
  ],
  subPackages: [
    // {
    //   root: "pages/detail/",
    //   pages: [
    //     'detail'
    //   ]
    // },
    {
      root: 'pages/detail/',
      pages: ['detail'],
    },
    {
      root: 'pages/order/',
      pages: ['list/list', 'detail/detail'],
    },
    {
      root: 'pages/bag/confirm/',
      pages: ['confirm'],
    },
    // {
    //   root: "pages/login/",
    //   pages: [
    //     'login'
    //   ]
    // }
  ],
  tabBar: {
    custom: true,
    // "color": "#000000",
    // "selectedColor": "#000000",
    // "backgroundColor": "#000000",
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/bag/bag',
        text: '购物车',
      },
      {
        pagePath: 'pages/profile/profile',
        text: '个人中心',
      },
    ],
  },
  usingComponents: {
    'van-button': './components/vant-weapp/button/index',
    'van-toast': './components/vant-weapp/toast/index',
    'van-tab': './components/vant-weapp/tab/index',
    'van-tabs': './components/vant-weapp/tabs/index',
    'van-sticky': './components/vant-weapp/sticky/index',
    'van-row': './components/vant-weapp/row/index',
    'van-col': './components/vant-weapp/col/index',
    'van-tabbar': './components/vant-weapp/tabbar/index',
    'van-tabbar-item': './components/vant-weapp/tabbar-item/index',
    'van-goods-action': './components/vant-weapp/goods-action/index',
    'van-goods-action-icon': './components/vant-weapp/goods-action-icon/index',
    'van-goods-action-button':
      './components/vant-weapp/goods-action-button/index',
    'van-cell': './components/vant-weapp/cell/index',
    'van-cell-group': './components/vant-weapp/cell-group/index',
    'van-icon': './components/vant-weapp/icon/index',
    'van-notice-bar': './components/vant-weapp/notice-bar/index',
    'van-count-down': './components/vant-weapp/count-down/index',
    'van-action-sheet': './components/vant-weapp/action-sheet/index',
    'van-stepper': './components/vant-weapp/stepper/index',
    'van-tag': './components/vant-weapp/tag/index',
    'van-image': './components/vant-weapp/image/index',
    'van-submit-bar': './components/vant-weapp/submit-bar/index',
    'van-empty': './components/vant-weapp/empty/index',
    'van-card': './components/vant-weapp/card/index',
    // "wemark": "./components/wemark/wemark",
    // "f2": "./components/wx-f2/index"
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: miniTitle,
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  },
  cloud: true,
};
