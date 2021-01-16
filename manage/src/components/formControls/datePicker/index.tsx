import { EuiDatePicker } from '@elastic/eui';
import * as React from 'react';
import { useState } from 'react';
import moment from 'moment';

export default function DatePicker({ onChange, value, ...others }: any) {
  const [startDate, setStartDate] = useState(value ? moment(value) : null);
  const handleChange = date => {
    setStartDate(date);
    onChange(parseInt(date.format('x')));
  };
  return (
    <EuiDatePicker selected={startDate} onChange={handleChange} {...others} />
  );
}
