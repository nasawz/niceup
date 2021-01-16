import useSWR, { mutate } from 'swr';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useSpec(
  { pageIndex, pageSize, sortField, sortDirection, search },
  productId,
) {
  return useSWR(
    ['Spec', productId, pageIndex, pageSize, sortField, sortDirection, search],
    async () => {
      const queryObj = search
        ? {
            title: db.RegExp({
              regexp: `.*${search}.*`,
              options: 'i',
            }),
            product_id: productId,
          }
        : { product_id: productId };
      const dataRes: any = await db
        .collection('Spec')
        .where(queryObj)
        .orderBy(sortField, sortDirection)
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .get();

      const dataCount: any = await db
        .collection('Spec')
        .where(queryObj)
        .count();

      return {
        list: dataRes.data,
        count: dataCount.total,
      };
    },
  );
}

export function useSpecById(Id) {
  return useSWR(['Spec', Id], async () => {
    return new Promise(async (resolve, reject) => {
      if (!Id) {
        resolve({});
      } else {
        try {
          const dataRes: any = await db.collection('Spec').doc(Id).get();
          resolve(dataRes.data[0]);
        } catch (error) {
          reject();
        }
      }
    });
  });
}
