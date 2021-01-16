import useSWR, { mutate } from 'swr';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useOrder({
  pageIndex,
  pageSize,
  sortField,
  sortDirection,
  search,
}) {
  return useSWR(
    ['Order', pageIndex, pageSize, sortField, sortDirection, search],
    async () => {
      const dataRes: any = await app.callFunction({
        name: 'get-orders',
        data: {
          pageIndex,
          pageSize,
          sortField,
          sortDirection,
          search,
        },
      });
      return dataRes.result;
    },
  );
}

export function useOrderById(Id) {
  return useSWR(['Order', Id], async () => {
    return new Promise(async (resolve, reject) => {
      if (!Id) {
        resolve({});
      } else {
        try {
          const dataRes: any = await app.callFunction({
            name: 'get-order',
            data: {
              Id,
            },
          });
          resolve(dataRes.result.data);
        } catch (error) {
          reject();
        }
      }
    });
  });
}
