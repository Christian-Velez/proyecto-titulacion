
import { toast } from 'react-toastify';


const toastProps = {
   position: 'bottom-right',
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
};

export const toastDefault = (text) => {
   toast(text, toastProps);
};

export const toastSuccess = (text) => {
   toast.success(text, toastProps);
};

export const toastInfo = (text, toastP) => {
   if(toastP) {
      toast.info(text, toastP);
   } else {
      toast.info(text, toastProps);
   }
};

export const toastWarning = (text) => {
   toast.warn(text, toastProps);
};

export const toastError = (text) => {
   toast.error(text, toastProps);
};