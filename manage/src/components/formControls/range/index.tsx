import * as React from 'react';
import { htmlIdGenerator } from '@elastic/eui/lib/services';
import { EuiRange } from '@elastic/eui';
import { useState } from 'react';

export default function Range(props: any) {
  const { onChange, value: initValue, ...others } = props;

  const [value, setValue] = useState(initValue ? initValue : 0);

  const handleChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <EuiRange
      id={htmlIdGenerator()()}
      value={value}
      onChange={handleChange}
      {...others}
    />
  );
}
