import * as React from 'react';
import {
  View,
  Text,
  Swiper as TSwiper,
  SwiperItem,
  Image,
} from '@tarojs/components';
import { useTempFileURL } from '../../hooks/tempFileURL';
import { useEffect } from 'react';
import './index.less';

export interface IAppProps {}

export default function Swiper(props: IAppProps) {
  const { status, data: images, error, isFetching, refetch } = useTempFileURL([
    'cloud://xs-wapp.7873-xs-wapp-1303171764/yangcheqianzikefen2.png',
    'cloud://xs-wapp.7873-xs-wapp-1303171764/yangcheqianzikefen.png',
  ]);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <TSwiper
      className="swiper"
      nextMargin="30px"
      previousMargin="30px"
      autoplay
    >
      {images &&
        images!.map(url => {
          return (
            <SwiperItem>
              <View className="swiper-item">
                <View className="card"></View>
              </View>
            </SwiperItem>
          );
        })}
    </TSwiper>
  );
}
