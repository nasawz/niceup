import * as React from 'react';
import { List } from 'rc-field-form';
import FormRow from '../formRow';
import { ReactNode } from 'react';
import { EuiButtonEmpty, EuiFormRow } from '@elastic/eui';
export interface IFormListProps {
  label?: React.ReactNode;
  name: any;
  children: ReactNode;
  helpText?: any;
  labelAppend?: any;
  hasChildLabel?: any;
  messageVariables?: any;
  fullWidth?: any;
  style?: any;
  psns?: [];
}

export default function FormList(props: IFormListProps) {
  const {
    name,
    label,
    helpText,
    labelAppend,
    hasChildLabel,
    fullWidth,
    style,
    children,
    psns,
    ...restProps
  } = props;

  // const childNode =
  //   typeof children === 'function'
  //     ? children(control, meta, form)
  //     : React.cloneElement(children as React.ReactElement, {
  //       ...control,
  //     });
  return (
    <List
      name={name}
      // initialValue={['bamboo', 'light']}
      rules={[
        {
          message: '至少包含一条数据!',
          validator: async (_, value) => {
            if (value.length < 1) {
              throw new Error();
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => {
        // console.log('-------', fields);

        return (
          <>
            {fields.map((field, index) => {
              // console.log('-------', field);
              return (
                <FormRow
                  hasChildLabel={hasChildLabel}
                  helpText={helpText}
                  // label={label}
                  labelAppend={labelAppend}
                  fullWidth={fullWidth}
                  style={style}
                  {...field}
                  {...restProps}
                  rules={[{ required: true }]}
                  key={index}
                >
                  {(control, meta, form) => {
                    const childNode =
                      typeof children === 'function'
                        ? children(control, meta, form, add, remove, index)
                        : React.cloneElement(children as React.ReactElement, {
                            ...control,
                            add,
                            remove,
                            index,
                          });
                    return <>{childNode}</>;
                  }}
                </FormRow>
              );
            })}
            {/* <EuiFormRow >
              <EuiButtonEmpty size="xs" color="text" onClick={() => { add() }}>
                增加地址
              </EuiButtonEmpty>
            </EuiFormRow> */}
          </>
        );
      }}
    </List>
  );
}
