import * as React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import Nav from '../../components/nav';
// import { useUser } from '../../hooks/useUser'
import { useLogin } from '../../hooks/useLogin';
import Toast from '../../components/vant-weapp/toast/toast';
import { miniTitle } from '../../variables';
import './index.less';

export interface ILoginProps {
  onSuccess;
}

export default function Login(props: ILoginProps) {
  const [login, { isLoading }] = useLogin();

  let handleGetUserInfo = async e => {
    let { userInfo } = e.detail;
    try {
      await login(userInfo);
      Toast.success('授权成功~');
      props.onSuccess();
      // setTimeout(() => {
      //   Taro.navigateBack()
      // }, 2000);
    } catch (error) {
      Toast.fail(error.message);
    }
    // let { userInfo } = u.detail
    // setUserInfo(userInfo)
    // getOpenIdAsync(userInfo)
    // Taro.setStorageSync('flag', false)
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
          <van-button
            loading={isLoading}
            loadingText="登录中..."
            block
            type="primary"
            openType="getUserInfo"
            onGetUserInfo={handleGetUserInfo}
          >
            授权公开信息
          </van-button>
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
