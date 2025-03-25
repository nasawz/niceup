import React, { Component, useEffect, useState } from 'react';
import Taro, {
  showShareMenu,
  usePullDownRefresh,
  useShareAppMessage,
} from '@tarojs/taro';
import { View } from '@tarojs/components';
// import { Editor, Frame } from '@craftjs-taro/core';
// import Login from '../../components/login/login';
// import Swiper from '../../components/swiper'
import Kv from '../../components/kv';
import ProductList from '../../components/product-list';
import Tabbar from '../../components/tabbar';
import Nav from '../../components/nav';

// import { styled } from 'linaria/react'
import './index.less';
import { useTag } from '../../hooks/useTag';

// const Title = styled(View) <{ color: string }>`
//   background-color: ${props => props.color};
//   -webkit-transition: background-color 2s, -webkit-transform 2s;
//   transition: background-color 2s, transform 2s;
// `;

// const HW = () => {
//   return (
//     <Title color='red'>
//       Hello World!
//     </Title>
//   )
// }

export default function Index() {
  const [active, setActive] = useState('all');
  const { data: tags } = useTag();

  // https://www.json.cn/
  // let json: any = { "ROOT": { "type": { "resolvedName": "View" }, "isCanvas": true, "props": {}, "displayName": "View", "custom": {}, "hidden": false, "nodes": ["6bfC-WFws", "FBHCwfJlq"], "linkedNodes": {} }, "6bfC-WFws": { "type": { "resolvedName": "Swiper" }, "isCanvas": false, "props": {}, "displayName": "Swiper", "custom": {}, "hidden": false, "nodes": [], "linkedNodes": {}, "parent": "ROOT" }, "FBHCwfJlq": { "type": { "resolvedName": "Swiper" }, "isCanvas": false, "props": {}, "displayName": "Swiper", "custom": {}, "hidden": false, "nodes": [], "linkedNodes": {}, "parent": "ROOT" } }

  showShareMenu({ withShareTicket: true });

  useShareAppMessage(() => {
    return { title: '享瘦厨房' };
  });

  if (!tags) return <View></View>;
  return (
    <View className="index">
      <Kv />
      <van-tabs active={active} onChange={e => setActive(e.detail.name)}>
        <van-tab title="全部" name="all">
          <ProductList key="all" tag="all" curr={active} />
        </van-tab>
        {tags?.map(tag => {
          return (
            <van-tab title={tag.label} name={tag._id}>
              <ProductList key={tag._id} tag={tag._id} curr={active} />
            </van-tab>
          );
        })}
      </van-tabs>
      {/* <HW /> */}
      {/* <van-sticky>
        <van-nav-bar
          title="标题"
          left-text="返回"
          right-text="按钮"
          left-arrow
        />
      </van-sticky>
      <Editor resolver={{ Login, View, Swiper }}>
        <Frame data={json}>
        </Frame>
      </Editor>
      <van-toast id="van-toast" /> */}
      {/* <wemark md={'# heading\n\nText'} link highlight type='wemark' /> */}
      <Tabbar active={0} />
    </View>
  );
}
