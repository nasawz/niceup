const tcb = require('tcb-admin-node');
const CryptoJS = require('crypto-js');

exports.main = async function (event) {
  const { username, uid } = JSON.parse(event.body);
  const currentEnv = tcb.SYMBOL_CURRENT_ENV;
  const {
    PRIVATE_KEY_ID: private_key_id,
    PRIVATE_KEY: private_key,
  } = process.env;
  const app = tcb.init({
    env: currentEnv,
    credentials: {
      private_key_id,
      private_key,
    },
  });
  const db = app.database();
  const collection = db.collection('Auth');

  if (!uid) {
    let { password } = JSON.parse(event.body);
    password = CryptoJS.SHA256(password).toString().toLowerCase();

    const res = await collection
      .where({
        username,
        password,
      })
      .get();

    let user;
    if (res.data.length > 0) {
      user = res.data[0];
    }
    if (user) {
      let res = await db
        .collection('Admin')
        .where({
          _id: 'user',
        })
        .count();
      const ticket = app.auth().createTicket(user._id, {
        refresh: 24 * 60 * 60 * 1000,
      });
      return { ticket, adminNum: res.total };
    } else {
      return {};
    }
  } else {
    const initAdmin = () => {
      return new Promise(async (resolve, reject) => {
        const collection = db.collection('Admin');

        let res = await collection
          .where({
            _id: 'user',
          })
          .get();

        if (res.data.length == 0) {
          res = await collection.add({
            _id: 'user',
            admin: [uid],
          });
        }
        resolve(res);
      });
    };
    const res = await initAdmin();
    return res;
  }
};
