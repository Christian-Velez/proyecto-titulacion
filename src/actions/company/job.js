import axios from 'axios';
import Swal from 'sweetalert2';
import { types } from 'types/types';

const API_URL = process.env.REACT_APP_API_URL;



const formatTechnologies = (technologies) => {
   // Formatear las tecnologias -> extrae techId y yearsOfExperience
   return technologies.map((techObj) => {
      const { technology, yearsOfExperience } =
         techObj;
      return {
         technology: technology.id,
         yearsOfExperience,
      };
   });
};


export const startPostingNewJob = (jobInfo, setIsPosting, navigate) => {
   return async(dispatch, getState) => {

      try {
         setIsPosting(true);
         const {
            title,
            description,
            salary,
            selectedTechs,
            selectedSofts,
            additional,
            category
         } = jobInfo;
         let techsRequired = formatTechnologies(selectedTechs);

         let softsRequired = selectedSofts.map(
            (soft) => soft.value
         );


         const jobToDB = {
            title,
            description,
            category,
            techsRequired,
            softsRequired,
            salary: parseInt(salary),
            additional
         };

         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };
         
         const { data } = await axios.post(`${API_URL}/api/jobs`, jobToDB, config);
         
         setIsPosting(false);
         navigate('/co/myoffers');
         dispatch(addNewJobOffer(data));


      } catch(err) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrio un error inesperado al tratar de postear tu oferta',
            confirmButtonColor: 'var(--chakra-colors-brand-500)'
         });
         setIsPosting(false);
      }      
   };

};


export const addNewJobOffer = (newJob) => {
   return {
      type: types.addNewJobOffer,
      payload: newJob
   };
};


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


         const { data } = await axios.put(`${API_URL}/api/jobs/${id}`, jobToDB, config);
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