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
};



export const devReducer = (state = initialDevInfo, action) => {

   switch (action.type) {
      case types.setDevInfo:
         return {
            ...state,
            ...action.payload
         };
         
   
      default:
         return state;
   }
};