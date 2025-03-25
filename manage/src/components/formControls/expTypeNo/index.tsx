import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormControlLayoutDelimited,
  EuiFormLabel,
} from '@elastic/eui';
import _ from 'lodash';
import * as React from 'react';
import { htmlIdGenerator } from '@elastic/eui/lib/services';

export default function ExpTypeNo(props: any) {
  const { onChange, value, add, remove, index, ...others } = props;
  const id = React.useRef(htmlIdGenerator()());
  const [expNumber, setExpNumber]: any = React.useState(
    value ? value.expNumber : '',
  );
  const [expType, setExpType]: any = React.useState(value ? value.expType : '');

  React.useEffect(() => {
    onChange({ expType, expNumber, title: value.title });
  }, [expType, expNumber]);

  return (
    <EuiFlexGroup key={id.current} alignItems="center" justifyContent="center">
      <EuiFlexItem>
        <EuiFormControlLayoutDelimited
          fullWidth={true}
          // prepend={<EuiFormLabel>{value.title}</EuiFormLabel>}
          startControl={
            <input
              type="text"
              value={expType == '' ? value.title : expType}
              placeholder="类型"
              className="euiFieldText"
              onChange={e => {
                setExpType(e.target.value);
              }}
            />
          }
          delimiter="|"
          endControl={
            <input
              type="text"
              value={expNumber}
              placeholder="单号"
              className="euiFieldText"
              onChange={e => {
                setExpNumber(e.target.value);
              }}
            />
          }
        />
      </EuiFlexItem>
      {/* <EuiFlexItem grow={false}>
        {index == 0 ? (
          <EuiButtonIcon
            onClick={() => {
              add();
            }}
            iconType="plusInCircle"
          ></EuiButtonIcon>
        ) : (
            ''
          )}
        {index > 0 ? (
          <EuiButtonIcon
            onClick={() => {
              remove(index);
            }}
            iconType="minusInCircle"
          ></EuiButtonIcon>
        ) : (
            ''
          )}
      </EuiFlexItem> */}
    </EuiFlexGroup>
  );
}
