import * as React from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Tabbar from '../../components/tabbar';
import { useUser } from '../../hooks/useUser';

import './profile.less';

export interface IProfileProps {}

export default function Profile(props: IProfileProps) {
  const { data: user, mutate: reGetUser } = useUser();

  const { statusBarHeight } = Taro.getSystemInfoSync();

  useDidShow(() => {
    reGetUser();
  });

  React.useEffect(() => {
    if (!user || !user.openid) {
      Taro.redirectTo({ url: '/pages/login/login' });
    }
  }, []);

  if (!user || !user.openid) {
    return <View></View>;
  }
  return (
    <View className="profile">
      <View
        className="profile-header"
        style={{
          paddingTop: `${statusBarHeight + 44}px`,
          height: Taro.pxTransform(440 - statusBarHeight - 44),
        }}
      >
        <van-image
          round
          width={Taro.pxTransform(160)}
          height={Taro.pxTransform(160)}
          src={user.avatarUrl}
        />
        <Text>{user.nickName}</Text>
      </View>
      <View className="card-wapper">
        <van-cell-group>
          <van-cell
            title="我的订单"
            icon="orders-o"
            isLink
            onClick={() => Taro.navigateTo({ url: '/pages/order/list/list' })}
          />
          <View className="card-wapper_van-cell_last">
            <van-cell
              title="地址管理"
              icon="logistics"
              isLink
              onClick={() => {
                Taro.authorize({ scope: 'scope.address' }).then(() => {
                  Taro.chooseAddress();
                });
              }}
            />
          </View>
        </van-cell-group>
      </View>
      <View className="card-wapper">
        <van-cell-group>
          <View className="card-wapper_van-cell_last">
            <van-cell
              title="意见反馈"
              icon="smile-comment-o"
              isLink
              onClick={() => {
                Taro.navigateToMiniProgram({
                  appId: 'wx8abaf00ee8c3202e',
                  extraData: { id: '296232' },
                });
              }}
            />
          </View>
        </van-cell-group>
      </View>
      <Tabbar active={2} />
    </View>
  );
}
