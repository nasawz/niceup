import useSWR from 'swr';
import Taro from '@tarojs/taro';
const db = Taro.cloud.database();
function useNotice(page) {
  return useSWR([`notice`, page], async () => {
    const result = await db
      .collection('Notice')
      .where({
        _id: page,
        state: 1,
      })
      .limit(1)
      .get();
    return result.data;
  });
}

export { useNotice };
