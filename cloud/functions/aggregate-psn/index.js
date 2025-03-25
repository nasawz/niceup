const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const $ = db.command.aggregate;
const _ = db.command;

exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    let { tableParams, filterParams } = event;
    let { sortField, sortDirection, search } = tableParams;

    let querys = [];
    if (filterParams.state) {
      querys.push({ state: filterParams.state.value });
    }
    if (
      filterParams.product_title &&
      filterParams.product_title.label != '全部'
    ) {
      querys.push({ product_title: filterParams.product_title.label });
    }
    if (filterParams.spec_three) {
      querys.push({ spec_three: filterParams.spec_three.value });
    }
    if (filterParams.time_range) {
      querys.push({
        updatedAt: _.and(
          _.gt(filterParams.time_range.startDate),
          _.lte(filterParams.time_range.endDate),
        ),
      });
    }
    if (search) {
      querys.push(
        _.or([
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
        ]),
      );
    }
    const matchObj = _.and(querys);

    const res = await db
      .collection('Psn')
      .aggregate()
      .match(matchObj)
      .addFields({
        address: $.concat([
          '$provinceName',
          '$cityName',
          '$countyName',
          '$detailInfo',
        ]),
        psn: {
          name: $.concat(['$product_title', '$spec_title']),
          num: '$num',
        },
        user: $.concat(['$name', ' ', '$phone']),
        full: $.concat(['$user', ' ', '$address']),
      })
      .addFields({
        full: $.concat(['$user', ' ', '$address']),
      })
      .project({
        product_thumb: 0,
        _openid: 0,
      })
      .group({
        _id: '$user',
        openid: $.first('$openid'),
        nickName: $.first('$nickName'),
        name: $.first('$name'),
        phone: $.first('$phone'),
        address: $.first('$address'),
        full: $.first('$full'),
        oid: $.first('$_id'),
        totalWeight: $.sum('$spec_weight'),
        totalPrice: $.sum('$spec_price'),
        totalCost: $.sum('$_spec_cost'),
        psns: $.addToSet('$psn'),
        state: $.first('$state'),
        spec_three: $.first('$spec_three'),
        updatedAt: $.first('$updatedAt'),
      })
      .addFields({
        profit: $.subtract(['$totalPrice', '$totalCost']),
      })
      .sort({
        [`${sortField}`]: sortDirection == 'desc' ? -1 : 1,
      })
      .limit(1000000)
      .end();

    resolve(res);
  });
};
