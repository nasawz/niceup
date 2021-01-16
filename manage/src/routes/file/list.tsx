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
} from '@elastic/eui';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useFile, useFileById } from '../../hook/useFile';
import { useFileMuation } from '../../hook/useFileMuation';
import { useToast } from '../../hook/useToast';

export interface IFileListProps {}

export default function FileList(props: IFileListProps) {
  // ==================== Table
  const [dataParams, setDataParams] = useState({
    pageIndex: 0,
    pageSize: 10,
    sortField: 'sort',
    sortDirection: 'desc',
    search: '',
  });
  const { data, error, mutate }: any = useFile(dataParams);
  const [selectedItems, setSelectedItems] = useState([]);
  const isLoading = !error && !data;
  const { destroy } = useFileMuation();
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

  const renderDeleteButton = () => {
    if (selectedItems.length === 0) {
      return;
    }
    return (
      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          onClick={() => {
            const ids = selectedItems.map((o: any) => {
              return o.fileID;
            });
            showDestroyModal(ids);
          }}
        >
          删除 ({selectedItems.length})
        </EuiButton>
      </EuiFlexItem>
    );
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

  const actions = [
    {
      name: item => (item.fileID ? '删除' : ''),
      available: data => true, //TODO
      description: '删除',
      icon: 'trash',
      color: 'danger',
      type: 'icon',
      onClick: item => {
        showDestroyModal([item.fileID]);
      },
      isPrimary: true,
      'data-test-subj': 'action-delete',
    },
  ];

  const columns: any = [
    {
      field: 'tempFileURL',
      name: '图片',
      render: tempFileURL => (
        <EuiImage size="m" hasShadow alt="image" url={tempFileURL} />
      ),
    },
    {
      field: 'updatedAt',
      name: '更新时间',
      sortable: true,
      render: time => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      name: '操作',
      actions,
    },
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
            {renderDeleteButton()}
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
        loading={isLoading}
        ref={tableRef}
        items={data ? data.list : []}
        itemId="fileID"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        isSelectable={true}
        selection={selection}
        onChange={onTableChange}
        rowHeader="title"
      />
    );
  };

  const [destroyModalConf, setDestroyModalConf] = useState({
    isDestroyModalVisible: false,
    ids: null,
  });
  const closeDestroyModal = () =>
    setDestroyModalConf({ isDestroyModalVisible: false, ids: null });
  const showDestroyModal = ids =>
    setDestroyModalConf({ isDestroyModalVisible: true, ids });
  const confirmDestroy = () => {
    // destroyModalConf.id
    // destroyModalConf.ids
    if (destroyModalConf.ids) {
      destroy(destroyModalConf.ids, err => {
        if (!err) {
          showToast('删除成功');
          mutate();
        }
      });
    }
    closeDestroyModal();
  };
  let destroyModal;
  if (destroyModalConf.isDestroyModalVisible) {
    destroyModal = (
      <EuiOverlayMask>
        <EuiConfirmModal
          title="确认要删除吗 ？"
          onCancel={closeDestroyModal}
          onConfirm={confirmDestroy}
          cancelButtonText="取消"
          confirmButtonText="删除"
          buttonColor="danger"
          defaultFocusedButton="confirm"
        >
          <p>删除后无法恢复 !</p>
        </EuiConfirmModal>
      </EuiOverlayMask>
    );
  }

  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>文件</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection></EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            {renderDataTableCtl()}
            <EuiSpacer />
            {renderDataTable()}
            {destroyModal}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
