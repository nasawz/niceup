import React, { Component } from 'react';
import Taro, { Config } from '@tarojs/taro';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
const queryCache = new QueryCache();

import './app.less';

class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({});
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <ReactQueryCacheProvider queryCache={queryCache}>
        {this.props.children}
      </ReactQueryCacheProvider>
    );
  }
}

export default App;
