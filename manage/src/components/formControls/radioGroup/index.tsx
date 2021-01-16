import { EuiRadioGroup } from '@elastic/eui';
import * as React from 'react';
import { useState } from 'react';

export interface IRadioGroupProps {
  onChange?: any;
  value?: any;
  options?: any;
}

export default function RadioGroup(props: IRadioGroupProps) {
  const { onChange, value, options } = props;

  const [radioIdSelected, setRadioIdSelected] = useState(value);

  const handleChange = optionId => {
    setRadioIdSelected(optionId);
    onChange(optionId);
  };

  return (
    <EuiRadioGroup
      options={options}
      idSelected={radioIdSelected}
      onChange={id => handleChange(id)}
    />
  );
}
