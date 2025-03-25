const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const $ = db.command.aggregate;
const _ = db.command;

exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    const res = await db
      .collection('Product')
      .aggregate()
      .match({
        state: _.gt(-1),
      })
      .addFields({
        label: '$title',
        inputDisplay: '$title',
        value: '$_id',
      })
      .project({
        _id: 0,
        label: 1,
        inputDisplay: 1,
        value: 1,
        sort: 1,
      })
      .sort({
        sort: -1,
      })
      .limit(1000000)
      .end();

    resolve(res);
  });
};
