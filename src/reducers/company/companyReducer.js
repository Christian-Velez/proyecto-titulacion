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
   img: ''
};

export const companyReducer = (state = initialCompanyInfo, action) => {

   switch (action.type) {
      case types.setCompanyInfo:
         return {
            ...state,
            ...action.payload
         };

      default:
         return state;
   }
   
};