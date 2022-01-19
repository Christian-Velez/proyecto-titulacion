import axios from 'axios';
import { types } from 'types/types';

const API_URL = process.env.REACT_APP_API_URL;



// POST
export const startPostingNewJob = (jobInfo) => {
   return async(dispatch, getState) => {
      try {
         
         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const URL = `${API_URL}/api/jobs`;
         const { data } = await axios.post(URL, jobInfo, config);
         dispatch(addNewJobOffer(data));

      } catch(err) {
         throw new Error(err.message);
      }      
   };

};

export const addNewJobOffer = (newJob) => {
   return {
      type: types.addNewJobOffer,
      payload: newJob
   };
};


// UPDATE -> archivar
export const startUpdatingJob = (newJobInfo) => {
   return async (dispatch, getState) => {
      try {

         const { id, ...rest } = newJobInfo;


         const jobToDB = {
            ...rest
         };


         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const URL = `${API_URL}/api/jobs/${id}`;
         const { data } = await axios.put(URL, jobToDB, config);
         const { updatedJob } = data;

         dispatch(updateJob(updatedJob.id, updatedJob));
      }
      catch(err) {
         console.log(err);
      }
   };
};

export const updateJob = (id, data) => {
   return {
      type: types.updateJob,
      payload: {
         id,
         data
      }
   };
};