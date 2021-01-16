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
} from '@elastic/eui';
import _ from 'lodash';
import moment from 'moment';
import Form, { Field, useForm } from 'rc-field-form';
import * as React from 'react';
import { useRef, useState } from 'react';
import FilePicker from '../../components/formControls/filePicker';
import FormRow from '../../components/formRow';
import { useDemoWeb, useDemoWebById } from '../../hook/useDemoWeb';
import { useDemoWebMuation } from '../../hook/useDemoWebMuation';
import { useKv } from '../../hook/useKv';
import { useToast } from '../../hook/useToast';

export interface IExtListProps {}

export default function ExtList(props: IExtListProps) {
  // ==================== Table
  const [dataParams, setDataParams] = useState({
    pageIndex: 0,
    pageSize: 10,
    sortField: 'updatedAt',
    sortDirection: 'desc',
    search: '',
  });
  // const { data: aaaa } = useKv(dataParams)
  // console.log(aaaa);

  const [editId, setEditId] = useState(null);
  const { data, error, mutate } = useDemoWeb(dataParams);
  const {
    data: editData,
    error: editError,
    mutate: editMutate,
  }: any = useDemoWebById(editId);

  const [selectedItems, setSelectedItems] = useState([]);
  const isLoading = !error && !data;
  const isEditLoading = !editError && !editData;

  const { create, update, destroy, state } = useDemoWebMuation();
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
              return o._id;
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
      name: '编辑',
      available: data => true, //TODO
      description: '编辑',
      icon: 'pencil',
      type: 'icon',
      onClick: item => {
        showFlyout(item._id);
      },
      isPrimary: true,
      'data-test-subj': 'action-edit',
    },
    {
      name: item => (item._id ? '删除' : ''),
      available: data => true, //TODO
      description: '删除',
      icon: 'trash',
      color: 'danger',
      type: 'icon',
      onClick: item => {
        showDestroyModal([item._id]);
      },
      isPrimary: true,
      'data-test-subj': 'action-delete',
    },
  ];

  const columns: any = [
    {
      field: 'title',
      name: '标题',
      width: '200px',
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
            <EuiFlexItem grow={false}>
              <EuiButton
                fill
                iconType="plusInCircle"
                onClick={() => {
                  showFlyout(null);
                }}
              >
                创建
              </EuiButton>
            </EuiFlexItem>
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
        itemId="_id"
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

  // ==================== Form
  const [form] = useForm();
  const clearForm = () => {
    form.setFieldsValue({
      _id: null,
      title: null,
      image: null,
      createdAt: null,
      updatedAt: null,
    });
  };
  const handleFinish = values => {
    if (!editId) {
      create(values, err => {
        if (!err) {
          mutate();
          closeFlyout();
          showToast('创建成功');
        }
      });
    } else {
      update(editId, values, err => {
        if (!err) {
          mutate();
          closeFlyout();
          showToast('更新成功');
        }
      });
    }
  };
  const renderForm = () => {
    if ((editId && !_.isEmpty(editData) && !isEditLoading) || !editId) {
      if (form) {
        form.setFieldsValue(editData);
      }

      return (
        <Form
          form={form}
          validateMessages={{
            default: '${name} 看起来怪怪的……',
            required: '你需要一个 ${displayName}',
            types: {
              number: '嗨，这个 ${name} 不是一个合格的 ${type}',
            },
            enum: '${name} 不在 ${enum} 中呢',
            whitespace: '${name} 不可以是空的啦',
            pattern: {
              mismatch: '${name} 并不符合格式：${pattern}',
            },
          }}
          onFinish={handleFinish}
          className="euiForm"
        >
          {/* <Field name="_id" >
            {(control, meta, context) => {
              const { _id } = context.getFieldsValue(true);
              return _id && (
                <EuiFormRow label="_id" style={{ display: 'none' }}>
                  <EuiFieldText value={_id} readOnly disabled />
                </EuiFormRow>
              );
            }}
          </Field> */}

          {/* <FormRow
          name="txt"
          label="EuiFieldText"
          helpText="I am some friendly help text."
          messageVariables={{ displayName: '字段' }}
          rules={[
            // { required: true },
            // { required: true, message: <h1>我是 ReactNode</h1> },
            // { type: 'number' },
            // { type: 'enum', enum: ['aaa', 'bbb'] },
            // { type: 'date' },
            // { whitespace: true },
            // { pattern: /^\w{3}$/ },
            // {
            //   message: '至少两个字符!',
            //   validator: async (_, value) => {
            //     if (value.length < 2) {
            //       throw new Error();
            //     }
            //   },
            // }
          ]}
        >
          <EuiFieldText />
        </FormRow>

        <FormRow
          name="p1"
          messageVariables={{ displayName: '密码' }}
          rules={[{ required: true }]}
        >
          <EuiFieldPassword />
        </FormRow>

        <FormRow
          name="p2"
          dependencies={['p1']}
          messageVariables={{ displayName: '密码2' }}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              async validator(_, value) {
                if (getFieldValue('p1') !== value) {
                  return Promise.reject('p2 is not same as p1');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <EuiFieldPassword />
        </FormRow> */}

          <FormRow
            name="title"
            label="title"
            helpText="I am some friendly help text."
            messageVariables={{ displayName: '标题' }}
            rules={[
              { required: true },
              // { required: true, message: <h1>我是 ReactNode</h1> },
              // { type: 'number' },
              // { type: 'enum', enum: ['aaa', 'bbb'] },
              // { type: 'date' },
              // { whitespace: true },
              // { pattern: /^\w{3}$/ },
              // {
              //   message: '至少两个字符!',
              //   validator: async (_, value) => {
              //     if (value.length < 2) {
              //       throw new Error();
              //     }
              //   },
              // }
            ]}
          >
            <EuiFieldText />
          </FormRow>
          <FormRow
            name="image"
            label="image"
            helpText="I am some friendly help text."
            messageVariables={{ displayName: '封面' }}
            rules={
              [
                // { required: true },
                // { required: true, message: <h1>我是 ReactNode</h1> },
                // { type: 'number' },
                // { type: 'enum', enum: ['aaa', 'bbb'] },
                // { type: 'date' },
                // { whitespace: true },
                // { pattern: /^\w{3}$/ },
                // {
                //   message: '至少两个字符!',
                //   validator: async (_, value) => {
                //     if (value.length < 2) {
                //       throw new Error();
                //     }
                //   },
                // }
              ]
            }
          >
            <FilePicker />
          </FormRow>
          <Field name="createdAt">
            {(control, meta, context) => {
              const { createdAt } = context.getFieldsValue(true);
              return (
                createdAt && (
                  <EuiFormRow label="createdAt">
                    <EuiText color="subdued" size="s">
                      {moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </EuiText>
                  </EuiFormRow>
                )
              );
            }}
          </Field>
          <Field name="updatedAt">
            {(control, meta, context) => {
              const { updatedAt } = context.getFieldsValue(true);
              return (
                updatedAt && (
                  <EuiFormRow label="updatedAt">
                    <EuiText color="subdued" size="s">
                      {moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                    </EuiText>
                  </EuiFormRow>
                )
              );
            }}
          </Field>

          <EuiSpacer />

          <EuiButton type="submit" fill>
            保存
          </EuiButton>
        </Form>
      );
    }
  };
  // ==================== Flyout

  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const closeFlyout = () => {
    clearForm();
    editMutate({}, false);
    setEditId(null);
    setIsFlyoutVisible(false);
  };

  const showFlyout = id => {
    setEditId(id);
    setIsFlyoutVisible(true);
  };

  let flyout;

  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus
        onClose={closeFlyout}
        size="s"
        aria-labelledby="flyoutSmallTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="flyoutSmallTitle">A small flyout</h2>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText color="subdued">
            <p>
              Put navigation items in the header, and cross tab actions in a
              footer.
            </p>
          </EuiText>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>{renderForm()}</EuiFlyoutBody>
      </EuiFlyout>
    );
  }

  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>List</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection></EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            {renderDataTableCtl()}
            <EuiSpacer />
            {renderDataTable()}
            {flyout}
            {destroyModal}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
