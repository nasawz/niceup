import { useState } from 'react';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useMessageMuation() {
  const sendSubscribeMessage = async (orderId, cb) => {
    // const dataRes: any = await db.collection('Order').doc(orderId).get()

    const dataRes: any = await app.callFunction({
      name: 'get-order',
      data: {
        Id: orderId,
      },
    });
    // resolve(dataRes.result.data)

    const order = dataRes.result.data;
    // console.log(order);

    const { openid, name, outTradeNo, detailInfo, exp, payedAt } = order;
    let error = null;
    try {
      // const res = await app
      //   .callFunction({
      //     name: 'subscribeMessage',
      //     data: {
      //       touser: openid,
      //       page: 'index', //TODO jump
      //       lang: 'zh_CN',
      //       data: {
      //         number1: {
      //           value: payedAt,
      //         },
      //         thing2: {
      //           value: `点击查看详情`,
      //         },
      //         name3: {
      //           value: `${name}`.replace(/\s*/g, ''),
      //         },
      //         thing4: {
      //           value: `${detailInfo}`,
      //         },
      //         thing5: {
      //           value: `${exp[0].expType} ${exp[0].expNumber}`,
      //         },
      //       },
      //       templateId: 'n6ixnfxvjOdjzcaZ9p14RJiO7U2VhWMEwRKmg3ZTtV4',
      //     },
      //   })

      const res = await miniProxy(ProxyAction.invokecloudfunction, {
        invokeFnName: 'subscribe-message',
        touser: openid,
        page: `pages/order/detail/detail?id=${orderId}`,
        lang: 'zh_CN',
        data: {
          number1: {
            value: payedAt,
          },
          thing2: {
            value: `点击查看详情`,
          },
          name3: {
            value: `${name}`.replace(/\s*/g, ''),
          },
          thing4: {
            value: `${detailInfo}`,
          },
          thing5: {
            value: `${exp[0].expType} ${exp[0].expNumber}`,
          },
        },
        templateId: 'n6ixnfxvjOdjzcaZ9p14RJiO7U2VhWMEwRKmg3ZTtV4',
        miniprogramState: 'developer',
      });
      // console.log(res);
    } catch (err) {
      error = err;
    } finally {
      cb(error);
    }
  };

  return {
    sendSubscribeMessage,
  };
}
