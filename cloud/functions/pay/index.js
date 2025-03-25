const cloud = require('wx-server-sdk');
const Puid = require('puid');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const puid = new Puid(true);
exports.main = async (event, context) => {
  return new Promise(async (mainResolve, mainReject) => {
    let { totalFee, outTradeNo: id, body, goodsTag, openid, detail } = event;

    console.log('---------');
    console.log(detail);

    try {
      const chkPsn = psn => {
        return new Promise(async (resolve, reject) => {
          // TODO check psn state time
          // let { data: spec } = await db.collection('Spec').doc(psn.spec_id).get()
          let { data: product } = await db
            .collection('Product')
            .doc(psn.product_id)
            .get();
          if (product.end < new Date().getTime()) {
            reject(new Error(`${product.title}团购已结束`));
          }
          resolve({});
        });
      };

      await Promise.all(
        JSON.parse(detail).goods_detail.map(async psn => {
          let res = await chkPsn(psn);
          return res;
        }),
      );

      let outTradeNo = puid.generate();
      await db.collection('Order').doc(id).update({
        data: {
          outTradeNo,
        },
      });

      let cost_price = 0;
      const fix_goods_detail = JSON.parse(detail).goods_detail.map(psn => {
        psn.price = psn.price * 100;
        cost_price = cost_price + psn.price;
        delete psn.spec_id;
        delete psn.product_id;
        delete psn.goods_name;
        return psn;
      });

      const fixDetail = JSON.stringify({
        cost_price,
        goods_detail: fix_goods_detail,
      });

      console.log('---------');
      console.log(fixDetail);

      const res = await cloud.cloudPay.unifiedOrder({
        body,
        detail: fixDetail,
        outTradeNo,
        spbillCreateIp: '127.0.0.1',
        subMchId: process.env.subMchId,
        totalFee: parseInt(totalFee * 100),
        tradeType: 'JSAPI',
        envId: process.env.envId,
        functionName: 'pay_cb',
        openid,
        // goodsTag: "",
        attach: id,
        version: '1.0',
      });
      // return res
      mainResolve({ payRes: res });
    } catch (error) {
      mainResolve({ errorMessage: error.message });
    }
  });
};
// let detail = {
//   goods_detail: [
//     { goods_id, goods_name, quantity, price }
//   ]
// }
// {
//   "cost_price": 608800,
//     "receipt_id": "wx123",
//       "goods_detail": [ //注意goods_detail字段的格式为"goods_detail":[{}],较多商户写成"goods_detail":{}
//         {
//           "goods_id": "商品编码",
//           "wxpay_goods_id": "1001",
//           "goods_name": "",
//           "quantity": 1,
//           "price": 528800
//         },
//         {
//           "goods_id": "商品编码",
//           "wxpay_goods_id": "1002",
//           "goods_name": "iPhone6s 32G",
//           "quantity": 1,
//           "price": 608800
//         }
//       ]
// }
