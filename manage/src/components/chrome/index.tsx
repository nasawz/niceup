import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHorizontalRule,
  EuiIcon,
  EuiListGroupItem,
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
  EuiShowFor,
} from '@elastic/eui';
import * as React from 'react';
import Breadcrumbs from './breadcrumbs';
import HeaderUserMenu from './header_user_menu';
import SwitchTheme from './switch_theme';
import LogoNiceUp from './assets/logo_niceup.svg';
import LogoUpTuan from './assets/logo_uptuan.svg';
import { useHistory } from 'react-router';
import { useState } from 'react';
import _ from 'lodash';
import { NavLinks, TopLinks } from './collapsible_nav_list';
import ToastList from '../toastList';
import { useUser } from '../../hook/useUser';

export interface ILogoProps {
  onClick: any;
}
const Logo = ({ onClick }: ILogoProps) => (
  <EuiHeaderLogo
    iconType={LogoNiceUp}
    onClick={onClick}
    aria-label="Goes to home"
  ></EuiHeaderLogo>
);

export interface IChromeProps {
  children?: any;
}

export default function Chrome(props: IChromeProps) {
  const { user } = useUser();
  const history = useHistory();

  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false,
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false,
  );
  /**
   * Accordion toggling
   */
  const [openGroups, setOpenGroups] = useState(
    JSON.parse(String(localStorage.getItem('openNavGroups'))) || ['shop'],
  );

  // Save which groups are open and which are not with state and local store
  const toggleAccordion = (isOpen: boolean, title?: string) => {
    if (!title) return;
    const itExists = openGroups.includes(title);
    if (isOpen) {
      if (itExists) return;
      openGroups.push(title);
    } else {
      const index = openGroups.indexOf(title);
      if (index > -1) {
        openGroups.splice(index, 1);
      }
    }
    setOpenGroups([...openGroups]);
    localStorage.setItem('openNavGroups', JSON.stringify(openGroups));
  };
  /**
   * Pinning
   */
  const [pinnedItems, setPinnedItems] = useState<
    EuiPinnableListGroupItemProps[]
  >(JSON.parse(String(localStorage.getItem('pinnedItems'))) || []);

  const addPin = (item: any) => {
    if (!item || _.find(pinnedItems, { label: item.label })) {
      return;
    }
    item.pinned = true;
    const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
    setPinnedItems(newPinnedItems);
    localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
  };

  const removePin = (item: any) => {
    const pinIndex = _.findIndex(pinnedItems, { label: item.label });
    if (pinIndex > -1) {
      item.pinned = false;
      const newPinnedItems = pinnedItems;
      newPinnedItems.splice(pinIndex, 1);
      setPinnedItems([...newPinnedItems]);
      localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
    }
  };

  function alterLinksWithCurrentState(
    links: EuiPinnableListGroupItemProps[],
    showPinned = false,
  ): EuiPinnableListGroupItemProps[] {
    return links.map(link => {
      const { pinned, ...rest } = link;
      return {
        pinned: showPinned ? pinned : false,
        ...rest,
      };
    });
  }

  function addLinkNameToPinTitle(listItem: EuiPinnableListGroupItemProps) {
    return `Pin ${listItem.label} to top`;
  }

  function addLinkNameToUnpinTitle(listItem: EuiPinnableListGroupItemProps) {
    return `Unpin ${listItem.label}`;
  }

  // const buildClick = (path: string) => () => {
  //   console.log('------------path', path);

  //   history.push(path);
  //   setNavIsOpen(false);
  // };

  if (!user) {
    history.replace('/login');
    return null;
  }

  const collapsibleNav = (
    <EuiCollapsibleNav
      id="guideCollapsibleNavAllExampleNav"
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}
        >
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
    >
      {/* Dark deployments section */}
      {/* <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        {DeploymentsGroup}
      </EuiFlexItem> */}

      {/* Shaded pinned section always with a home item */}
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup
          background="light"
          className="eui-yScroll"
          style={{ maxHeight: '40vh' }}
        >
          <EuiPinnableListGroup
            aria-label="Pinned links" // A11y : Since this group doesn't have a visible `title` it should be provided an accessible description
            listItems={alterLinksWithCurrentState(TopLinks).concat(
              alterLinksWithCurrentState(pinnedItems, true),
            )}
            unpinTitle={addLinkNameToUnpinTitle}
            onPinClick={removePin}
            maxWidth="none"
            color="text"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>

      <EuiHorizontalRule margin="none" />

      {/* BOTTOM */}
      <EuiFlexItem className="eui-yScroll">
        {/* Kibana section */}
        <EuiCollapsibleNavGroup
          title="UP团"
          iconType={LogoUpTuan}
          isCollapsible={true}
          initialIsOpen={openGroups.includes('shop')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'shop')}
        >
          <EuiPinnableListGroup
            aria-label="shop" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(NavLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
        {/* Docking button only for larger screens that can support it*/}
        <EuiShowFor sizes={['l', 'xl']}>
          <EuiCollapsibleNavGroup>
            <EuiListGroupItem
              size="xs"
              color="subdued"
              label={`${navIsDocked ? '解锁' : '锁定'}`}
              onClick={() => {
                setNavIsDocked(!navIsDocked);
                localStorage.setItem(
                  'navIsDocked',
                  JSON.stringify(!navIsDocked),
                );
              }}
              iconType={navIsDocked ? 'lock' : 'lockOpen'}
            />
          </EuiCollapsibleNavGroup>
        </EuiShowFor>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  );

  return (
    <>
      <EuiHeader position="fixed">
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem border="right">
            {collapsibleNav}
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem border="right">
            <Logo onClick={() => history.push('/shop')} />
          </EuiHeaderSectionItem>

          <EuiHeaderSectionItem border="right">
            {/* <HeaderSpacesMenu /> */}
          </EuiHeaderSectionItem>
        </EuiHeaderSection>

        <Breadcrumbs />

        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <SwitchTheme />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <HeaderUserMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
      {props.children}
      <ToastList />
    </>
  );
}
