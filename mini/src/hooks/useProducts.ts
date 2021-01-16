import { usePaginatedQuery, useQuery } from 'react-query';
import useSWR from 'swr';
import Taro from '@tarojs/taro';
import { weAtob } from '../lib/b64';
const db = Taro.cloud.database();
const cmd: any = db.command;
const MAX_LIMIT = 10;

function useProducts(page: number, tag: string) {
  return useSWR(['products', page, tag], async () => {
    let where = { state: 1, verify: true };

    if (tag != 'all') {
      where['tags'] = {
        value: tag,
      };
    }

    const result = await db
      .collection('Product')
      .field({
        info: false,
        kv: false,
      })
      .where(where)
      .orderBy('sort', 'desc')
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

function useProduct(id) {
  return useSWR(['products', id], async () => {
    const result = await db.collection('Product').doc(id).get({});
    const specs = await db
      .collection('Spec')
      .where({ product_id: id })
      .orderBy('sort', 'desc')
      .get();
    let product = result.data;
    product.info = decodeURIComponent(weAtob(product.info));
    product.specs = specs.data;
    return product;
  });
}

export { useProducts, useProduct };
