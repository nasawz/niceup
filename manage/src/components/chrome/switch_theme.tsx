import {
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiPopover,
} from '@elastic/eui';
import * as React from 'react';
import { setInitialTheme, setTheme, themeConfig } from '../../lib/theme';
const initialTheme = setInitialTheme();

export interface ISwitchThemeProps {}

export default function SwitchTheme(props: ISwitchThemeProps) {
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const [theme, setThemeInState] = React.useState(initialTheme);

  const handleChangeTheme = (newTheme: string) => {
    setPopoverOpen(false);
    setTheme(newTheme);
    setThemeInState(newTheme);
  };

  const items = themeConfig.availableThemes.map(each => (
    <EuiContextMenuItem
      key={each.id}
      icon={each.id === theme ? 'check' : 'empty'}
      onClick={() => handleChangeTheme(each.id)}
    >
      {each.name}
    </EuiContextMenuItem>
  ));
  const button = (
    <EuiHeaderSectionItemButton
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={() => setPopoverOpen(!isPopoverOpen)}
    >
      <EuiIcon type="brush" size="m" />
    </EuiHeaderSectionItemButton>
  );
  return (
    <EuiPopover
      id="contextMenu"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={() => setPopoverOpen(false)}
      panelPaddingSize="none"
      anchorPosition="downLeft"
    >
      <EuiContextMenuPanel items={items} />
    </EuiPopover>
  );
}
