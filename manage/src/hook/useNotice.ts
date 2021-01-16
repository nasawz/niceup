import useSWR, { mutate } from 'swr';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useNotice(
  dataParams = {
    pageIndex: 0,
    pageSize: 30,
    sortField: 'sort',
    sortDirection: 'desc',
    search: '',
  },
) {
  const { pageIndex, pageSize, sortField, sortDirection, search } = dataParams;
  return useSWR(
    ['Notice', pageIndex, pageSize, sortField, sortDirection, search],
    async () => {
      const queryObj = search
        ? {
            message: db.RegExp({
              regexp: `.*${search}.*`,
              options: 'i',
            }),
          }
        : {};
      const dataRes: any = await db
        .collection('Notice')
        .where(queryObj)
        .orderBy(sortField, sortDirection)
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .get();
      const dataCount: any = await db
        .collection('Notice')
        .where(queryObj)
        .count();

      return {
        list: dataRes.data,
        count: dataCount.total,
      };
    },
  );
}

export function useNoticeById(Id) {
  return useSWR(['Notice', Id], async () => {
    return new Promise(async (resolve, reject) => {
      if (!Id) {
        resolve({});
      } else {
        try {
          const dataRes: any = await db.collection('Notice').doc(Id).get();
          resolve(dataRes.data[0]);
        } catch (error) {
          reject();
        }
      }
    });
  });
}
