import * as React from 'react';
import { Button, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Toast from '../../components/vant-weapp/toast/toast';
import { useLogin } from '../../hooks/useLogin';
import { miniTitle } from '../../variables';
import Nav from '../../components/nav';
import { useUser } from '../../hooks/useUser';

import './login.less';

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const { mutate: reGetUser } = useUser();
  const [login, { isLoading }] = useLogin();

  let handleGetUserInfo = async e => {
    console.log(e);

    let { userInfo } = e.detail;
    try {
      await login(userInfo);
      Toast.success('授权成功~');
      reGetUser();
      Taro.switchTab({ url: '/pages/index/index' });
    } catch (error) {
      Toast.fail(error.message);
    }
  };

  return (
    <View className="login">
      <van-sticky>
        <Nav back={false} title="登录" style={{ backgroundColor: 'white' }} />
      </van-sticky>
      <View className="wapper">
        <View className="title">就差一步啦</View>
        <View className="sub-title">获取您的公开信息（昵称、头像等）</View>
        <View className="desc">
          需获取公开信息，方便您使用{miniTitle}的全部功能
        </View>
        <View className="btn">
          <Button
            loading={isLoading}
            type="primary"
            openType="getUserInfo"
            onGetUserInfo={handleGetUserInfo}
          >
            授权公开信息
          </Button>
        </View>
        <View className="btn">
          <van-button
            block
            type="default"
            onClick={() => {
              Taro.switchTab({ url: '/pages/index/index' });
            }}
          >
            暂不登录
          </van-button>
        </View>
        <View className="link">
          <van-button customClass="contact" type="default" openType="contact">
            登录不上？点击联系客服！
          </van-button>
        </View>
      </View>
      <van-toast id="van-toast" />
    </View>
  );
}
