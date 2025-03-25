import useSWR from 'swr';
import Taro from '@tarojs/taro';
const db = Taro.cloud.database();

export function useKv() {
  return useSWR(['kv'], async () => {
    const result = await db
      .collection('Kv')
      .where({
        state: 0,
      })
      .orderBy('sort', 'desc')
      .get();
    return result.data;
  });
}
