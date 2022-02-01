import { types } from 'types/types';


const initialCompanyInfo = {
   id: '',
   img: '',
   location: '',
   description: '',
   qualifications: [],
   mostReqTechnology: {},
   jobs: [],
   toHire: [],
   employees: [],
};

export const companyReducer = (state = initialCompanyInfo, action) => {

   switch (action.type) {
      case types.setCompanyInfo:
         return {
            ...state,
            ...action.payload
         };


      case types.addNewJobOffer:
         return {
            ...state,
            jobs: [
               action.payload,
               ...state.jobs
            ]
         };

      case types.updateJob:
         return {
            ...state,
               jobs: state.jobs.map(job => (
                  job.id === action.payload.id
                  ? (action.payload.data) // Sobreescribe el job que coincida
                  : job
               ))
         };
         
         
      case types.removeApplicantFromJob:
         return {
            ...state,
            jobs: state.jobs.map(job => (
               job.id === action.payload.jobId
               ? ({
                  ...job,
                  applicants: job.applicants.filter(applicant => applicant.id !== action.payload.devId)
               })

               
               : job
            ))
         };

         


      default:
         return state;
   }
   
};