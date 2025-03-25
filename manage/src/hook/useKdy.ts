import useSWR from 'swr';
import { app } from '../lib/tcb';

export function useKdy({ cookie, phone }) {
  return useSWR(['Kdy', cookie, phone], async () => {
    const dataRes: any = await app.callFunction({
      name: 'fetch-kdy',
      data: {
        cookie,
        phone,
      },
    });
    return dataRes.result.data;
  });
}
