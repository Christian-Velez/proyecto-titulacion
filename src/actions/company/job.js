import axios from 'axios';
import { types } from 'types/types';
import { finishLoading, startLoading } from 'actions/ui';
import { errorAlert } from 'helpers/SwalAlerts';
import { getAxiosConfig } from 'utils/getAxiosConfig';

const API_URL = process.env.REACT_APP_API_URL;



// POST
export const startPostingNewJob = (jobInfo, navigate) => {
   return async(dispatch) => {
      try {
         dispatch(startLoading());

         // Header de autorizacion
         const config = getAxiosConfig();

         const URL = `${API_URL}/api/jobs`;
         const { data } = await axios.post(URL, jobInfo, config);
         dispatch(addNewJobOffer(data));
         navigate('/co/myoffers');

      } catch(err) {
         console.log(err);
         errorAlert({ message: 'Ocurrio un error inesperado al tratar de postear tu oferta' });
      
      } finally {
         dispatch(finishLoading());
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
   return async (dispatch) => {
      try {

         const { id, ...rest } = newJobInfo;


         const jobToDB = {
            ...rest
         };


         // Header de autorizacion
         const config = getAxiosConfig();


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




// ACEPTAR 

export const startAcceptingApplicant = (jobId, devId) => {
   return async(dispatch) => {
      console.log(jobId, devId);

   };

};




// RECHAZAR
export const startDiscartingApplicant = (jobId, devId) => {
   return async(dispatch) => {

      try {
         dispatch(startLoading());


         // Header de autorizacion
         const config = getAxiosConfig();
         const URL = `${API_URL}/api/jobs/discarddev`;


         const infoToDb ={
            jobId,
            devId
         };

         await axios.put(URL, infoToDb, config);
         dispatch(discardApplicant(jobId, devId));

      } catch(err) {
         console.log(err);
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const discardApplicant = (jobId, devId) => {
   return {
      type: types.removeApplicantFromJob,
      payload: {
         jobId,
         devId
      }
   };
};