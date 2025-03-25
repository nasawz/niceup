import { EuiFormRow } from '@elastic/eui';
import { Field } from 'rc-field-form';
import * as React from 'react';
import { ReactNode } from 'react';

export interface IFormRowProps {
  label?: React.ReactNode;
  name: any;
  children: ReactNode;
  rules?: any;
  helpText?: any;
  labelAppend?: any;
  hasChildLabel?: any;
  messageVariables?: any;
  dependencies?: any;
  fullWidth?: any;
  style?: any;
}

export default function FormRow(props: IFormRowProps) {
  const {
    name,
    label,
    children,
    helpText,
    labelAppend,
    hasChildLabel,
    fullWidth,
    style,
    ...restProps
  } = props;

  return (
    <Field name={name} {...restProps}>
      {(control, meta, form) => {
        const childNode =
          typeof children === 'function'
            ? children(control, meta, form)
            : React.cloneElement(children as React.ReactElement, {
                ...control,
              });
        return (
          <>
            <EuiFormRow
              hasChildLabel={hasChildLabel}
              label={label}
              error={meta.errors}
              isInvalid={meta.errors.length > 0}
              helpText={helpText}
              labelAppend={labelAppend}
              fullWidth={fullWidth}
              style={style}
            >
              {childNode}
            </EuiFormRow>
          </>
        );
      }}
    </Field>
  );
}
