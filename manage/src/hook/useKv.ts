import useSWR, { mutate } from 'swr';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useKv({
  pageIndex,
  pageSize,
  sortField,
  sortDirection,
  search,
}) {
  return useSWR(
    ['Kv', pageIndex, pageSize, sortField, sortDirection, search],
    async () => {
      const queryObj = search
        ? {
            title: db.RegExp({
              regexp: `.*${search}.*`,
              options: 'i',
            }),
          }
        : {};
      const dataRes: any = await db.collection('Kv').where(queryObj).get();

      const dataCount: any = await db.collection('Kv').where(queryObj).count();
      return {
        list: dataRes.data,
        count: dataCount.total,
      };
    },
  );
}

export function useKvById(Id) {
  return useSWR(['Kv', Id], async () => {
    return new Promise(async (resolve, reject) => {
      if (!Id) {
        resolve({});
      } else {
        try {
          const dataRes: any = await db.collection('Kv').doc(Id).get();
          resolve(dataRes.data[0]);
        } catch (error) {
          reject();
        }
      }
    });
  });
}
