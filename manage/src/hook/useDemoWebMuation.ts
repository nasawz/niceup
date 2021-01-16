import { useState } from 'react';
import { app } from '../lib/tcb';
const db = app.database();

export function useDemoWebMuation() {
  const [state, setState] = useState({ loading: false, error: null });
  const create = (data, cb) => {
    setState({ loading: true, error: null });
    let error = null;
    data.createdAt = new Date().getTime();
    data.updatedAt = new Date().getTime();
    db.collection('demo_web')
      .add(data)
      .then(res => {})
      .catch(e => {
        error = e;
      })
      .finally(() => {
        setState({ loading: false, error });
        cb(error);
      });
  };
  const update = (id, data, cb) => {
    setState({ loading: true, error: null });
    let error = null;
    data.updatedAt = new Date().getTime();
    db.collection('demo_web')
      .doc(id)
      .update(data)
      .then(res => {})
      .catch(e => {
        error = e;
      })
      .finally(() => {
        setState({ loading: false, error });
        cb(error);
      });
  };
  const destroy = (ids, cb) => {
    setState({ loading: true, error: null });
    let error = null;
    db.collection('demo_web')
      .where({
        _id: db.command.in(ids),
      })
      .remove()
      .then(res => {})
      .catch(e => {
        error = e;
      })
      .finally(() => {
        setState({ loading: false, error });
        cb(error);
      });
  };
  return {
    create,
    update,
    destroy,
    state,
  };
}
