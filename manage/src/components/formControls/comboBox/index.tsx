import { EuiComboBox } from '@elastic/eui';
import * as React from 'react';
import { useState } from 'react';

export default function ComboBox(props: any) {
  const {
    onChange,
    value,
    options: optionsStatic,
    canCreate = false,
    ...others
  } = props;

  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState(value ? value : []);

  const handleChange = selectedOptions => {
    setSelected(selectedOptions);
    onChange(selectedOptions);
  };

  const handleCreateOption = (searchValue, flattenedOptions = []) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option: any) =>
          option.label.trim().toLowerCase() === normalizedSearchValue,
      ) === -1
    ) {
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  return (
    <EuiComboBox
      options={options}
      selectedOptions={selectedOptions}
      onChange={handleChange}
      onCreateOption={canCreate ? handleCreateOption : null}
      isClearable={true}
      data-test-subj="ComboBox"
      {...others}
    />
  );
}
