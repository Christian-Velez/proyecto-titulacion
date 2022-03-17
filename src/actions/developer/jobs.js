
import { types } from 'types/types';
import { getAxiosConfig } from 'utils/getAxiosConfig';
import { finishLoading, startLoading } from 'actions/ui';
import axios from 'axios';
import { toastError } from 'helpers/ToastAlert';
const API_URL = process.env.REACT_APP_API_URL;


// GET
export const startLoadingJobs = () => {
   return async(dispatch, getState) => {
      try {

         const { id } = getState().devInfo;
         
         const URL = `${API_URL}/api/jobs/${id}`;


         const { data } = await axios.get(URL);
         const { jobs, recommendedJobs } = data;
         dispatch(setAllJobs(jobs));
         dispatch(setRecommendedJobs(recommendedJobs));
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

export const setRecommendedJobs = (jobs) => {
   return {
      type: types.setRecommendedJobs,
      payload: jobs
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
         toastError('Ocurrió un error al tratar de realizar la operación');

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