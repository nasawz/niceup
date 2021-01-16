const axios = require('axios');

exports.main = async function (event) {
  let { cookie, phone } = event;
  var headers = {
    'sec-fetch-mode': 'cors',
    origin: 'https://kdy.kuaidihelp.com',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,ja;q=0.6,ko;q=0.5',
    'x-requested-with': 'XMLHttpRequest',
    cookie: cookie,
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    accept: 'application/json, text/javascript, */*; q=0.01',
    referer: 'https://kdy.kuaidihelp.com/order/orderlist',
    authority: 'kdy.kuaidihelp.com',
    'sec-fetch-site': 'same-origin',
  };
  const instance = axios.create({
    baseURL: 'https://kdy.kuaidihelp.com',
    headers: headers,
  });

  return new Promise(async (resolve, reject) => {
    const params = new URLSearchParams();
    params.append('type', 'printed');
    params.append('choice', '1');
    params.append('search', phone);
    params.append('pageNum', '1');

    instance
      .post('/order/list', params)
      .then(res => {
        resolve({ data: res.data.data.result });
      })
      .catch(err => {
        reject(err);
      });
  });
};
