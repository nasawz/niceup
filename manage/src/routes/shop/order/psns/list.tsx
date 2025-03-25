import {
  EuiBasicTable,
  EuiButtonIcon,
  EuiDescriptionList,
  EuiPanel,
} from '@elastic/eui';
import _ from 'lodash';
import * as React from 'react';
import ExpModal from '../expModal';

export interface IPsnsListProps {
  data;
}

export default function PsnsList({ data, mutate }: any) {
  const expModal: any = React.useRef(null);
  const columns: any = [
    {
      field: 'product_title',
      name: '商品',
      // width: '200px',
      // render: (product_title, item) => {
      //   console.log(item);
      //   return (
      //     <>
      //       {product_title}
      //       <EuiButtonIcon
      //         onClick={() => {
      //           expModal.current.show(data!._id)
      //         }}
      //         iconType="inspect"
      //       />
      //     </>
      //   )
      // }
    },
    {
      field: 'spec_title',
      name: '规格',
      width: '160px',
    },
    {
      field: 'num',
      name: '数量',
      width: '80px',
    },
    {
      field: 'spec_price',
      name: '单价',
      width: '80px',
    },
    {
      field: 'spec_weight',
      name: '重量',
      width: '80px',
    },
    {
      field: 'spec_three',
      name: '三方',
      width: '80px',
    },
    {
      // field: 'spec_three',
      name: '快递',
      render: (item, index) => {
        // console.log(_.indexOf(data.psns, item));
        const exp = data.exp[_.indexOf(data.psns, item)];
        return exp ? `${exp.expType} ${exp.expNumber}` : '-';
      },
    },
  ];

  return (
    <EuiPanel paddingSize="none">
      <EuiBasicTable
        rowHeader="product_title"
        compressed
        items={data.psns}
        columns={columns}
      />
      <ExpModal ref={expModal} onSucc={mutate} />
    </EuiPanel>
  );
}
