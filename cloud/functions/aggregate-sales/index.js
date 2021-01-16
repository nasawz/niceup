const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();
const $ = db.command.aggregate;
const _ = db.command;

exports.main = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    const { startDate, endDate } = event;
    // 新订单数
    const newOrderRes = await db
      .collection('Order')
      .aggregate()
      .match({
        state: 2,
      })
      .group({
        _id: null,
        count: $.sum(1),
      })
      .project({
        _id: 0,
      })
      .limit(1000000)
      .end();

    // 总订单数
    const allOrderRes = await db
      .collection('Order')
      .aggregate()
      .match({
        state: _.gte(2),
      })
      .group({
        _id: null,
        count: $.sum(1),
      })
      .project({
        _id: 0,
      })
      .limit(1000000)
      .end();

    // 上架商品数
    const allProductRes = await db
      .collection('Product')
      .aggregate()
      .match({
        state: 1,
        verify: true,
      })
      .group({
        _id: null,
        count: $.sum(1),
      })
      .project({
        _id: 0,
      })
      .limit(1000000)
      .end();

    // 未发货销量
    const psns2Res = await db
      .collection('Psn')
      .aggregate()
      .match({
        state: _.gte(2),
        updatedAt: _.and(_.gt(startDate), _.lte(endDate)),
      })
      .addFields({
        totalPrice: $.multiply(['$num', '$spec_price']),
        totalCost: $.multiply(['$num', '$_spec_cost']),
      })
      .group({
        _id: $.concat(['$product_title', ' ', '$spec_title']),
        cost: $.sum('$totalCost'),
        price: $.sum('$totalPrice'),
        sales: $.sum('$num'),
      })
      .addFields({
        profit: $.floor($.subtract(['$price', '$cost'])),
      })
      .sort({
        profit: -1,
      })
      .limit(1000000)
      .end();

    resolve({
      newOrderRes,
      allOrderRes,
      allProductRes,
      psns2Res,
    });
  });
};
