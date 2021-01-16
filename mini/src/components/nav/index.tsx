import * as React from 'react';
import Taro from '@tarojs/taro';
import { styled } from 'linaria/react';
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import logoPath from '../../assets/logo.png';
const StatusBar = styled(View)<{ height }>`
  height: ${props => props.height}px;
  // background-color: blue;
`;
const NavBar = styled(View)<{ height }>`
  height: ${props => props.height}px;
  display: flex;
  align-items: center;
`;

const Logo = styled(Image)<{}>`
  height: 30px;
  // width: 124PX;
  margin-left: 20px;
`;
const Title = styled(Text)<{}>`
  height: 24px;
  margin-left: 20px;
  font-size: 24px;
  line-height: 24px;
`;

const BackBtn = styled(View)<{}>`
  margin-left: 20px;
  .van-button--default {
    background: #ffffffa3;
  }
`;

const Contanter = styled(View)<{}>`
  -webkit-transition: background-color 1s, -webkit-transform 1s;
  transition: background-color 1s, transform 1s;
`;

export interface INavProps {
  back?;
  style?;
  title?;
}

export default function Nav(props: INavProps) {
  const { statusBarHeight } = Taro.getSystemInfoSync();
  const { back, style, title } = props;

  const backBtn = () => {
    return (
      <van-sticky offsetTop={statusBarHeight + 8}>
        <BackBtn
          onClick={() => {
            Taro.navigateBack();
          }}
        >
          <van-button
            customStyle="min-width:30px;"
            icon="arrow-left"
            type="default"
            size="small"
          />
        </BackBtn>
      </van-sticky>
    );
  };
  return (
    <Contanter style={style}>
      <StatusBar height={statusBarHeight} />
      <NavBar height={44}>
        {!back && !title && <Logo mode="heightFix" src={logoPath} />}
        {back && !title && backBtn()}
        {back && title && (
          <BackBtn
            onClick={() => {
              Taro.navigateBack();
            }}
          >
            <van-icon name="arrow-left" size="24PX" />
          </BackBtn>
        )}
        {title && <Title>{title}</Title>}
      </NavBar>
    </Contanter>
  );
}
