import { useMutation, useQuery } from 'react-query';
import useSWR from 'swr';
import Taro from '@tarojs/taro';
const db = Taro.cloud.database();
const cmd: any = db.command;
const MAX_LIMIT = 6;

function submitOrder() {
  return useMutation(async (params: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { result }: any = await Taro.cloud.callFunction({
          name: 'submit_order',
          data: params,
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function useOrder(id) {
  return useSWR([`order`, id], async () => {
    const result = await db.collection('Order').doc(id).get({});
    let order = result.data;

    return order;
  });
}

function getOrder(id) {
  return new Promise(async resolve => {
    const result = await db.collection('Order').doc(id).get({});

    let order = result.data;
    resolve(order);
  });
}

async function subscribeOrder(id, cb) {
  await db
    .collection('Order')
    .doc(id)
    .update({ data: { subscribe: true } });
  cb();
}

function useOrders(page: number, state: 99, openid) {
  return useSWR(['products', page, state], async () => {
    let where = {
      _openid: openid,
    };
    if (state != 99) {
      where['state'] = state;
    }

    const result = await db
      .collection('Order')
      .field({
        _profit: false,
      })
      .where(where)
      .orderBy('createdAt', 'desc')
      .skip(page * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get();

    let hasMore = result.data.length == MAX_LIMIT;

    return {
      data: result.data,
      hasMore,
    };
  });
}

export { submitOrder, useOrder, subscribeOrder, getOrder, useOrders };
