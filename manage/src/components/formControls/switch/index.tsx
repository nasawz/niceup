import { EuiSwitch } from '@elastic/eui';
import * as React from 'react';
import { useState } from 'react';

export default function Switch(props: any) {
  const { onChange, value, ...others } = props;
  const [checked, setChecked] = useState(value ? value : false);
  React.useEffect(() => {
    if (value == null || value == undefined) {
      onChange(false);
    }
  }, []);

  const handleChange = e => {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  };
  return (
    <EuiSwitch checked={checked} onChange={e => handleChange(e)} {...others} />
  );
}
