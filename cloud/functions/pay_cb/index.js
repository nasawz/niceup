const cloud = require('wx-server-sdk');
const axios = require('axios');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

const sendMessage = message => {
  const token = process.env.token;
  let data = {
    chatId: process.env.chatId,
    token: token,
    messageType: 0,
    payload: {
      text: message,
    },
  };
  axios.post('https://ex-api.botorange.com/message/send', data);
};

exports.main = async (event, context) => {
  let { attach: id, totalFee } = event;
  await db
    .collection('Order')
    .doc(id)
    .update({
      data: {
        payed_fee: totalFee,
        payedAt: new Date().getTime(),
        state: 2,
      },
    });
  await db
    .collection('Psn')
    .where({ order_id: id })
    .update({
      data: {
        updatedAt: new Date().getTime(),
        state: 2,
      },
    });

  let recs = await db
    .collection('PayRecord')
    .where({ _id: event.outTradeNo })
    .get();
  if (recs.data.length == 0) {
    let psns = await db.collection('Psn').where({ order_id: id }).get();
    let goods = psns.data
      .map(psn => {
        return `${psn.product_title}${psn.spec_title} x ${psn.num}`;
      })
      .join('\n');
    let nickName = psns.data[0].nickName;
    let message = `${nickName}\n${goods}`;
    sendMessage(message);
  }

  await db.collection('PayRecord').doc(event.outTradeNo).set({
    data: event,
  });

  return { errcode: 0 };
};
