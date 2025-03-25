import _ from 'lodash';
import useSWR from 'swr';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useDashBoard(startDate, endDate) {
  return useSWR(['DashBoard', startDate, endDate], async () => {
    return new Promise(async (resolve, reject) => {
      const dataRes: any = await app.callFunction({
        name: 'aggregate-sales',
        data: { startDate, endDate },
      });
      const {
        allOrderRes,
        allProductRes,
        newOrderRes,
        psns2Res,
      } = dataRes.result;

      const salesData: any = [];
      const costData: any = [];
      const profitData: any = [];
      const priceData: any = [];
      _.map(psns2Res.list, psn => {
        salesData.push([psn._id, psn.sales]);
        costData.push([psn._id, psn.cost]);
        profitData.push([psn._id, psn.profit]);
        priceData.push([psn._id, psn.price]);
      });

      resolve({
        newOrderCount:
          newOrderRes.list.length == 1 ? newOrderRes.list[0].count : 0,
        allOrderCount:
          allOrderRes.list.length == 1 ? allOrderRes.list[0].count : 0,
        allProductCount:
          allProductRes.list.length == 1 ? allProductRes.list[0].count : 0,
        salesData,
        costData,
        profitData,
        priceData,
        psns: psns2Res.list,
      });
    });
  });
}
