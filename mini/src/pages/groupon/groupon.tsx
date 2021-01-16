import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
// import { styled } from 'linaria/react'
import './index.less';

export default function Index() {
  useEffect(() => {
    Taro.switchTab({ url: '/pages/index/index' });
  }, []);

  return (
    <View className="index">
      <View className="wapper">
        <View className="btn">
          <van-button
            type="primary"
            block
            onClick={() => {
              Taro.switchTab({ url: '/pages/index/index' });
            }}
          >
            进入新版
          </van-button>
        </View>
        <View className="desc">本页面专门为兼容旧版小程序所留.</View>
      </View>
    </View>
  );
}
