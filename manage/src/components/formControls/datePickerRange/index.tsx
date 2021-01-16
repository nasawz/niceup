import * as React from 'react';
import { EuiDatePicker, EuiDatePickerRange } from '@elastic/eui';
import { useState } from 'react';
import moment from 'moment';

export interface IDatePickerRangeProps {}

export default function DatePickerRange({ onChange, value, ...others }: any) {
  const [startDate, setStartDate] = useState(
    value ? moment(value.startDate) : moment().subtract(30, 'd'),
  );
  const [endDate, setEndDate] = useState(
    value ? moment(value.endDate) : moment(),
  );
  const handleChangeStart = date => {
    setStartDate(date);

    onChange({
      startDate: parseInt(date.format('x')),
      endDate: parseInt(endDate.format('x')),
    });
  };

  const handleChangeEnd = date => {
    setEndDate(date);
    onChange({
      startDate: parseInt(startDate.format('x')),
      endDate: parseInt(date.format('x')),
    });
  };

  React.useEffect(() => {
    onChange({
      startDate: parseInt(startDate.format('x')),
      endDate: parseInt(endDate.format('x')),
    });
  }, []);

  return (
    <EuiDatePickerRange
      startDateControl={
        <EuiDatePicker
          selected={startDate}
          onChange={handleChangeStart}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="Start date"
          showTimeSelect
        />
      }
      endDateControl={
        <EuiDatePicker
          selected={endDate}
          onChange={handleChangeEnd}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="End date"
          showTimeSelect
        />
      }
    />
  );
}
