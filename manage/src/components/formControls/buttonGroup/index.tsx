import { EuiButtonGroup } from '@elastic/eui';
import * as React from 'react';
import { useState } from 'react';

export interface IButtonGroupProps {
  onChange?: any;
  value?: any;
  options?: any;
}

export default function ButtonGroup(props: IButtonGroupProps) {
  const { onChange, value, options } = props;

  const [toggleCompressedIdSelected, setToggleCompressedIdSelected] = useState(
    value ? value : undefined,
  );

  const onChangeCompressed = optionId => {
    setToggleCompressedIdSelected(optionId);
    onChange(optionId);
  };

  return (
    <EuiButtonGroup
      legend="This is a basic group"
      options={options}
      idSelected={toggleCompressedIdSelected}
      onChange={id => onChangeCompressed(id)}
      buttonSize="compressed"
      isFullWidth
    />
  );
}
