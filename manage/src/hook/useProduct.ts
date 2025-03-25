import useSWR, { mutate } from 'swr';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useProduct(
  dataParams = {
    pageIndex: 0,
    pageSize: 100,
    sortField: 'sort',
    sortDirection: 'desc',
    search: '',
  },
) {
  const { pageIndex, pageSize, sortField, sortDirection, search } = dataParams;
  return useSWR(
    ['Product', pageIndex, pageSize, sortField, sortDirection, search],
    async () => {
      const queryObj = search
        ? {
            title: db.RegExp({
              regexp: `.*${search}.*`,
              options: 'i',
            }),
          }
        : {};
      const dataRes: any = await db
        .collection('Product')
        .where(queryObj)
        .field({
          info: false,
        })
        .orderBy(sortField, sortDirection)
        .skip(pageIndex * pageSize)
        .limit(pageSize)
        .get();

      const dataCount: any = await db
        .collection('Product')
        .where(queryObj)
        .field({
          info: false,
        })
        .count();

      return {
        list: dataRes.data,
        count: dataCount.total,
      };
    },
  );
}

export function useProductById(Id) {
  return useSWR(['Product', Id], async () => {
    return new Promise(async (resolve, reject) => {
      if (!Id) {
        resolve({});
      } else {
        try {
          const dataRes: any = await db.collection('Product').doc(Id).get();
          console.log(dataRes.data[0]);

          resolve(dataRes.data[0]);
        } catch (error) {
          reject();
        }
      }
    });
  });
}

export function useAllProduct() {
  return useSWR(['Product', 'All'], async () => {
    return new Promise(async (resolve, reject) => {
      //       const query = `
      // db.collection('Product').aggregate()
      //   .match({
      //     state:_.gt(-1)
      //   })
      //   .addFields({
      //     label:"$title",
      //     inputDisplay:"$title",
      //     value:"$_id"
      //   })
      //   .project({
      //     _id:0,
      //     label: 1,
      //     inputDisplay:1,
      //     value:1,
      //     sort:1
      //   })
      //   .sort({
      //     sort: -1
      //   })
      //   .end()`;
      //       const dataRes: any = await miniProxy(ProxyAction.aggregate, { query });

      try {
        const dataRes: any = await app.callFunction({
          name: 'get-all-product',
          data: {},
        });
        resolve(dataRes.result.list);
      } catch (error) {
        reject();
      }
    });
  });
}
