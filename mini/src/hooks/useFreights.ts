import { useQuery } from 'react-query';
import Taro from '@tarojs/taro';
const db = Taro.cloud.database();
const cmd: any = db.command;
const MAX_LIMIT = 100;
function useFreights() {
  return useQuery(`freights`, async key => {
    const result = await db
      .collection('Freight')
      .where({
        state: 1,
      })
      .limit(MAX_LIMIT)
      .get();
    return result.data;
  });
}

export { useFreights };
