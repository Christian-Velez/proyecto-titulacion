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
   
   case types.discardDeveloper: 
      return {
         ...state,
         toHire: state.toHire.filter(item => item._id !== action.payload),
      };

   case types.hireDeveloper: {
      const relation = state.toHire.find(item => item._id === action.payload);
      const { candidate } = relation;

      return {
         ...state,
         toHire: state.toHire.filter(item => item._id !== action.payload),
         employees: [
            ...state.employees,
            candidate
         ]
      };
   }

   case types.fireDeveloper:
      return {
         ...state,
         employees: state.employees.filter(item => item._id !== action.payload)
      };
      


   default:
      return state;
   }
   
};