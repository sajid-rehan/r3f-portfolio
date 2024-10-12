import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const commonToastConfig = {
  position: 'bottom-right',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
  progressStyle: { background: 'rgb(255, 255, 255)' },
};

/**
 * Show an info toast notification.
 *
 * @param {string} msg The message to be displayed in the toast.
 * @param {number} [autoClose=10000] The time in ms to auto close the toast.
 */
export const notifyInfo = (msg, autoClose = 10000) => {
  toast.info(msg, {
    ...commonToastConfig,
    autoClose,
  });
};

/**
 * Show a warning toast notification.
 *
 * @param {string} msg The message to be displayed in the toast.
 * @param {number} [autoClose=10000] The time in ms to auto close the toast.
 */
export const notifyWarning = (msg, autoClose = 10000) => {
  toast.warning(msg, {
    ...commonToastConfig,
    autoClose,
    progressStyle: { background: 'rgb(255, 165, 0)' },
  });
};
