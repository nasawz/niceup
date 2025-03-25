import { useState } from 'react';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useKvMuation() {
  const [state, setState] = useState({ loading: false, error: null });
  const create = async (data, cb) => {
    setState({ loading: true, error: null });
    let error = null;
    data.state = 0;
    data.type = 'normal';
    data.createdAt = new Date().getTime();
    data.updatedAt = new Date().getTime();

    try {
      await db.collection('Kv').add(data);
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
      await db.collection('Kv').doc(id).update(data);
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
        .collection('Kv')
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
