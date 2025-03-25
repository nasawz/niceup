import {
  EuiColorPalettePicker,
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
} from '@elastic/eui';
import * as React from 'react';
import { useState } from 'react';

export interface IColorPalettePickerProps {
  onChange?: any;
  value?: any;
  options?: any;
}

const palettes = [
  {
    value: 'pallette_1',
    title: 'EUI color blind (fixed)',
    palette: euiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'pallette_2',
    title: 'EUI palette for status (gradient)',
    palette: euiPaletteForStatus(5),
    type: 'gradient',
  },
  {
    value: 'pallette_3',
    title: 'EUI palette for temperature (fixed)',
    palette: euiPaletteForTemperature(5),
    type: 'fixed',
  },
  {
    value: 'pallette_4',
    title: 'Grayscale (gradient with stops)',
    palette: [
      {
        stop: 100,
        color: 'white',
      },
      {
        stop: 250,
        color: 'lightgray',
      },
      {
        stop: 320,
        color: 'gray',
      },
      {
        stop: 470,
        color: 'black',
      },
    ],
    type: 'gradient',
  },
  {
    value: 'pallette_5',
    title: 'Grayscale (fixed with stops)',
    palette: [
      {
        stop: 100,
        color: 'white',
      },
      {
        stop: 250,
        color: 'lightgray',
      },
      {
        stop: 320,
        color: 'gray',
      },
      {
        stop: 470,
        color: 'black',
      },
    ],
    type: 'fixed',
  },
  {
    value: 'custom',
    title: 'Plain text as a custom option',
    type: 'text',
  },
];

export default function ColorPalettePicker(props: IColorPalettePickerProps) {
  const { onChange, value, options = palettes, ...others } = props;

  const [pallette, setPallette] = useState(value ? value : 'pallette_1');

  React.useEffect(() => {
    onChange(pallette);
  }, [pallette]);

  return (
    <EuiColorPalettePicker
      palettes={options}
      onChange={setPallette}
      valueOfSelected={pallette}
      {...others}
    />
  );
}
