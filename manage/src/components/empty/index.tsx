import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import ToastList from '../toastList';
import portalBackgroundDarkLeft from './assets/Portal-background-gray-left.svg';
import portalBackgroundDarkRight from './assets/Portal-background-gray-right.svg';

import portalBackgroundGrayLeft from './assets/Portal-background-dark-left.svg';
import portalBackgroundGrayRight from './assets/Portal-background-dark-right.svg';
const ChrWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-image: url('${portalBackgroundDarkLeft}'),
    url('${portalBackgroundDarkRight}');
  background-position: top left, bottom right;
  background-repeat: no-repeat;
  height: 100%;

  &.euiTheme-dark {
    background-image: url('${portalBackgroundGrayLeft}'),
      url('${portalBackgroundGrayRight}');
  }
`;

export interface IEmptyProps {
  dark?: boolean;
  children: ReactNode;
}

export default function Empty(props: IEmptyProps) {
  const { dark, children } = props;
  return (
    <ChrWrap className={dark ? 'euiTheme-dark' : ''}>
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        style={{ height: '100%' }}
      >
        <EuiFlexItem grow={false}>{children}</EuiFlexItem>
      </EuiFlexGroup>
      <ToastList />
    </ChrWrap>
  );
}
