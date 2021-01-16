import { EuiColorPicker } from '@elastic/eui';
import { useColorPickerState } from '@elastic/eui/lib/services';
import * as React from 'react';

export default function ColorPicker(props: any) {
  const { onChange, value, defaultColor, ...others } = props;

  const [color, setColor, errors]: any = useColorPickerState(
    value ? value : defaultColor ? defaultColor : '#fff',
  );

  React.useEffect(() => {
    onChange(color);
  }, [color]);

  return (
    <EuiColorPicker
      onChange={setColor}
      color={color}
      isInvalid={!!errors}
      {...others}
    />
  );
}
