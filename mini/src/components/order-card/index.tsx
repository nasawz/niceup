import * as React from 'react';
import Taro from '@tarojs/taro';
import { styled } from 'linaria/react';
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  Image,
  Slot,
} from '@tarojs/components';
import copyPath from '../../assets/copy.svg';
// import tmpPath from '../../assets/tmp01.jpg'
const tmpPath = '';

import './index.less';
export interface IOrderCardProps {
  data;
}

export default function OrderCard(props: IOrderCardProps) {
  let { data } = props;

  return (
    <View className="order-card">
      <View className="order-card__title">
        <View className="num">订单编号: {data.outTradeNo}</View>
        <View className="act">
          <van-icon
            name={copyPath}
            size="14PX"
            onClick={() => {
              Taro.setClipboardData({
                data: data.outTradeNo,
                success: function (res) {
                  // Toast.success("复制成功！")
                },
              });
            }}
          />
        </View>
      </View>
      <View
        className="order-card__body"
        onClick={() => {
          Taro.navigateTo({ url: `/pages/order/detail/detail?id=${data._id}` });
        }}
      >
        {data.psns.map(psn => {
          return (
            <View key={psn.spec_id} className="product-card">
              <van-card thumb={psn.product_thumb} thumbMode="aspectFill">
                <Slot name="title">
                  <View className="header">
                    <View className="title">{psn.product_title}</View>
                    <View className="price">￥{psn.spec_price}元</View>
                  </View>
                </Slot>
                <Slot name="desc">
                  <View className="desc">
                    <View className="title">{psn.spec_title}</View>
                    <View className="num">x {psn.num}</View>
                  </View>
                </Slot>
              </van-card>
            </View>
          );
        })}
      </View>
      <View className="order-card__foot">
        <View className="desc">
          价格: ￥{data.price}元{' '}
          {data.freight_fee > 0 && `含运费: ${data.freight_fee}元`}
        </View>

        <View className="act">
          {data.state === 0 && <van-tag color="#909192">未付款</van-tag>}
          {data.state === -1 && <van-tag color="#909192">已关闭</van-tag>}
          {data.state === -2 && <van-tag color="#909192">已退款</van-tag>}
          {data.state === 2 && <van-tag type="warning">待发货</van-tag>}
          {data.state === 4 && <van-tag type="success">已发货</van-tag>}
        </View>
      </View>
    </View>
  );
}
