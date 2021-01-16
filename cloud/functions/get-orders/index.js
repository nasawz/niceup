const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const $ = db.command.aggregate;
const _ = db.command;

exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    let { pageIndex, pageSize, sortField, sortDirection, search } = event;

    const query = await db
      .collection('Order')
      .where(
        search
          ? db.command.or([
              {
                nickName: db.RegExp({
                  regexp: `.*${search}.*`,
                  options: 'i',
                }),
              },
              {
                name: db.RegExp({
                  regexp: `.*${search}.*`,
                  options: 'i',
                }),
              },
              {
                phone: db.RegExp({
                  regexp: `.*${search}.*`,
                  options: 'i',
                }),
              },
              {
                outTradeNo: db.RegExp({
                  regexp: `.*${search}.*`,
                  options: 'i',
                }),
              },
            ])
          : {},
      )
      .orderBy(sortField, sortDirection)
      .skip(pageIndex * pageSize)
      .limit(pageSize);
    const dataRes = await query.get();
    const dataCount = await query.count();

    // return {
    //   list: dataRes.data,
    //   count: dataCount.total,
    // };

    resolve({
      list: dataRes.data,
      count: dataCount.total,
    });
  });
};
