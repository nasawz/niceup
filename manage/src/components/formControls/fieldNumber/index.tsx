import { EuiFieldNumber } from '@elastic/eui';
import * as React from 'react';

export default function FieldNumber(props: any) {
  const { onChange, value, ...others } = props;

  const [num, setNum]: any = React.useState(value ? value : 0);
  React.useEffect(() => {
    onChange(num);
  }, []);
  const handleChange = e => {
    onChange(parseInt(e.target.value));
    setNum(parseInt(e.target.value));
  };

  return (
    <EuiFieldNumber
      value={num}
      onChange={handleChange}
      {...others}
      onWheelCapture={(e: any) => e.target.blur()}
    />
  );
}
