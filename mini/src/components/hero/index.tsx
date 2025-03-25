import * as React from 'react';
import Taro from '@tarojs/taro';
import { styled } from 'linaria/react';
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import Nav from '../nav';
import './index.less';

import tmpPath from '../../assets/tmp02.jpg';

export interface IHeroProps {
  kv;
}

export default function Hero(props: IHeroProps) {
  let { kv } = props;
  return (
    <View className="hero">
      <Nav back={true} style={{ position: 'absolute', top: 0, left: 0 }} />
      <Image src={kv} mode="aspectFill" />
    </View>
  );
}
