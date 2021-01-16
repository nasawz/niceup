import { EuiPinnableListGroupItemProps } from '@elastic/eui';
import { config } from '../../config';

export const NavLinks: EuiPinnableListGroupItemProps[] = [
  // {
  //   label: '列表',
  //   href: `${window.location.origin}${window.location.pathname}#/ext/list`,
  //   iconType: 'tableDensityNormal',
  // },
  // {
  //   label: '表单',
  //   href: `${window.location.origin}${window.location.pathname}#/ext/form`,
  //   iconType: 'documentEdit',
  // },
  // {
  //   label: '云函数',
  //   href: `${window.location.origin}${window.location.pathname}#/ext/scf`,
  //   iconType: 'node',
  // },
  {
    label: '推荐',
    href: `${window.location.origin}${window.location.pathname}#/shop/kv`,
    iconType: 'starEmpty',
  },
  {
    label: '商品',
    href: `${window.location.origin}${window.location.pathname}#/shop/product`,
    iconType: 'grid',
  },
  {
    label: '会员',
    href: `${window.location.origin}${window.location.pathname}#/shop/member`,
    iconType: 'users',
  },
  {
    label: '运费',
    href: `${window.location.origin}${window.location.pathname}#/shop/freight`,
    iconType: 'visMapCoordinate',
  },
  {
    label: '订单',
    href: `${window.location.origin}${window.location.pathname}#/shop/order`,
    iconType: 'cheer',
  },
  {
    label: '标签',
    href: `${window.location.origin}${window.location.pathname}#/shop/tag`,
    iconType: 'tag',
  },
  {
    label: '公告',
    href: `${window.location.origin}${window.location.pathname}#/shop/notice`,
    iconType: 'bell',
  },
  {
    label: '备货',
    href: `${window.location.origin}${window.location.pathname}#/shop/psn`,
    iconType: 'package',
  },
  {
    label: '文件',
    href: `${window.location.origin}${window.location.pathname}#/file`,
    iconType: 'storage',
  },
];

export const TopLinks: EuiPinnableListGroupItemProps[] = [
  {
    label: '首页',
    iconType: 'home',
    isActive: true,
    'aria-current': true,
    pinnable: false,
    href: `${window.location.origin}${window.location.pathname}#/shop`,
  },
];
