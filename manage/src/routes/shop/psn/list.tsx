import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormControlLayout,
  EuiFormRow,
  EuiFieldSearch,
  EuiButton,
  EuiSpacer,
  EuiBasicTable,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiText,
  EuiFieldText,
  EuiFieldPassword,
  EuiConfirmModal,
  EuiOverlayMask,
  EuiTextColor,
  EuiFieldNumber,
  EuiImage,
  EuiCopy,
  EuiButtonIcon,
  EuiSearchBar,
  EuiHealth,
  EuiFilterGroup,
  EuiFilterButton,
  EuiIcon,
  EuiPopover,
  EuiFilterSelectItem,
  EuiButtonEmpty,
  EuiSwitch,
} from '@elastic/eui';
import value from '@elastic/eui/dist/eui_theme_*.json';
import _, { divide } from 'lodash';
import moment from 'moment';
import { Field } from 'rc-field-form';
import Form from 'rc-field-form/es/Form';
import * as React from 'react';
import { useRef, useState } from 'react';
import { DatePickerRange, FilterList } from '../../../components/formControls';
import { useAllProduct } from '../../../hook/useProduct';
import { usePsn } from '../../../hook/usePsn';
import { useTag } from '../../../hook/useTag';
import { useToast } from '../../../hook/useToast';
import { creatCsvFile, downloadFile } from 'download-csv';

export interface IPsnListProps {}

