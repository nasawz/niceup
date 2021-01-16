import useSWR, { mutate } from 'swr';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function usePsn({ sortField, sortDirection, search }, filterParams) {
  return useSWR(
    [
      'Psn',
      sortField,
      sortDirection,
      search,
      filterParams.state?.value,
      filterParams.product_title?.label,
      filterParams.spec_three?.value,
      filterParams.time_range.startDate,
      filterParams.time_range.endDate,
    ],
    async () => {
      // const searchStr = `
      //   _.and([
      //     ${filterParams.state ? `{state: ${filterParams.state.value}},` : ``}
      //     ${filterParams.product_title &&
      //     filterParams.product_title.label != '全部'
      //     ? `{product_title: '${filterParams.product_title.label}'},`
      //     : ``
      //   }
      //     ${filterParams.spec_three
      //     ? `{spec_three: ${filterParams.spec_three.value}},`
      //     : ``
      //   }
      //     ${filterParams.time_range
      //     ? ` {updatedAt:_.and(_.gt(${filterParams.time_range.startDate}), _.lte(${filterParams.time_range.endDate}))},`
      //     : ``
      //   }
      //     ${search
      //     ? `
      //     _.or([
      //           {
      //             nickName: db.RegExp({
      //               regexp: '.*${search}.*',
      //               options: 'i'
      //             })
      //           },
      //           {
      //             name: db.RegExp({
      //               regexp: '.*${search}.*',
      //               options: 'i'
      //             })
      //           },
      //           {
      //             phone: db.RegExp({
      //               regexp: '.*${search}.*',
      //               options: 'i'
      //             })
      //           }
      //     ])
      //     `
      //     : ``
      //   }
      //   ])
      // `;
      // const query = `
      //   db.collection('Psn').aggregate()
      //   .match(${searchStr})
      //   .addFields({
      //     address: $.concat(['$provinceName', '$cityName', '$countyName', '$detailInfo']),
      //     psn:{
      //       name:$.concat(['$product_title', '$spec_title']),
      //       num:"$num"
      //     },
      //     user:$.concat(['$name',' ', '$phone']),
      //     full:$.concat(['$user',' ', '$address']),
      //   })
      //   .addFields({
      //     full:$.concat(['$user',' ', '$address']),
      //   })
      //   .project({
      //     product_thumb: 0,
      //     _openid:0
      //   })
      //   .group({
      //     _id: '$user',
      //     openid:$.first("$openid"),
      //     nickName:$.first("$nickName"),
      //     name:$.first("$name"),
      //     phone:$.first("$phone"),
      //     address:$.first("$address"),
      //     full:$.first("$full"),
      //     oid:$.first('$_id'),
      //     totalWeight: $.sum('$spec_weight'),
      //     totalPrice: $.sum('$spec_price'),
      //     totalCost: $.sum('$_spec_cost'),
      //     psns: $.addToSet('$psn'),
      //     state:$.first("$state"),
      //     spec_three:$.first("$spec_three"),
      //     updatedAt:$.first("$updatedAt"),
      //   })
      //   .addFields({
      //     profit:$.subtract(['$totalPrice', '$totalCost'])
      //   })
      //   .sort({
      //       ${sortField}: ${sortDirection == 'desc' ? -1 : 1},
      //   })
      //   .end()`;
      // const dataRes: any = await miniProxy(ProxyAction.aggregate, { query });

      const dataRes: any = await app.callFunction({
        name: 'aggregate-psn',
        data: {
          tableParams: {
            sortField,
            sortDirection,
            search,
          },
          filterParams,
        },
      });
      // console.log(dataRes.result.list);

      // console.log(dataRes);

      // const list = dataRes.data.map(item => {
      //   return JSON.parse(item);
      // });
      return dataRes.result.list;
    },
  );
}

export function usePsnById(Id) {
  return useSWR(['Psn', Id], async () => {
    return new Promise(async (resolve, reject) => {
      if (!Id) {
        resolve({});
      } else {
        db.collection('Psn').doc(Id).get();
        const dataRes: any = await db.collection('Psn').doc(Id).get();
        if (dataRes.errcode === 0) {
          resolve(JSON.parse(dataRes.data[0]));
        } else {
          reject();
        }
      }
    });
  });
}
