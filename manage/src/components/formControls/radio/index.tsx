import { EuiRadio, htmlIdGenerator } from '@elastic/eui';
import * as React from 'react';
import { useState } from 'react';

export interface IRadioProps {
  onChange?: any;
  value?: any;
  label?: any;
}

export default function Radio(props: IRadioProps) {
  const { onChange, value, label } = props;
  const [checked, setChecked] = useState(value);

  const handleChange = e => {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  };

  return (
    <EuiRadio
      id={htmlIdGenerator()()}
      label={label}
      checked={checked}
      onChange={e => handleChange(e)}
    />
  );
}
