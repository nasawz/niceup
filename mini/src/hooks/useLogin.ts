import { useMutation } from 'react-query';
import Taro from '@tarojs/taro';

function useLogin() {
  return useMutation(async (userInfo: any) => {
    const db = Taro.cloud.database();
    const userCollection = db.collection('User');
    const { result }: any = await Taro.cloud.callFunction({
      name: 'openid',
      data: {},
    });

    let { openid } = result;
    userInfo.openid = openid;
    return new Promise(async (resolve, reject) => {
      try {
        let users = await userCollection
          .where({
            openid: userInfo.openid,
          })
          .orderBy('openid', 'asc')
          .get();
        let currU;
        if (users.data.length === 0) {
          userInfo.createdAt = new Date().getTime();
          userInfo.updatedAt = new Date().getTime();
          currU = await userCollection.add({ data: userInfo });
        } else {
          // TODO update user info
          currU = users.data[0];
        }
        Taro.setStorage({ key: 'userInfo', data: currU });
        resolve(currU);
      } catch (error) {
        reject(error);
      }
    });
  });
}

export { useLogin };
