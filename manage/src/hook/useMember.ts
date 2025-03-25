import useSWR, { mutate } from 'swr';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useMember({
  pageIndex,
  pageSize,
  sortField,
  sortDirection,
  search,
}) {
  return useSWR(
    ['User', pageIndex, pageSize, sortField, sortDirection, search],
    async () => {
      const queryObj = search
        ? {
            nickName: db.RegExp({
              regexp: `.*${search}.*`,
              options: 'i',
            }),
          }
        : {};
      const dataRes: any = await db
        .collection('User')
        .where(queryObj)
        .orderBy(sortField, sortDirection)
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .get();

      const dataCount: any = await db
        .collection('User')
        .where(queryObj)
        .count();

      return {
        list: dataRes.data,
        count: dataCount.total,
      };
    },
  );
}

export function useKvById(Id) {
  return useSWR(['User', Id], async () => {
    return new Promise(async (resolve, reject) => {
      if (!Id) {
        resolve({});
      } else {
        try {
          const dataRes: any = await db.collection('User').doc(Id).get();
          resolve(dataRes.data[0]);
        } catch (error) {
          reject();
        }
      }
    });
  });
}
