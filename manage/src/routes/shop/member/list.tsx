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
} from '@elastic/eui';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useMember } from '../../../hook/useMember';
import { useToast } from '../../../hook/useToast';

export interface IMemberListProps {}

export default function MemberList(props: IMemberListProps) {
  // ==================== Table
  const [dataParams, setDataParams] = useState({
    pageIndex: 0,
    pageSize: 30,
    sortField: 'updatedAt',
    sortDirection: 'desc',
    search: '',
  });

  const [editId, setEditId] = useState(null);
  const { data, error, mutate }: any = useMember(dataParams);

  const [selectedItems, setSelectedItems] = useState([]);
  const isLoading = !error && !data;

  const { showToast } = useToast();

  const tableRef: any = useRef();

  const onTableChange = ({ page, sort }: any) => {
    const oriPage = { index: dataParams.pageIndex, size: dataParams.pageSize };
    const { index: pageIndex, size: pageSize } = page ? page : oriPage;
    const { field: sortField, direction: sortDirection } = sort;
    const newParams = _.merge({}, dataParams, {
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
    });
    setDataParams(newParams);
  };

  const onSearchChange = search => {
    const fn = () => {
      const newParams = _.merge({}, dataParams, { pageIndex: 0, search });
      setDataParams(newParams);
    };
    _.debounce(() => {
      fn();
    }, 500)();
  };

  const onSelectionChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  const pagination: any = {
    pageIndex: dataParams.pageIndex,
    pageSize: dataParams.pageSize,
    totalItemCount: data ? data.count : 0,
    hidePerPageOptions: true,
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

  const actions = [];

  const columns: any = [
    // {
    //   field: 'avatarUrl',
    //   name: 'avatarUrl',
    //   render: avatarUrl => (
    //     <EuiImage size="s" hasShadow alt="image" url={avatarUrl} />
    //   ),
    // },
    {
      field: 'nickName',
      name: '微信',
    },
    {
      field: 'gender',
      name: '性别',
    },
    {
      field: 'province',
      name: '省',
    },
    {
      field: 'city',
      name: '市',
    },
    {
      field: 'openid',
      name: 'openid',
      render: openid => (
        <EuiCopy textToCopy={openid}>
          {copy => (
            <EuiButtonIcon
              onClick={copy}
              iconType="copyClipboard"
              aria-label="copyClipboard"
            />
          )}
        </EuiCopy>
      ),
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
  ];

  const renderDataTableCtl = () => {
    return (
      <EuiFlexGroup
        gutterSize="l"
        justifyContent="spaceBetween"
        direction="row"
        responsive
      >
        <EuiFlexItem grow={2}>
          <EuiFlexGroup gutterSize="s" direction="row" responsive>
            <EuiFlexItem grow={1}>
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
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiFlexGroup
            gutterSize="s"
            justifyContent="flexEnd"
            direction="row"
            responsive
            wrap
          >
            <EuiFlexItem grow={false}></EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  const renderDataTable = () => {
    return (
      <EuiBasicTable
        compressed
        loading={isLoading}
        ref={tableRef}
        items={data ? data.list : []}
        itemId="_id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        isSelectable={false}
        selection={selection}
        onChange={onTableChange}
        rowHeader="title"
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
                <h2>会员</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection></EuiPageContentHeaderSection>
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
