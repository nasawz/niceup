import { EuiCheckbox, htmlIdGenerator } from '@elastic/eui';
import * as React from 'react';

export interface ICheckboxProps {
  onChange?: any;
  value?: any;
  label?: any;
}

export default function Checkbox(props: ICheckboxProps) {
  const { onChange, value, label } = props;
  const [checked, setChecked] = React.useState(value ? value : false);
  const handleChange = e => {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  };
  return (
    <EuiCheckbox
      label={label}
      checked={checked}
      id={htmlIdGenerator()()}
      onChange={e => handleChange(e)}
    />
  );
}
