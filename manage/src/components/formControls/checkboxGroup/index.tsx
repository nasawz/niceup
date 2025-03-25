import { EuiCheckboxGroup } from '@elastic/eui';
import * as React from 'react';
import { useState } from 'react';

export interface ICheckboxGroupProps {
  onChange?: any;
  value?: any;
  options?: any;
}

export default function CheckboxGroup(props: ICheckboxGroupProps) {
  const { onChange, value, options } = props;

  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState(
    value ? value : {},
  );

  const handleChange = optionId => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
    onChange(newCheckboxIdToSelectedMap);
  };
  return (
    <EuiCheckboxGroup
      options={options}
      idToSelectedMap={checkboxIdToSelectedMap}
      onChange={id => handleChange(id)}
    />
  );
}
