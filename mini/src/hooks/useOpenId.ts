import { useQuery } from 'react-query';
import Taro from '@tarojs/taro';
function useOpenId() {
  return useQuery(
    'openid',
    async () => {
      const { result } = await Taro.cloud.callFunction({
        name: 'openid',
        data: {},
      });
      // console.log(result);

      return result;
    },
    {
      enabled: false,
    },
  );
}

export { useOpenId };
