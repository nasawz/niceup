import useSWR from 'swr';
import Taro from '@tarojs/taro';
const db = Taro.cloud.database();

export function useTag() {
  return useSWR(['Tag'], async () => {
    const result = await db
      .collection('Tag')
      .where({
        state: 1,
      })
      .orderBy('sort', 'desc')
      .get();
    return result.data;
  });
}
