const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const $ = db.command.aggregate;
const _ = db.command;

exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    let { ids, data } = event;
    const res = await db
      .collection('Product')
      .where({ _id: _.in(ids) })
      .update({ data: data });
    resolve(res);
  });
};
