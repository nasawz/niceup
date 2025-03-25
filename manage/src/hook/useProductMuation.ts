import { useState } from 'react';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useProductMuation() {
  const [state, setState] = useState({ loading: false, error: null });
  const create = async (data, cb) => {
    setState({ loading: true, error: null });
    let error = null;
    data.state = 0;
    data.createdAt = new Date().getTime();
    data.updatedAt = new Date().getTime();

    try {
      await db.collection('Product').add(data);
    } catch (err) {
      error = err;
    } finally {
      setState({ loading: false, error });
      cb(error);
    }
  };

  const update = async (id, data, cb) => {
    let error = null;
    data.updatedAt = new Date().getTime();
    try {
      await db.collection('Product').doc(id).update(data);
    } catch (err) {
      error = err;
    } finally {
      cb(error);
    }
  };
  const destroy = async (ids, cb) => {
    setState({ loading: true, error: null });
    let error = null;

    // const query = `db.collection('Product').where({_id: db.command.in(${JSON.stringify(
    //   ids,
    // )})}).update({data:{state:-1}})`;

    // const query = `db.collection('Product').where({_id: db.command.in(${JSON.stringify(
    //   ids,
    // )})}).remove()`;
    try {
      // await miniProxy(ProxyAction.update, { query });
      await app.callFunction({
        name: 'batch-update-product',
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
  return {
    create,
    update,
    destroy,
    state,
  };
}
