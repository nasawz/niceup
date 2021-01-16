const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async (event, context) => {
  const { out_refund_no, total_fee, order_id } = event;
  const res = await cloud.cloudPay.refund({
    out_refund_no: out_refund_no, //商户退款单号
    out_trade_no: out_refund_no, //商户订单号
    nonce_str: '' + new Date().getTime(), //随机字符串
    sub_mch_id: process.env.sub_mch_id, //子商户号
    total_fee: total_fee, //订单金额
    refund_fee: total_fee, //申请退款金额
  });
  if (res.errCode == 0) {
    await db
      .collection('Order')
      .doc(order_id)
      .update({
        data: {
          payed_fee: 0,
          updatedAt: new Date().getTime(),
          state: -2,
        },
      });
    await db
      .collection('Psn')
      .where({ order_id: order_id })
      .update({
        data: {
          updatedAt: new Date().getTime(),
          state: -2,
        },
      });
    await db.collection('RefundRecord').doc(out_refund_no).set({
      data: res,
    });
  }

  return res;
};
