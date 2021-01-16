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
  RIGHT_ALIGNMENT,
  EuiButtonIcon,
  EuiDescriptionList,
  EuiBadge,
} from '@elastic/eui';
import _ from 'lodash';
import moment from 'moment';
import Form, { Field, useForm } from 'rc-field-form';
import * as React from 'react';
import { useRef, useState } from 'react';
import {
  ColorPicker,
  ExpTypeNo,
  Switch,
} from '../../../components/formControls';
import ContentEditor from '../../../components/formControls/contentEditor';
import FieldNumber from '../../../components/formControls/fieldNumber';
import FilePicker from '../../../components/formControls/filePicker';
import FormList from '../../../components/formList';
import FormRow from '../../../components/formRow';
import { useMessageMuation } from '../../../hook/useMessageMuation';
import { useOrder, useOrderById } from '../../../hook/useOrder';
import { useOrderMuation } from '../../../hook/useOrderMuation';
import { useToast } from '../../../hook/useToast';
import PsnsList from './psns/list';
import ExpModal from './expModal';

export interface IOrderListProps {}

export default function OrderList(props: IOrderListProps) {
  const expModal: any = useRef(null);
  // ==================== Table
  const [dataParams, setDataParams] = useState({
    pageIndex: 0,
    pageSize: 30,
    sortField: 'createdAt',
    sortDirection: 'desc',
    search: '',
  });

  const [editId, setEditId] = useState(null);
  const { data, error, mutate }: any = useOrder(dataParams);
  const {
    data: editData,
    error: editError,
    mutate: editMutate,
  }: any = useOrderById(editId);

  const [selectedItems, setSelectedItems] = useState([]);
  // const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState({});
  const itemIdToExpandedRowMap: any = {};
  if (data && data.list) {
    _.map(data.list, item => {
      itemIdToExpandedRowMap[item._id] = (
        <PsnsList data={item} mutate={mutate} />
      );
    });
  }

  const isLoading = !error && !data;
  const isEditLoading = !editError && !editData;

  const { update, close, refund } = useOrderMuation();

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
          关闭 ({selectedItems.length})
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
      return data.state != 4 && data.state != 2 && data.state != -1; //TODO selectable
    },
    selectableMessage: selectable => (!selectable ? '无法选择' : undefined),
    onSelectionChange: onSelectionChange,
    initialSelected: [],
  };

  // const toggleDetails = item => {
  //   const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
  //   if (itemIdToExpandedRowMapValues[item._id]) {
  //     delete itemIdToExpandedRowMapValues[item._id];
  //   } else {
  //     itemIdToExpandedRowMapValues[item._id] = <PsnsList data={item} />;
  //   }
  //   setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  // };

  const actions = [
    {
      name: '发货',
      available: data => data.state > 1, //TODO
      description: '发货',
      icon: 'push',
      type: 'icon',
      onClick: item => {
        // refund(() => { })
        // send(() => { });
        expModal.current.show(item._id);
      },
      isPrimary: true,
      'data-test-subj': 'action-edit',
    },
    {
      name: '退款',
      available: data => data.state > 0 && data.state < 4, //TODO
      description: '退款',
      icon: 'editorUndo',
      type: 'icon',
      onClick: item => {
        showRefundModal({
          outTradeNo: item.outTradeNo,
          payed_fee: item.payed_fee,
          order_id: item._id,
        });
      },
      // isPrimary: true,
      'data-test-subj': 'action-edit',
    },
    {
      name: '地址',
      available: data => data.state > 0 && data.state < 4, //TODO
      description: '地址',
      icon: 'visMapRegion',
      type: 'icon',
      onClick: item => {
        showFlyout(item._id);
      },
      // isPrimary: true,
      'data-test-subj': 'action-edit',
    },
  ];

  const columns: any = [
    {
      field: 'outTradeNo',
      name: '订单号',
      truncateText: true,
    },
    {
      field: 'price',
      name: '付款',
      width: '100px',
      truncateText: true,
      render: (state, rec) => {
        return (
          <>
            {/* 总价:{rec.price}
            <br />
            运费:{rec.freight_fee}
            <br />
            ——
            <br /> */}
            {/* 付款: */}
            {rec.payed_fee / 100}
          </>
        );
      },
    },
    // {
    //   field: 'freight_type',
    //   name: '物流',
    //   width: '80px',
    // },
    {
      field: 'state',
      name: '状态',
      truncateText: true,
      render: state => {
        let s;
        switch (state) {
          case 0:
            s = {
              color: 'default',
              txt: '已下单',
            };
            break;
          case 2:
            s = {
              color: 'warning',
              txt: '已付款',
            };
            break;
          case -1:
            s = {
              color: 'danger',
              txt: '已关闭',
            };
            break;
          case -2:
            s = {
              color: 'default',
              txt: '已退款',
            };
            break;
          case 4:
            s = {
              color: 'secondary',
              txt: '已发货',
            };
            break;
          default:
            s = {
              color: 'danger',
              txt: '异常',
            };
            break;
        }
        return <EuiBadge color={s.color}>{s.txt}</EuiBadge>;
      },
    },
    {
      field: 'weight',
      name: '重量',
      truncateText: true,
    },
    {
      field: 'createdAt',
      name: '时间',
      sortable: true,
      width: '200px',
      truncateText: true,
      render: (time, rec) => {
        return (
          <div>
            下单 : {moment(time).format('YYYY-MM-DD HH:mm:ss')}
            <br />
            {rec.payedAt
              ? `付款 : ${moment(rec.payedAt).format('YYYY-MM-DD HH:mm:ss')}`
              : ''}
          </div>
        );
      },
    },
    {
      field: 'nickName',
      name: '微信',
      truncateText: true,
    },
    {
      field: 'name',
      name: '姓名',
      truncateText: true,
    },
    {
      field: 'phone',
      name: '手机',
      truncateText: true,
    },
    {
      name: '地址',
      width: '220px',
      // truncateText: true,
      render: item =>
        `${item.provinceName}${item.cityName}${item.countyName}${item.detailInfo}`,
    },
    // {
    //   name: '快递',
    //   width: '220px',
    //   render: item => {
    //     if (item.exp.length > 0) {
    //       return item.exp.map((itemexp: any, index) => {
    //         return (
    //           <>
    //             {`${itemexp.expType} ${itemexp.expNumber}`}
    //             <br />
    //           </>
    //         );
    //       });
    //     } else {
    //       return '-';
    //     }
    //   },
    // },
    {
      name: '操作',
      actions,
    },
    // {
    //   align: RIGHT_ALIGNMENT,
    //   width: '40px',
    //   isExpander: true,
    //   render: item => (
    //     <EuiButtonIcon
    //       onClick={() => toggleDetails(item)}
    //       aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
    //       iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
    //     />
    //   ),
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
        compressed
        loading={isLoading}
        ref={tableRef}
        items={data ? data.list : []}
        itemId="_id"
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        isExpandable={true}
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
  // ==============refund
  const [refundModalConf, setRefundModalConf] = useState({
    isRefundModalVisible: false,
    params: null,
  });
  const closeRefundModal = () =>
    setRefundModalConf({ isRefundModalVisible: false, params: null });
  const showRefundModal = params =>
    setRefundModalConf({ isRefundModalVisible: true, params });
  const confirmRefund = () => {
    const { params }: any = refundModalConf;
    refund(params.outTradeNo, params.payed_fee, params.order_id, err => {
      if (!err) {
        showToast('退款成功');
        mutate();
      }
    });
    closeRefundModal();
  };
  let refundModal;
  if (refundModalConf.isRefundModalVisible) {
    refundModal = (
      <EuiOverlayMask>
        <EuiConfirmModal
          title="确认退款"
          onCancel={closeRefundModal}
          onConfirm={confirmRefund}
          cancelButtonText="取消"
          confirmButtonText="退款"
          buttonColor="danger"
          defaultFocusedButton="confirm"
        >
          <p>退款后无法恢复 !</p>
        </EuiConfirmModal>
      </EuiOverlayMask>
    );
  }

  //============= destroy
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
      close(destroyModalConf.ids, err => {
        if (!err) {
          showToast('关闭成功');
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
          title="确认要关闭吗 ？"
          onCancel={closeDestroyModal}
          onConfirm={confirmDestroy}
          cancelButtonText="取消"
          confirmButtonText="关闭"
          buttonColor="danger"
          defaultFocusedButton="confirm"
        >
          <p>关闭后无法恢复 !</p>
        </EuiConfirmModal>
      </EuiOverlayMask>
    );
  }

  // ==================== Form
  const [form] = useForm();
  const clearForm = () => {
    form.setFieldsValue({
      _id: null,
      name: null,
      phone: null,
      provinceName: null,
      cityName: null,
      countyName: null,
      detailInfo: null,
    });
  };
  const handleFinish = values => {
    update(editId, values, err => {
      if (!err) {
        mutate();
        showToast('更新成功');
        closeFlyout();
      }
    });
  };

  const renderForm = () => {
    if ((editId && !_.isEmpty(editData) && !isEditLoading) || !editId) {
      if (form) {
        form.setFieldsValue(editData);
      }
      // form.setFieldsValue({ exp: [{ expType: '', expNumber: '' }] });
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
          <FormRow
            name="name"
            label="name"
            messageVariables={{ displayName: 'name' }}
            rules={[{ required: true }]}
          >
            <EuiFieldText />
          </FormRow>
          <FormRow
            name="phone"
            label="phone"
            messageVariables={{ displayName: 'phone' }}
            rules={[{ required: true }]}
          >
            <EuiFieldText />
          </FormRow>
          <FormRow
            name="provinceName"
            label="provinceName"
            messageVariables={{ displayName: 'provinceName' }}
            rules={[{ required: true }]}
          >
            <EuiFieldText />
          </FormRow>
          <FormRow
            name="cityName"
            label="cityName"
            messageVariables={{ displayName: 'cityName' }}
            rules={[{ required: true }]}
          >
            <EuiFieldText />
          </FormRow>
          <FormRow
            name="countyName"
            label="countyName"
            messageVariables={{ displayName: 'countyName' }}
            rules={[{ required: true }]}
          >
            <EuiFieldText />
          </FormRow>
          <FormRow
            name="detailInfo"
            label="detailInfo"
            messageVariables={{ displayName: 'detailInfo' }}
            rules={[{ required: true }]}
          >
            <EuiFieldText />
          </FormRow>
          {/* <FormList
            name="exp"
            label="exp"
            messageVariables={{ displayName: 'exp' }}>
            <ExpTypeNo />
          </FormList> */}
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
            <h2 id="flyoutSmallTitle">收货人信息</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>{renderForm()}</EuiFlyoutBody>
      </EuiFlyout>
    );
  }

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>订单</h2>
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
            {refundModal}
            <ExpModal ref={expModal} onSucc={mutate} />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
