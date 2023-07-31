import { toast, ToastOptions } from 'react-toastify';

export function notify(content: string, options: ToastOptions) {
  toast(content, options);
}
