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

      default:
         return state;
   }
   
};