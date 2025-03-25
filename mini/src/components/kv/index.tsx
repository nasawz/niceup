import * as React from 'react';
import Taro from '@tarojs/taro';
import { styled } from 'linaria/react';
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import { useState } from 'react';
import Nav from '../nav';

import { useKv } from '../../hooks/useKv';

const Header = styled(View)<{}>`
  -webkit-transition: background-color 1s, -webkit-transform 1s;
  transition: background-color 1s, transform 1s;
`;

const KvContainer = styled(View)<{}>`
  height: 280px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
`;

const KvCard = styled(Image)<{}>`
  height: 272px;
  width: 714px;
  border-radius: 20px;
  margin: 0px 18px;
`;

export interface IKvProps {}

export default function Kv(props: IKvProps) {
  const { data } = useKv();
  const [bgColor, setBgColor] = useState('');
  React.useEffect(() => {
    if (data && data?.length > 0) {
      setBgColor(data[0].color);
    }
  }, [data]);

  const handleChange = e => {
    let { current } = e.detail;
    if (data) {
      let { color }: any = data[current];
      setBgColor(color);
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      <Header style={{ backgroundColor: bgColor }}>
        <van-sticky>
          <Nav style={{ backgroundColor: bgColor }} />
        </van-sticky>
        <View style={{ height: `${Taro.pxTransform(226)}` }}></View>
      </Header>
      <View
        style={{ height: Taro.pxTransform(72), backgroundColor: 'white' }}
      ></View>
      <KvContainer>
        <Swiper autoplay onChange={handleChange}>
          {data?.map(item => {
            return (
              <SwiperItem
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/detail/detail?id=${item.jump}`,
                  });
                }}
              >
                <KvCard src={item.url} />
              </SwiperItem>
            );
          })}
        </Swiper>
      </KvContainer>
    </View>
  );
}
