import {
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFieldText,
  EuiSpacer,
} from '@elastic/eui';
import _ from 'lodash';
import * as React from 'react';
import store from 'store';
import { useKdy } from '../../../../hook/useKdy';

export interface IExpTableProps {
  phone;
}

export default function ExpTable({ phone }: IExpTableProps) {
  const [cookie, setCookie] = React.useState(store.get('kdy_cookie'));
  const { data } = useKdy({ cookie, phone });
  // console.log(data);

  return (
    <div>
      {/* ExpTable{phone} */}
      <EuiFieldText
        placeholder="Cookie"
        value={cookie}
        onChange={e => {
          const c = e.target.value;
          const fn = () => {
            setCookie(c);
            store.set('kdy_cookie', c);
          };
          _.debounce(() => {
            fn();
          }, 500)();
        }}
      />
      <EuiSpacer size="m" />
      <EuiBasicTable
        rowHeader="product_title"
        compressed
        items={data ? data : []}
        columns={[
          {
            field: 'senderName',
            name: '发件人',
          },
          {
            field: 'receiveName',
            name: '收件人',
          },
          {
            field: 'waybillNo',
            name: '单号',
            width: '200px',
            render: (waybillNo, rec: any) => {
              return (
                <>
                  {`${rec.brand == 'sto' ? '申通' : ''} ${waybillNo}`}
                  <EuiCopy
                    textToCopy={`${
                      rec.brand == 'sto' ? '申通' : ''
                    } ${waybillNo}`}
                  >
                    {copy => <EuiButtonIcon iconType="copy" onClick={copy} />}
                  </EuiCopy>
                </>
              );
            },
          },
          {
            name: '日期',
            field: 'updateTime',
          },
          {
            name: '状态',
            field: 'statusText',
          },
        ]}
      />
    </div>
  );
}
