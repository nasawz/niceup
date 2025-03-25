import React from 'react';
import Taro from '@tarojs/taro';
import { WebView } from '@tarojs/components';

export default function Index() {
  const handleMessage = () => {};

  return <WebView src="https://mp.weixin.qq.com/" onMessage={handleMessage} />;
}
