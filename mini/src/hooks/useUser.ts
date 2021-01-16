// import { useEffect, useState } from "react";
import Taro from '@tarojs/taro';
// import { useState } from 'react';
import useSWR from 'swr';

function useUser() {
  return useSWR(
    ['user'],
    async () => {
      let u = Taro.getStorageSync('userInfo');
      return typeof u === 'string' ? undefined : u;
    },
    {
      initialData: Taro.getStorageSync('userInfo'),
    },
  );
}

export { useUser };
