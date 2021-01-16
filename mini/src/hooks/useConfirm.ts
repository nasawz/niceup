import Taro from '@tarojs/taro';
import { useState } from 'react';

function useConfirm() {
  const [psns, setPsns] = useState(Taro.getStorageSync('psns'));

  const addConfirm = psns => {
    Taro.setStorage({ key: 'psns', data: psns });
    setPsns(psns);
  };

  return { psns, addConfirm };
}

export { useConfirm };
