import {
  htmlIdGenerator,
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiConfirmModal,
  EuiOverlayMask,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiPopover,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import * as React from 'react';
import { useHistory } from 'react-router';
import { useUser } from '../../hook/useUser';

export interface IHeaderUserMenuProps {}

export default function HeaderUserMenu(props: IHeaderUserMenuProps) {
  const { user, logout } = useUser();

  const id = htmlIdGenerator()();
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);
  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  const [isLogoutModalVisible, setIsLogoutModalVisible] = React.useState(false);
  const showLogoutModal = () => setIsLogoutModalVisible(true);
  const closeLogoutModal = () => setIsLogoutModalVisible(false);
  // const currentUser = {
  //   username: 'nasawz',
  // };
  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name={user ? user.nickName : ''} size="s" />
    </EuiHeaderSectionItemButton>
  );
  let logoutConfirmModal;
  if (isLogoutModalVisible) {
    logoutConfirmModal = (
      <EuiOverlayMask>
        <EuiConfirmModal
          title="确定要退出系统吗？"
          onCancel={closeLogoutModal}
          onConfirm={() => {
            logout();
            history.push({ pathname: `/login` });
          }}
          cancelButtonText="取消"
          confirmButtonText="确定"
          defaultFocusedButton="confirm"
        />
      </EuiOverlayMask>
    );
  }
  return (
    <EuiPopover
      id={id}
      ownFocus
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup
          gutterSize="m"
          className="euiHeaderProfile"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiAvatar name={user ? user.nickName : ''} size="xl" />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>{user ? user.nickName : ''}</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  {/* <EuiFlexItem grow={false}>
                    <EuiLink href="">Edit profile</EuiLink>
                  </EuiFlexItem> */}
                  <EuiFlexItem grow={false}>
                    <EuiLink
                      onClick={e => {
                        showLogoutModal();
                      }}
                    >
                      安全退出
                    </EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
        {logoutConfirmModal}
      </div>
    </EuiPopover>
  );
}