export default function PsnList(props: IPsnListProps) {
  const { data: products }: any = useAllProduct();
  const [compressedAddress, setCompressedAddress] = useState(false);

  // ==================== Table
  const [dataParams, setDataParams] = useState({
    sortField: 'updatedAt',
    sortDirection: 'desc',
    search: '',
  });
  // filters['product_title'],
  //   filters['spec_three'],
  //   filters['state'],
  //   filters['time_range']['startDate'],
  //   filters['time_range']['endDate']],
  const [filterParams, setFilterParams]: any = useState({
    time_range: { startDate: 0, endDate: 0 },
  });

  const [editId, setEditId] = useState(null);
  const { data, error, mutate }: any = usePsn(dataParams, filterParams);

  const [selectedItems, setSelectedItems] = useState([]);
  const isLoading = !error && !data;

  const { showToast } = useToast();

  const tableRef: any = useRef();

  const onTableChange = ({ sort }: any) => {
    const { field: sortField, direction: sortDirection } = sort;
    const newParams = _.merge({}, dataParams, {
      sortField,
      sortDirection,
    });
    setDataParams(newParams);
  };

  const onSearchChange = search => {
    const fn = () => {
      const newParams = _.merge({}, dataParams, { search });
      setDataParams(newParams);
    };
    _.debounce(() => {
      fn();
    }, 500)();
  };

  const onSelectionChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  const sorting: any = {
    sort: {
      field: dataParams.sortField,
      direction: dataParams.sortDirection,
    },
  };

  const selection: any = {
    selectable: data => {
      return true; //TODO selectable
    },
    selectableMessage: selectable => (!selectable ? '无法选择' : undefined),
    onSelectionChange: onSelectionChange,
    initialSelected: [],
  };

  const psnsElem = psns => {
    return (
      <ul>
        {_.map(psns, psn => {
          return <li>{`${psn.name} x ${psn.num.$numberInt}`}</li>;
        })}
      </ul>
    );
  };

  const columns: any = _.compact([
    // {
    //   field: 'avatarUrl',
    //   name: 'avatarUrl',
    //   render: avatarUrl => (
    //     <EuiImage size="s" hasShadow alt="image" url={avatarUrl} />
    //   ),
    // },
    // {
    //   field: 'oid',
    //   name: 'id',
    // },
    !compressedAddress && {
      field: 'name',
      name: '姓名',
      width: '80px',
    },
    !compressedAddress && {
      field: 'phone',
      name: '电话',
      width: '120px',
    },
    !compressedAddress && {
      field: 'address',
      name: '地址',
      width: '420px',
    },
    compressedAddress && {
      field: 'full',
      name: '收货地址',
    },
    {
      field: 'psns',
      name: '商品',
      render: psns => {
        const items = _.map(psns, (psn, i) => {
          return <div key={i}>{`${psn.name} x ${psn.num}`}</div>;
        });
        return <div>{items}</div>;
      },
    },

    {
      field: 'totalWeight',
      name: '重量',
      width: '180px',
    },
    {
      field: 'nickName',
      name: '微信',
      width: '120px',
    },
    {
      field: 'updatedAt',
      name: '更新时间',
      sortable: true,
      width: '180px',
      render: time => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    // {
    //   name: '操作',
    //   actions,
    // },
  ]);

  // ==============
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const renderDataTableCtl = () => {
    return (
      <Form
        initialValues={
          { state: { label: '已付款', value: 2 } }
          // { state: { label: "已发货", value: 4 } }
        }
        onValuesChange={(changedValues, values) => {
          setFilterParams(values);
        }}
      >
        <EuiFlexGroup
          gutterSize="l"
          justifyContent="spaceBetween"
          direction="row"
          responsive
        >
          <EuiFlexItem>
            <EuiFlexGroup
              gutterSize="s"
              direction="row"
              responsive
              alignItems="center"
            >
              <EuiFlexItem>
                <EuiFormControlLayout fullWidth>
                  <EuiFormRow fullWidth>
                    <EuiFieldSearch
                      placeholder="搜索..."
                      fullWidth
                      onChange={e => onSearchChange(e.target.value)}
                      isClearable={true}
                    />
                  </EuiFormRow>
                </EuiFormControlLayout>
              </EuiFlexItem>

              <EuiFlexItem grow={false}>
                <EuiFilterGroup>
                  <Field name="product_title">
                    <FilterList
                      title="商品"
                      options={_.concat(
                        [
                          {
                            label: '全部',
                            value: undefined,
                          },
                        ],
                        products ? products : [],
                      )}
                    />
                  </Field>
                  <Field name="state">
                    <FilterList
                      title="状态"
                      options={[
                        {
                          label: '已下单',
                          value: 0,
                        },
                        {
                          label: '已付款',
                          value: 2,
                        },
                        {
                          label: '已关闭',
                          value: -1,
                        },
                        {
                          label: '已退款',
                          value: -2,
                        },
                        {
                          label: '已发货',
                          value: 4,
                        },
                      ]}
                    />
                  </Field>
                  <Field name="spec_three">
                    <FilterList
                      title="发货方"
                      options={[
                        {
                          label: '不限',
                          value: undefined,
                        },
                        {
                          label: '代发货',
                          value: true,
                        },
                        {
                          label: '自发货',
                          value: false,
                        },
                      ]}
                    />
                  </Field>
                </EuiFilterGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={1}>
            <EuiFlexGroup
              gutterSize="s"
              justifyContent="flexEnd"
              alignItems="center"
              direction="row"
              responsive
              wrap
            >
              <EuiFlexItem grow={false}>
                <Field name="time_range">
                  <DatePickerRange />
                </Field>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton
                  disabled={isLoading}
                  fill
                  iconType="logstashOutput"
                  onClick={handleExport}
                >
                  数据导出
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Form>
    );
  };
  // ==============导出
  const handleExport = () => {
    const columns_key = _.compact([
      'no',
      !compressedAddress && 'name',
      !compressedAddress && 'phone',
      !compressedAddress && 'address',
      compressedAddress && 'full',
      'psns',
      'totalWeight',
      'nickName',
    ]);
    const columns_lable = _.compact([
      '序号',
      !compressedAddress && '姓名',
      !compressedAddress && '电话',
      !compressedAddress && '地址',
      compressedAddress && '收货地址',
      '商品',
      '总重量',
      '微信',
    ]);
    const columns = _.zipObject(columns_key, columns_lable);
    // console.log(columns);

    // console.log(_.keys(columns));

    const items = _.map(data, (d, index) => {
      // let { codes, products, address, ...others } = d
      const r = {};
      _.map(_.keys(columns), key => {
        if (key == 'totalWeight') {
          r[key] = d['totalWeight'];
        } else if (key == 'psns') {
          r[key] = _.map(d['psns'], psn => {
            return `${psn.name}x${psn['num']}`;
          }).join('|');
        } else {
          r[key] = d[key];
        }
      });
      r['no'] = index + 1;
      return r;
    });

    const csvFile = creatCsvFile(items, columns);
    downloadFile(
      csvFile,
      `${_.compact([
        filterParams.state?.value,
        filterParams.product_title?.label,
        filterParams.spec_three?.value,
        filterParams.time_range.startDate,
        filterParams.time_range.endDate,
      ]).join('-')}-${moment().format('YYYY-MM-DD H:mm')}.csv`,
    );
  };

  const renderDataTable = () => {
    return (
      <EuiBasicTable
        compressed
        loading={isLoading}
        ref={tableRef}
        items={data ? data : []}
        itemId="oid"
        columns={columns}
        sorting={sorting}
        isSelectable={false}
        // selection={selection}
        onChange={onTableChange}
        // rowHeader="title"
      />
    );
  };

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>备货</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection>
              <EuiPopover
                panelPaddingSize="s"
                isOpen={isSettingOpen}
                closePopover={() => setIsSettingOpen(false)}
                button={
                  <EuiButtonEmpty
                    iconType="controlsHorizontal"
                    size="xs"
                    onClick={() => {
                      setIsSettingOpen(true);
                    }}
                  ></EuiButtonEmpty>
                }
              >
                <div>
                  <EuiFlexGroup
                    wrap={true}
                    direction="column"
                    gutterSize="s"
                    responsive={false}
                  >
                    <EuiFlexItem grow={false}>
                      <EuiSwitch
                        compressed
                        label={'整合收货地址'}
                        checked={compressedAddress}
                        onChange={e => {
                          setCompressedAddress(!compressedAddress);
                        }}
                      />
                    </EuiFlexItem>
                    {/* <EuiFlexItem grow={false}>
                      <EuiSwitch
                        compressed
                        label={'整合商品'}
                        checked={false}
                        onChange={e => { }}
                      />
                    </EuiFlexItem> */}
                  </EuiFlexGroup>
                </div>
              </EuiPopover>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            {renderDataTableCtl()}
            <EuiSpacer />
            {renderDataTable()}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
