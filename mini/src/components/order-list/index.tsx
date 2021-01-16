import { View } from '@tarojs/components';
import Taro, { useReachBottom } from '@tarojs/taro';
import * as React from 'react';
import { useUser } from '../../hooks/useUser';
import { useOrders } from '../../hooks/useOrder';
import OrderCard from '../order-card';
import uniqby from 'lodash.uniqby';

export interface IOrderListProps {
  curr;
  state;
}

export default function OrderList(props: IOrderListProps) {
  const { curr, state } = props;

  const { data: user } = useUser();
  const [data, setData]: any = React.useState([]);

  const [page, setPage] = React.useState(0);

  const { data: resolvedData } = useOrders(page, state, user.openid);

  useReachBottom(() => {
    if (parseInt(curr) == state) {
      setPage(old =>
        !resolvedData || !resolvedData['hasMore'] ? old : old + 1,
      );
    }
  });

  React.useEffect(() => {
    if (resolvedData?.data) {
      setData(old => uniqby([...old, ...resolvedData.data], '_id'));
    }
  }, [resolvedData]);
  // console.log(data);

  return (
    <View style={{ padding: '9PX' }}>
      <van-row gutter="10">
        {data.map(item => {
          return <OrderCard data={item} />;
        })}
        {data && data.length == 0 && (
          <van-empty description="目前没有订单哦~" />
        )}
      </van-row>
    </View>
  );
}
