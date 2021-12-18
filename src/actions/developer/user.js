

import axios from 'axios';
import Swal from 'sweetalert2';
import { types } from 'types/types';


const API_URL = process.env.REACT_APP_API_URL;

export const startSettingDevInfo = (setIsLoading) => {
   return async(dispatch, getState) => {

      try {
         const { id } = getState().auth;
         const { data } = await axios.get(`${API_URL}/api/developer/${id}`);
         const { devInfo } = data;
   
         dispatch(setDevInfo(devInfo));

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


export const setDevInfo = (data) => {
   return {
      type: types.setDevInfo,
      payload: data
   };
};