
import { finishLoading, startLoading } from 'actions/ui';
import axios from 'axios';
import { errorAlert } from 'helpers/SwalAlerts';
const API_URL = process.env.REACT_APP_API_URL;
import { types } from 'types/types';
import { getAxiosConfig } from 'utils/getAxiosConfig';


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
   return async(dispatch) => {

      const route = alreadyApply ? 'cancelapply' : 'apply';

      try {
         dispatch(startLoading());

         // Header de autorizacion
         const config = getAxiosConfig();
         

         const URL = `${API_URL}/api/jobs/${route}/${jobId}`;
         const { data } = await axios.put(URL, {}, config);
         dispatch(updateJob(data.id, data));

      } catch(err) {
         console.log(err);
         errorAlert({ message: 'Ocurrió un error al tratar de realizar la operación' });
      } finally {
         dispatch(finishLoading());
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