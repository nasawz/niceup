import { EuiPopover, EuiFilterButton, EuiFilterSelectItem } from '@elastic/eui';
import _ from 'lodash';
import * as React from 'react';
import { useState } from 'react';

export interface IFilterListProps {
  onChange?: any;
  value?: any;
  options?: any;
  title;
}

export default function FilterList(props: IFilterListProps) {
  const { onChange, value, title, options } = props;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <EuiPopover
      id="popover"
      button={
        <EuiFilterButton
          iconType="arrowDown"
          onClick={() => {
            setIsPopoverOpen(!isPopoverOpen);
          }}
          isSelected={isPopoverOpen}
          hasActiveFilters={value && !_.isUndefined(value.value)}
        >
          {value && !_.isUndefined(value.value) ? `${value.label}` : title}
        </EuiFilterButton>
      }
      isOpen={isPopoverOpen}
      closePopover={() => {
        setIsPopoverOpen(false);
      }}
      panelPaddingSize="none"
    >
      <div className="euiFilterSelect__items">
        {options &&
          options.map((item, index) => (
            <EuiFilterSelectItem
              key={index}
              onClick={() => {
                onChange(item);
              }}
            >
              {item.label}
            </EuiFilterSelectItem>
          ))}
      </div>
    </EuiPopover>
  );
}
