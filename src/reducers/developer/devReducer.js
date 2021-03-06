import { types } from 'types/types';




const initialDevInfo = {
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
   companies: [],
};



export const devReducer = (state = initialDevInfo, action) => {

   switch (action.type) {
      case types.setDevInfo:
         return {
            ...state,
            ...action.payload
         };
         
      case types.addNewTechToDevStack:
         return {
            ...state,
            technologies: [
               ...state.technologies,
               action.payload
            ]
         }

      case types.setDevCompanies:
         return {
            ...state,
            companies: [ ...action.payload ]
         }
   
      default:
         return state;
   }
};