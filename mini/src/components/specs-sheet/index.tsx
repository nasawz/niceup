import * as React from 'react';
import Taro, { useReachBottom } from '@tarojs/taro';
import { styled } from 'linaria/react';
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import find from 'lodash.find';

function Spec(props: any) {
  let { data, selectSpecId, onSelect } = props;
  let color = '#455a64';
  if (selectSpecId == data._id) color = '#0e9a9c';
  const handleClick = () => {
    onSelect(data._id);
  };
  return (
    <View
      onClick={handleClick}
      style={{ display: 'inline-block', marginBottom: '5PX' }}
    >
      <van-tag plain color={color} size="large">
        {data.title}
      </van-tag>
    </View>
  );
}
export interface IAppProps {
  show;
  onClose;
  specs;
  num;
  specId;
  onChange;
}

export default function SpecsSheet(props: IAppProps) {
  let { show, onClose, specs, num: num_o, specId, onChange } = props;

  let [selectId, setSelectId] = React.useState(specId);
  let [num, setNum] = React.useState(num_o);
  const handleSelect = id => {
    setSelectId(id);
  };
  const handleChangeNum = e => {
    setNum(e.detail);
  };
  const handleClose = () => {
    setSelectId(specId);
    setNum(num_o);
    onClose();
  };

  const handOk = () => {
    onChange(selectId, num);
    onClose();
  };

  let selectSpec = specs
    ? find(specs, o => {
        return o._id == selectId;
      })
    : null;

  return (
    <van-action-sheet show={show} title="选择规格" onClose={handleClose}>
      <View className="spec">
        <View className="section">
          <View className="title">价格:</View>
          <View className="price">
            {selectSpec ? `￥${selectSpec.price}` : '-'}
          </View>
        </View>
        <View className="section">
          <View className="title">规格:</View>
          <View className="tags">
            {specs.map(data => {
              return (
                <Spec
                  data={data}
                  selectSpecId={selectId}
                  onSelect={handleSelect}
                />
              );
            })}
          </View>
        </View>
        <View className="section">
          <View className="title">数量:</View>
          <van-stepper value={num} onChange={handleChangeNum} />
        </View>
        <View className="section">
          <van-button color="#0e9a9c" block onClick={handOk}>
            加入购物车
          </van-button>
        </View>
      </View>
    </van-action-sheet>
  );
}
