import { types } from 'types/types';


const initialCompanyInfo = {
   id: '',
   name: '',
   username: '',
   applications: [],
   description: '',
   certifications: [],
   education: [],
   kind: '',
   location: '',
   projects: [],
   qualifications: [],
   softskills: [],
   technologies: [],
   img: '',
   jobs: [],
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
               ...state.jobs,
               action.payload
            ]
         };

      default:
         return state;
   }
   
};