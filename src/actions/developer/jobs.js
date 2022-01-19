
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
import { types } from 'types/types';


// GET
export const startLoadingJobs = () => {
   return async(dispatch) => {
      try {
         const URL = `${API_URL}/api/jobs`;
         const { data } = await axios.get(URL);
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


// UPDATE -> Aplicar
export const startApplyingProcess = (jobId, alreadyApply) => {
   return async(dispatch, getState) => {

      const route = alreadyApply ? 'cancelapply' : 'apply';

      try {

         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const URL = `${API_URL}/api/jobs/${route}/${jobId}`;
         const { data } = await axios.put(URL, {}, config);
         dispatch(updateJob(data.id, data));
      } catch(err) {
         throw new Error(err.message);
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


// Handle JobScreen view
export const setIsJobSelected = (isSelected) => {
   return {
      type: types.setIsJobSelected,
      payload: isSelected
   };
};