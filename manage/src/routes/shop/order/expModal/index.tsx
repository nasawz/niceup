import {
  EuiButton,
  EuiButtonEmpty,
  EuiHorizontalRule,
  EuiLoadingSpinner,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
} from '@elastic/eui';
import _ from 'lodash';
import Form, { Field, useForm } from 'rc-field-form';
import * as React from 'react';
import { useState } from 'react';
import { ExpTypeNo } from '../../../../components/formControls';
import FormList from '../../../../components/formList';
import { useMessageMuation } from '../../../../hook/useMessageMuation';
import { useOrderById } from '../../../../hook/useOrder';
import { useOrderMuation } from '../../../../hook/useOrderMuation';
import { useToast } from '../../../../hook/useToast';
import ExpTable from '../expTable';

export interface IExpModalProps {
  onSucc: any;
}

const ExpModal: any = React.forwardRef((props: IExpModalProps, ref) => {
  const { sendSubscribeMessage } = useMessageMuation();
  const [orderId, setOrderId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { sendExp } = useOrderMuation();

  const { showToast } = useToast();
  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);

  const {
    data: editData,
    error: editError,
    mutate: editMutate,
  }: any = useOrderById(orderId);
  const isEditLoading = !editError && !editData;

  React.useImperativeHandle(ref, () => ({
    show: orderId => {
      setOrderId(orderId);
      showModal();
    },
  }));

  let modal;
  // ==================== Form
  const [form] = useForm();

  const clearForm = () => {
    form.setFieldsValue({
      _id: null,
      exp: [{ expType: '', expNumber: '' }],
    });
  };

  const handleFinish = values => {
    sendExp(orderId, values, err => {
      if (!err) {
        editMutate();
        closeModal();
        showToast('发货成功');
        clearForm();
        props.onSucc();
      }
    });
  };

  const saveAndSend = async () => {
    const values = await form.validateFields();
    if (values.exp.length > 0) {
      handleFinish(values);
      setTimeout(() => {
        sendSubscribeMessage(orderId, () => {});
      }, 1000);
    }
  };

  const renderForm = () => {
    if (orderId && !_.isEmpty(editData) && !isEditLoading) {
      if (form) {
        // if (editData.exp && editData.exp.length == 0) {
        // editData.exp = [{ expType: '', expNumber: '', title: '' }];
        editData.exp = _.map(editData.psns, (psn, index) => {
          const exp = editData.exp[index]
            ? editData.exp[index]
            : { expType: '', expNumber: '' };
          return {
            expType: exp.expType,
            expNumber: exp.expNumber,
            title: `${psn.product_title} ${psn.spec_title} x ${psn.num}`,
          };
        });
        // }
        form.setFieldsValue(editData);
      }
      // console.log(editData);

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
          onFinish={values => {
            if (values.exp.length > 0) {
              handleFinish(values);
            }
          }}
          style={{ width: '800px' }}
          className="euiForm"
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              {`${editData.name} ${editData.phone}`}
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <FormList
              name="exp"
              label="快递"
              psns={editData.psns}
              fullWidth={true}
              messageVariables={{ displayName: '快递' }}
            >
              <ExpTypeNo />
            </FormList>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeModal}>取消</EuiButtonEmpty>

            <EuiButton type="submit" fill>
              保存
            </EuiButton>

            <EuiButton onClick={saveAndSend} fill>
              保存并发送通知
            </EuiButton>
          </EuiModalFooter>
        </Form>
      );
    } else {
      return (
        <>
          <EuiModalHeader>
            <EuiModalHeaderTitle>发货</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiLoadingSpinner size="xl" />
          </EuiModalBody>
        </>
      );
    }
  };

  if (isModalVisible) {
    modal = (
      <EuiOverlayMask>
        <EuiModal maxWidth={800} onClose={closeModal}>
          {renderForm()}
          <EuiHorizontalRule margin="s" />
          {!_.isEmpty(editData) && (
            <EuiModalBody>
              <ExpTable phone={editData.phone} />
            </EuiModalBody>
          )}
        </EuiModal>
      </EuiOverlayMask>
    );
  }

  return <>{modal}</>;
});

export default ExpModal;
