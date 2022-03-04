import axios from 'axios';
import { types } from 'types/types';
import { finishLoading, startLoading } from 'actions/ui';
import { getAxiosConfig } from 'utils/getAxiosConfig';
import { toastError } from 'helpers/ToastAlert';

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
         toastError('Ocurrio un error inesperado al tratar de postear tu oferta')
      
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
      try {
         dispatch(startLoading());

         // Header de autorizacion
         const config = getAxiosConfig();
         const URL = `${API_URL}/api/jobs/acceptdev`;
   
         const infoToDb ={
            jobId,
            devId
         };
         const { data } = await axios.put(URL, infoToDb, config);

         dispatch(removeApplicantFromJob(jobId, devId));
         dispatch(updateCompanyToHire(data.toHire));

      } catch(err) {
         console.log(err);
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const updateCompanyToHire = (toHire) => {
   return {
      type: types.setCompanyInfo,
      payload: {
         toHire
      }
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
         dispatch(removeApplicantFromJob(jobId, devId));

      } catch(err) {
         console.log(err);
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const removeApplicantFromJob = (jobId, devId) => {
   return {
      type: types.removeApplicantFromJob,
      payload: {
         jobId,
         devId
      }
   };
};