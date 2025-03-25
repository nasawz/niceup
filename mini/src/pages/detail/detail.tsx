import React, { Component, useEffect, useRef, useState } from 'react';
import Taro, {
  Config,
  getCurrentInstance,
  requirePlugin,
  showShareMenu,
  useShareAppMessage,
  useShareTimeline,
} from '@tarojs/taro';
import { Slot, View } from '@tarojs/components';
import find from 'lodash.find';
import Toast from '../../components/vant-weapp/toast/toast';
import Hero from '../../components/hero';
import SpecsSheet from '../../components/specs-sheet';
import { useProduct } from '../../hooks/useProducts';
import { useBag } from '../../hooks/useBag';
import { useConfirm } from '../../hooks/useConfirm';

import './detail.less';
import { useNotice } from '../../hooks/useNotice';

export default function Detail() {
  // 1小时
  // 60 * 60 * 1000
  // const time = 60 * 60 * 1000
  const { data: notices } = useNotice('detail');
  const { addConfirm } = useConfirm();
  let params: any = getCurrentInstance().router?.params;
  const { id } = params;

  const { data } = useProduct(id);
  const [bag, { addProdct }] = useBag();

  const [show, setShow] = useState(false);
  const addFlag = useRef(false);

  const [selectObj, setSelectObj] = useState({
    num: 1,
    specId: null,
  });

  let selectSpec = data
    ? find(data.specs, o => {
        return o._id == selectObj.specId;
      })
    : null;

  useEffect(() => {
    if (addFlag.current && selectSpec) {
      doAdd();
      addFlag.current = false;
    }
  }, [selectSpec]);

  useShareTimeline(() => {
    return {
      title: data?.title,
    };
  });
  useShareAppMessage(() => {
    return {
      title: data?.title,
    };
  });
  showShareMenu({ withShareTicket: true });
  if (!data) {
    return <View></View>;
  }

  let endTime: number = data.end;
  let time: number = endTime - new Date().getTime();
  let isEnd = time < 0 ? true : false;

  const handleChange = (specId, num) => {
    setSelectObj({
      num,
      specId,
    });
  };
  const handleClose = () => {
    setShow(false);
    addFlag.current = false;
  };

  const handleAddBag = () => {
    addFlag.current = true;
    setShow(true);
  };

  const doAdd = () => {
    Toast.success('加入成功~');
    addProdct(data, selectSpec, selectObj.num);
  };

  const handleBay = () => {
    if (selectObj.specId) {
      let psn = {
        product_id: data._id,
        product_title: data.title,
        product_thumb: data.thumb,
        spec_id: selectSpec._id,
        spec_title: selectSpec.title,
        spec_price: selectSpec.price,
        spec_weight: selectSpec.weight,
        spec_three: selectSpec.three,
        num: selectObj.num,
      };
      addConfirm([psn]);
      Taro.navigateTo({ url: '/pages/bag/confirm/confirm' });
    } else {
      setShow(true);
    }
  };

  return (
    <View className="detail">
      <Hero kv={data.kv} />

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
      <View className="info">
        <View className="price">￥{data.price}</View>
        <View className="title">{data.title}</View>
      </View>
      <van-cell-group>
        <View className="border__bottom">
          <van-cell
            title="选择规格"
            value={
              selectObj.specId ? `${selectSpec.title} x ${selectObj.num}` : ' '
            }
            isLink
            onClick={() => {
              addFlag.current = true;
              setShow(true);
            }}
          />
        </View>
        <van-cell title={isEnd ? '已结束' : '距离结束'}>
          {!isEnd && (
            <van-count-down time={time} format="DD 天 HH 时 mm 分 ss 秒" />
          )}
        </van-cell>
        {/* <van-cell title="配送" value="内容" isLink /> */}
      </van-cell-group>

      <View className="markdown">
        <wemark md={data.info} link highlight type="wemark" />
      </View>
      <van-toast id="van-toast" />

      <SpecsSheet
        show={show}
        onClose={handleClose}
        num={selectObj.num}
        specs={data.specs}
        specId={selectObj.specId}
        onChange={handleChange}
      />

      <van-goods-action>
        {/* <van-goods-action-icon icon="chat-o" text="客服" /> */}
        <van-goods-action-icon
          onClick={() => {
            Taro.switchTab({ url: '/pages/bag/bag' });
          }}
          icon="shopping-cart-o"
          text="购物车"
          info={bag.length > 0 ? bag.length : null}
        />
        <van-goods-action-button
          color="#6DCFD0"
          text="加入购物车"
          type="warning"
          onClick={handleAddBag}
        />
        <van-goods-action-button
          color="#0e9a9c"
          text="立即购买"
          onClick={handleBay}
        />
      </van-goods-action>
    </View>
  );
}
