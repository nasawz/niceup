import Logger from 'react-markdown-editor-lite/plugins/logger';
import useSWR, { mutate } from 'swr';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useTag(
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
    ['Tag', pageIndex, pageSize, sortField, sortDirection, search],
    async () => {
      const queryObj = search
        ? {
            label: db.RegExp({
              regexp: `.*${search}.*`,
              options: 'i',
            }),
          }
        : {};
      const dataRes: any = await db
        .collection('Tag')
        .where(queryObj)
        .orderBy(sortField, sortDirection)
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .get();

      const dataCount: any = await db.collection('Tag').where(queryObj).count();

      return {
        list: dataRes.data,
        count: dataCount.total,
      };
    },
  );
}

export function useTagById(Id) {
  return useSWR(['Tag', Id], async () => {
    return new Promise(async (resolve, reject) => {
      if (!Id) {
        resolve({});
      } else {
        try {
          const dataRes: any = await db.collection('Tag').doc(Id).get();
          resolve(dataRes.data[0]);
        } catch (error) {
          reject();
        }
      }
    });
  });
}
