import { useState } from 'react';
import { miniProxy, ProxyAction } from '../lib/tcb';
import { app } from '../lib/tcb';
const db = app.database();

export function useNoticeMuation() {
  const [state, setState] = useState({ loading: false, error: null });
  const create = async (data, cb) => {
    console.log(data);

    setState({ loading: true, error: null });
    let error = null;
    data.state = 0;
    data._id = data.page;
    data.createdAt = new Date().getTime();
    data.updatedAt = new Date().getTime();
    try {
      const res = await db.collection('Notice').doc(data._id).set(data);
      if (res.code == 'INVALID_PARAM') {
        await db.collection('Notice').add(data);
      }
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
      await db.collection('Notice').doc(id).update(data);
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
        .collection('Notice')
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
