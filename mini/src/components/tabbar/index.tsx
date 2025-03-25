import * as React from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { styled } from 'linaria/react';
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import { useBag } from '../../hooks/useBag';
export interface ITabbarProps {
  active?;
  info?;
}

export default function Tabbar(props: ITabbarProps) {
  let { active, info } = props;

  const [bag, { reGetBag }] = useBag();
  useDidShow(() => {
    reGetBag();
  });

  let count = bag.length > 0 ? bag.length : null;
  if (info != undefined) {
    count = info > 0 ? info : null;
  }
  const handleChange = e => {
    let pages = [
      { url: '/pages/index/index' },
      { url: '/pages/bag/bag' },
      { url: '/pages/profile/profile' },
    ];
    Taro.switchTab(pages[e.detail]);
  };
  return (
    <van-tabbar active={active} activeColor="#0e9a9c" onChange={handleChange}>
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" info={count}>
        购物车
      </van-tabbar-item>
      <van-tabbar-item icon="user-o">个人中心</van-tabbar-item>
    </van-tabbar>
  );
}
