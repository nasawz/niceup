const cloud = require('wx-server-sdk');
const reduce = require('lodash.reduce');
const keyBy = require('lodash.keyby');
const Puid = require('puid');
const puid = new Puid(true);

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  let { openid, nickName, address, psns, freight_type } = event;
  return new Promise(async (resolve, reject) => {
    let outTradeNo = puid.generate();
    let totalPrice = reduce(
      psns,
      (sum, psn) => {
        return sum + psn.spec_price * psn.num;
      },
      0,
    );

    let weight = reduce(
      psns,
      (sum, psn) => {
        return sum + psn.spec_weight * psn.num;
      },
      0,
    );

    const freights = await db
      .collection('Freight')
      .where({
        state: 1,
      })
      .limit(100)
      .get();
    let freight_fee = 0;
    freights.data.map(freight => {
      if (
        freight.type == freight_type &&
        freight.provinceName == address.provinceName
      ) {
        freight_fee = freight.fee;
      }
    });

    let price = totalPrice + (freight_fee ? freight_fee : 0);
    let name = address.userName;
    let phone = address.telNumber;
    let provinceName = address.provinceName;
    let cityName = address.cityName;
    let countyName = address.countyName;
    let detailInfo = address.detailInfo;
    let state = 0;
    let payed_fee = 0;
    let createdAt = new Date().getTime();

    let order = {
      state,
      outTradeNo,
      name,
      phone,
      provinceName,
      cityName,
      countyName,
      detailInfo,
      price,
      weight,
      freight_type,
      freight_fee,
      payed_fee,
      createdAt,
      openid,
      nickName,
      _openid: openid,
      exp: [],
      psns: psns,
    };

    try {
      const chkPsn = psn => {
        return new Promise(async (resolve, reject) => {
          // TODO check psn state time
          let { data: spec } = await db
            .collection('Spec')
            .doc(psn.spec_id)
            .get();
          let { data: product } = await db
            .collection('Product')
            .doc(psn.product_id)
            .get();
          if (product.end < new Date().getTime()) {
            reject(new Error(`${product.title}团购已结束`));
          }
          // TODO check price
          resolve({
            _id: psn.spec_id,
            _cost: spec._cost,
          });
        });
      };

      const chkPsns = await Promise.all(
        psns.map(async psn => {
          let res = await chkPsn(psn);
          return res;
        }),
      );

      const costs = keyBy(chkPsns, '_id');

      let orderRes = await db.collection('Order').add({ data: order });
      let order_id = orderRes._id;

      psns = psns.map(psn => {
        psn.openid = openid;
        psn.nickName = nickName;
        psn.name = name;
        psn.phone = phone;
        psn.provinceName = provinceName;
        psn.cityName = cityName;
        psn.countyName = countyName;
        psn.detailInfo = detailInfo;
        psn._openid = openid;
        psn.order_id = order_id;
        psn.createdAt = createdAt;
        psn.updatedAt = createdAt;
        psn.state = state;
        psn._spec_cost = costs[psn.spec_id]._cost;
        return psn;
      });

      const functionWithPromise = psn => {
        return new Promise(async (resolve, reject) => {
          let res = await db.collection('Psn').add({
            data: psn,
          });
          resolve(res);
        });
      };

      const psnsRes = await Promise.all(
        psns.map(async psn => {
          let res = await functionWithPromise(psn);
          return res;
        }),
      );

      resolve({ orderRes, psnsRes });
    } catch (error) {
      resolve({ errorMessage: error.message });
    }
  });
};
