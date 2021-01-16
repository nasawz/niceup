import { useState } from 'react';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useOrderMuation() {
  const [state, setState] = useState({ loading: false, error: null });

  const update = async (id, data, cb) => {
    let error = null;
    data.updatedAt = new Date().getTime();

    // const queryPsn = `db.collection('Psn').where({order_id: '${id}'}).update({data:${JSON.stringify(
    //   data,
    // )}})`;

    try {
      // await db.collection('Order').doc(id).update(data)

      await app.callFunction({
        name: 'batch-update-order',
        data: {
          ids: [id],
          data: data,
        },
      });

      // await miniProxy(ProxyAction.update, { query: queryPsn });
      await app.callFunction({
        name: 'batch-update-psn',
        data: {
          ids: [id],
          data: data,
        },
      });
    } catch (err) {
      error = err;
    } finally {
      cb(error);
    }
  };

  const close = async (ids, cb) => {
    setState({ loading: true, error: null });
    let error = null;

    // const query = `db.collection('Order').where({_id: db.command.in(${JSON.stringify(
    //   ids,
    // )})}).update({data:{state:-1}})`;

    // const queryPsn = `db.collection('Psn').where({order_id: db.command.in(${JSON.stringify(
    //   ids,
    // )})}).update({data:{state:-1}})`;
    try {
      // await miniProxy(ProxyAction.update, { query });
      // await miniProxy(ProxyAction.update, { query: queryPsn });

      await app.callFunction({
        name: 'batch-update-order',
        data: {
          ids,
          data: { state: -1 },
        },
      });

      await app.callFunction({
        name: 'batch-update-psn',
        data: {
          ids,
          data: { state: -1 },
        },
      });
    } catch (err) {
      error = err;
    } finally {
      setState({ loading: false, error });
      cb(error);
    }
  };

  const refund = async (out_refund_no, total_fee, order_id, cb) => {
    setState({ loading: true, error: null });
    let error = null;
    try {
      const res = await miniProxy(ProxyAction.invokecloudfunction, {
        invokeFnName: 'refund',
        out_refund_no,
        total_fee,
        order_id,
      });
      console.log(res);
    } catch (err) {
      error = err;
    } finally {
      setState({ loading: false, error });
      cb(error);
    }
  };

  const sendExp = async (id, data, cb) => {
    let error = null;
    data.updatedAt = new Date().getTime();
    data.state = 4;

    // const queryPsn = `db.collection('Psn').where({order_id: '${id}'}).update({data:${JSON.stringify(
    //   data,
    // )}})`;

    try {
      // await db.collection('Order').doc(id).update(data)
      await app.callFunction({
        name: 'batch-update-order',
        data: {
          ids: [id],
          data: data,
        },
      });
      // await miniProxy(ProxyAction.update, { query: queryPsn });
      await app.callFunction({
        name: 'batch-update-psn',
        data: {
          ids: [id],
          data: data,
        },
      });
    } catch (err) {
      error = err;
    } finally {
      cb(error);
    }
  };

  return {
    update,
    sendExp,
    close,
    refund,
    state,
  };
}
