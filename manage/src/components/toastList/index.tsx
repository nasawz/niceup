import { EuiGlobalToastList } from '@elastic/eui';
import * as React from 'react';
import { useToast } from '../../hook/useToast';

export interface IToastListProps {}

export default function ToastList(props: IToastListProps) {
  const { toasts, removeToast } = useToast();
  return (
    <EuiGlobalToastList
      toasts={toasts}
      dismissToast={removedToast => removeToast(removedToast)}
      toastLifeTimeMs={3000}
    />
  );
}
