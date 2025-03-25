import React, { Component, useEffect, useState } from 'react';
import Taro, { Config, useDidShow, usePullDownRefresh } from '@tarojs/taro';
import { Slot, View } from '@tarojs/components';
import reduce from 'lodash.reduce';
import Nav from '../../../components/nav';
import Toast from '../../../components/vant-weapp/toast/toast';
import { useConfirm } from '../../../hooks/useConfirm';
import { useFreights } from '../../../hooks/useFreights';
import { useNotice } from '../../../hooks/useNotice';
import { useUser } from '../../../hooks/useUser';
import { useBag } from '../../../hooks/useBag';
import { submitOrder } from '../../../hooks/useOrder';
import './confirm.less';

export interface IConfirmProps {}

function ProductCard(props: any) {
  let { data } = props;
  return (
    <View className="product-card">
      <van-card
        price={data.spec_price}
        title={data.product_title}
        thumb={data.product_thumb}
        thumbMode="aspectFill"
        num={data.num}
      >
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
export default function Confirm(props: IConfirmProps) {
  const { psns } = useConfirm();

  const [bag, { removeProdcts }] = useBag();
  const { data: freights } = useFreights();
  const { data: notices } = useNotice('confirm');
  const { data: user, mutate: reGetUser } = useUser();
  const [submit, { isLoading }] = submitOrder();

  useDidShow(() => {
    reGetUser();
  });
  // console.log('-------user', user);

  usePullDownRefresh(() => {
    Taro.stopPullDownRefresh();
  });

  const [address, setAddress]: any = useState(null);

  let addressInfo = '请选择收货地址';
  if (address) {
    addressInfo = `${address.userName} ${address.telNumber} ${address.provinceName}${address.cityName}${address.countyName}${address.detailInfo}`;
  }

  let totalPrice = reduce(
    psns,
    (sum, psn) => {
      return sum + psn.spec_price * psn.num;
    },
    0,
  );
  let freight_type = 'normal';
  let freight_fee: any = null;

  if (freights && address) {
    freight_fee = 0;
    freights.map(freight => {
      if (
        freight.type == freight_type &&
        freight.provinceName == address.provinceName
      ) {
        freight_fee = freight.fee;
      }
    });
  }
  let price = totalPrice + (freight_fee ? freight_fee : 0);

  const handleSubmit = async () => {
    let openid = user.openid;
    let nickName = user.nickName;
    let result: any = await submit({
      openid,
      nickName,
      address,
      psns,
      freight_type,
    });
    let { orderRes, errorMessage } = result;
    if (orderRes) {
      let order_id = orderRes._id;
      Toast.success('提交成功~');
      Taro.redirectTo({ url: `/pages/order/detail/detail?id=${order_id}` });
      const spec_ids = psns.map(psn => {
        return psn.spec_id;
      });
      removeProdcts(spec_ids);
    } else if (errorMessage) {
      Toast(errorMessage);
    }
  };
  let disable = false;
  if (!address || isLoading) {
    disable = true;
  }

  React.useEffect(() => {
    if (!user || !user.openid) {
      Taro.redirectTo({ url: '/pages/login/login' });
    }
  }, []);
  if (!user || !user.openid) {
    return <View></View>;
  }
  return (
    <View className="confirm">
      <van-sticky>
        <Nav
          back={true}
          title="确认订单"
          style={{ backgroundColor: 'white' }}
        />
      </van-sticky>
      <View className="detail">
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
        <van-cell-group>
          <View className="border__bottom">
            <van-cell
              center
              title="收货地址"
              isLink
              label={addressInfo}
              onClick={() => {
                Taro.authorize({ scope: 'scope.address' }).then(() => {
                  Taro.chooseAddress().then(res => {
                    setAddress(res);
                  });
                });
              }}
            />
          </View>
          <View className="card-wapper_van-cell_last">
            <van-cell center title="配送方式" value="普通快递" />
          </View>
        </van-cell-group>
        <View className="list">
          {psns.map(psn => {
            return <ProductCard data={psn} />;
          })}
        </View>
        <van-cell-group title=" ">
          <van-cell title="商品总价" value={`￥${totalPrice}`} />
          {freight_fee != null ? (
            <van-cell title="运费" value={`￥${freight_fee}`} />
          ) : (
            ''
          )}
        </van-cell-group>
      </View>
      <van-toast id="van-toast" />
      <van-submit-bar
        disabled={disable}
        loading={isLoading}
        tip={address ? false : '请选择收货地址'}
        price={price * 100}
        buttonText="提交订单"
        buttonClass="settle"
        priceClass="settle-txt"
        onSubmit={handleSubmit}
      />
    </View>
  );
}
