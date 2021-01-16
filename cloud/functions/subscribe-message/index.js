const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send(event);
    return result;
  } catch (err) {
    throw err;
  }
};
