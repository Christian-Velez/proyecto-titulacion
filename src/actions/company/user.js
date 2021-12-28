import axios from 'axios';
import Swal from 'sweetalert2';
import { types } from 'types/types';


const API_URL = process.env.REACT_APP_API_URL;


export const startSettingCompanyInfo = (setIsLoading) => {
   return async(dispatch, getState) => {

      try {
         const { id } = getState().auth;
         const { data } = await axios.get(`${API_URL}/api/company/${id}`);
         const { companyInfo } = data;   

         dispatch(setCompanyInfo(companyInfo));
         setIsLoading(false);

      }catch(err){
         return Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ocurrio un error al tratar de cargar tu información :(',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }
   };
};

export const setCompanyInfo = (data) => {
   return {
      type: types.setCompanyInfo,
      payload: data
   };
};