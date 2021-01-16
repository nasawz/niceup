import React, { Component, useEffect } from 'react';
import Taro, { Config, useDidShow, usePullDownRefresh } from '@tarojs/taro';
import { Slot, View } from '@tarojs/components';
import reduce from 'lodash.reduce';
import { useBag } from '../../hooks/useBag';
import { useConfirm } from '../../hooks/useConfirm';
import Tabbar from '../../components/tabbar';
import Nav from '../../components/nav';
import './bag.less';
import { useNotice } from '../../hooks/useNotice';

function ProductCard(props: any) {
  let { data, removeProdct, updateProdct } = props;
  const handleChangeNum = e => {
    updateProdct(data.product_id, data.spec_id, e.detail);
  };
  return (
    <View className="product-card">
      <van-card
        price={data.spec_price}
        title={data.product_title}
        thumb={data.product_thumb}
        thumbMode="aspectFill"
        thumbLink={`/pages/detail/detail?id=${data.product_id}`}
      >
        <Slot name="num">
          <View className="stepper">
            <van-stepper value={data.num} onChange={handleChangeNum} />
            <van-button
              icon="delete"
              onClick={() => {
                removeProdct(data.product_id, data.spec_id);
              }}
            />
          </View>
        </Slot>
        <Slot name="desc">
          <View className="tags">
            <van-tag plain color="#0e9a9c" size="medium">
              {data.spec_title}
            </van-tag>
          </View>
        </Slot>
      </van-card>
    </View>
  );
}

export default function Bag() {
  const { data: notices } = useNotice('bag');
  const [bag, { reGetBag, addProdct, removeProdct, updateProdct }] = useBag();
  const { addConfirm } = useConfirm();

  usePullDownRefresh(() => {
    Taro.stopPullDownRefresh();
  });
  let psns = bag;

  let totalPrice = reduce(
    psns,
    (sum, psn) => {
      return sum + psn.spec_price * psn.num;
    },
    0,
  );

  useDidShow(() => {
    reGetBag();
  });

  const handleSumbit = () => {
    addConfirm(bag);
    Taro.navigateTo({ url: '/pages/bag/confirm/confirm' });
  };

  let renderList = () => {
    return (
      <>
        <View className="list">
          {psns.map(psn => {
            return (
              <ProductCard
                data={psn}
                removeProdct={removeProdct}
                updateProdct={updateProdct}
              />
            );
          })}
        </View>
        <View className="bar-wapper">
          <van-submit-bar
            price={totalPrice * 100}
            buttonText="结算"
            buttonClass="settle"
            priceClass="settle-txt"
            onSubmit={handleSumbit}
          />
        </View>
      </>
    );
  };
  return (
    <View className="bag">
      <van-sticky>
        <Nav title="购物车" style={{ backgroundColor: 'white' }} />
      </van-sticky>
      {notices && notices?.length > 0 ? (
        <van-notice-bar
          left-icon={notices[0].icon}
          color={notices[0].color}
          background={notices[0].background}
          scrollable
          text={notices[0].message}
          onClick={() => {
            if (notices[0].needFeedback) {
              Taro.navigateToMiniProgram({
                appId: 'wx8abaf00ee8c3202e',
                extraData: { id: '296232' },
              });
            }
          }}
        />
      ) : (
        ''
      )}
      {psns.length > 0 ? (
        renderList()
      ) : (
        <van-empty description="您的购物车内没有商品">
          <van-button
            round
            type="default"
            className="btn-more"
            onClick={() => {
              Taro.switchTab({ url: '/pages/index/index' });
            }}
          >
            去逛逛
          </van-button>
        </van-empty>
      )}
      <Tabbar active={1} info={bag.length} />
    </View>
  );
}
