

import axios from 'axios';
import Swal from 'sweetalert2';
const API_URL = process.env.REACT_APP_API_URL;
import { types } from 'types/types';

export const startLoadingJobs = () => {
   return async(dispatch) => {
      try {
         const { data } = await axios.get(`${API_URL}/api/jobs`);
         dispatch(setAllJobs(data));
      }
      catch(err) {
         console.log(err);
      }
   };
};

export const setAllJobs = (allJobs) => {
   return {
      type: types.setAllJobs,
      payload: allJobs
   };
};


export const startApplyingProcess = (jobId, alreadyApply, setIsLoading) => {
   return async(dispatch, getState) => {
      try {

         setIsLoading(true);
         const route = alreadyApply ? 'cancelapply' : 'apply';

         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.put(`${API_URL}/api/jobs/${route}/${jobId}`, {}, config);
         
         dispatch(updateJob(data.id, data));

         setIsLoading(false);

      } catch(err) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error al tratar de realizar la operación',
            confirmButtonColor: 'var(--chakra-colors-brand-500)'
         });
         setIsLoading(false);
      }
   };
};

export const updateJob = (id, newJobInfo) => {
   return {
      type: types.updateJobInfo,
      payload: {
         id,
         data: newJobInfo
      }
   };
};


export const setIsJobSelected = (isSelected) => {
   return {
      type: types.setIsJobSelected,
      payload: isSelected
   };
};