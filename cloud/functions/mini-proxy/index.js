const axios = require('axios');
const tcb = require('tcb-admin-node');

const getAccessToken = () => {
  const currentEnv = tcb.SYMBOL_CURRENT_ENV;
  const app = tcb.init({
    env: currentEnv,
  });
  const db = app.database();

  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${process.env.APPID}&secret=${process.env.APPSECRET}`;
  return new Promise(async (m_resolve, m_reject) => {
    const getTokenFormUrl = () => {
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then(async res => {
            const { access_token, expires_in } = res.data;
            const obj = {
              accessToken: access_token,
              expireTime: new Date().getTime() + expires_in * 1000 - 120 * 1000,
            };
            db.collection('AccessToken')
              .doc('mini-token')
              .set(obj)
              .then(function (res) {});
            resolve(obj);
          })
          .catch(err => {
            reject(err);
          });
      });
    };
    const getTokenFormDb = () => {
      return new Promise(async (resolve, reject) => {
        db.collection('AccessToken')
          .doc('mini-token')
          .get()
          .then(async res => {
            if (res.data.length > 0) {
              let tokenObj = res.data[0];
              if (tokenObj.expireTime < new Date().getTime()) {
                tokenObj = await getTokenFormUrl();
              } else {
                console.log('=====getTokenFormDb');
              }
              resolve(tokenObj);
            } else {
              const tokenObj = await getTokenFormUrl();
              resolve(tokenObj);
            }
          });
      });
    };
    const token = await getTokenFormDb();
    m_resolve(token);
  });
};

const postData = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(async res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.main = async function (event) {
  const { url, params } = event;
  const miniToken = await getAccessToken();
  console.log('------miniToken >>>', miniToken);
  params.env = process.env.MINIENV;
  const invokeFn = params.invokeFnName ? `&name=${params.invokeFnName}` : '';
  delete params.invokeFnName;
  const result = await postData(
    `${url}?access_token=${miniToken.accessToken}&env=${process.env.MINIENV}${invokeFn}`,
    params,
  );
  return result.data;
};
