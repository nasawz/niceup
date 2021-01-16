import { htmlIdGenerator } from '@elastic/eui';
import useSWR, { mutate } from 'swr';
export const TOASTKEY = 'TOASTKEY';

export function useToast() {
  const { data: toasts }: any = useSWR(TOASTKEY, () => {
    return [];
  });
  const removeToast = removedToast => {
    mutate(
      TOASTKEY,
      toasts!.filter((toast: any) => toast.id !== removedToast.id),
      false,
    );
  };
  const showToast = (title, color = 'success', iconType: any = null) => {
    const newToasts = toasts!.concat({
      id: htmlIdGenerator('Id')(),
      title,
      color,
      iconType,
    });
    mutate(TOASTKEY, newToasts, false);
  };

  return {
    toasts,
    removeToast,
    showToast,
  };
}
