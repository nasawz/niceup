import * as React from 'react';
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Nav from '../../../components/nav';

import OrderCard from '../../../components/order-card';
import './list.less';
import { useState } from 'react';
import OrderList from '../../../components/order-list';

export interface IListProps {}

export default function List(props: IListProps) {
  const { statusBarHeight } = Taro.getSystemInfoSync();
  const [active, setActive] = useState(99);

  // useReachBottom(() => {
  //   console.log('onReachBottom')
  // })

  usePullDownRefresh(() => {
    Taro.stopPullDownRefresh();
  });

  return (
    <View className="order-list">
      <van-sticky>
        <Nav
          back={true}
          title="我的订单"
          style={{ backgroundColor: 'white' }}
        />
      </van-sticky>
      <van-tabs
        active={active}
        onChange={e => setActive(e.detail.name)}
        sticky={true}
        offsetTop={statusBarHeight + 44}
      >
        <van-tab title="全部" name="99">
          <OrderList key="s99" state={99} curr={active} />
        </van-tab>
        <van-tab title="待付款" name="0">
          <OrderList key="s0" state={0} curr={active} />
        </van-tab>
        <van-tab title="待发货" name="2">
          <OrderList key="s2" state={2} curr={active} />
        </van-tab>
        <van-tab title="已发货" name="4">
          <OrderList key="s4" state={4} curr={active} />
        </van-tab>
      </van-tabs>
    </View>
  );
}
