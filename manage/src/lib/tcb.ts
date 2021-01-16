import cloudbase from '@cloudbase/js-sdk';
import { config } from '../config';

export const app = cloudbase.init({
  env: config.envId!,
});

export enum ProxyAction {
  invokecloudfunction = 'invokecloudfunction',
  query = 'databasequery',
  add = 'databaseadd',
  delete = 'databasedelete',
  update = 'databaseupdate',
  aggregate = 'databaseaggregate',
  count = 'databasecount',
}

export const miniProxy = (action: ProxyAction, params) => {
  return new Promise((resolve, reject) => {
    app
      .callFunction({
        name: 'mini-proxy',
        data: {
          url: `https://api.weixin.qq.com/tcb/${action}`,
          params,
        },
      })
      .then((res: any) => {
        resolve(res.result);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
