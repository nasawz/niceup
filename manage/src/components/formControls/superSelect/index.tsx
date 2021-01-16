import { EuiSuperSelect } from '@elastic/eui';
import * as React from 'react';

export interface ISuperSelectProps {
  onChange?: any;
  value?: any;
  options?: any;
}

export default function SuperSelect(props: ISuperSelectProps) {
  const { onChange, value, options } = props;

  const [selected, setSelected] = React.useState(
    value ? value : options.length > 0 ? options[0].value : '',
  );
  React.useEffect(() => {
    if (!value) {
      onChange(options.length > 0 ? options[0].value : '');
    }
  }, []);

  const handleChange = value => {
    setSelected(value);
    onChange(value);
  };

  return (
    <EuiSuperSelect
      options={options}
      valueOfSelected={selected}
      onChange={value => handleChange(value)}
    />
  );
}
