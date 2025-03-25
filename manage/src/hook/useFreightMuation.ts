import { useState } from 'react';
import { app, miniProxy, ProxyAction } from '../lib/tcb';
const db = app.database();

export function useFreightMuation() {
  const [state, setState] = useState({ loading: false, error: null });
  const create = async (data, cb) => {
    setState({ loading: true, error: null });
    let error = null;
    data.state = 1;
    data.type = 'normal';
    data.createdAt = new Date().getTime();
    data.updatedAt = new Date().getTime();

    try {
      await db.collection('Freight').add(data);
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
      await db.collection('Freight').doc(id).update(data);
    } catch (err) {
      error = err;
    } finally {
      cb(error);
    }
  };
  const destroy = async (ids, cb) => {
    setState({ loading: true, error: null });
    let error = null;
    try {
      await db
        .collection('Freight')
        .where({ _id: db.command.in(ids) })
        .remove();
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
