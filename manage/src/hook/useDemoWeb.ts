import useSWR, { mutate } from 'swr';
import { app } from '../lib/tcb';
const db = app.database();

export function useDemoWeb({
  pageIndex,
  pageSize,
  sortField,
  sortDirection,
  search,
}) {
  return useSWR(
    ['demo_web', pageIndex, pageSize, sortField, sortDirection, search],
    async () => {
      const where = search
        ? {
            title: db.RegExp({
              regexp: `.*${search}.*`,
              options: 'i',
            }),
          }
        : {};
      const query = db
        .collection('demo_web')
        .where(where)
        .orderBy(sortField, sortDirection)
        .skip(pageIndex * pageSize)
        .limit(pageSize);
      const countRes = await query.count();
      const dataRes = await query.get();

      return {
        count: countRes.total,
        list: dataRes.data,
      };
    },
  );
}

export function useDemoWebById(Id) {
  return useSWR(['demo_web', Id], async () => {
    return new Promise((resolve, reject) => {
      if (!Id) {
        resolve({});
      }
      db.collection('demo_web')
        .doc(Id)
        .get()
        .then(res => {
          if (res.data.length > 0) {
            resolve(res.data[0]);
          } else {
            reject(new Error());
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  });
}
