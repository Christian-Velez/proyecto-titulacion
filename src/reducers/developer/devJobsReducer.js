import { types } from 'types/types';



export const initialJobs = {
   recommended: [],
   allJobs: []
};

export const devJobsReducer = (state = initialJobs, action) => {

   switch (action.type) {


      case types.setAllJobs:
         return {
            ...state,
            allJobs: action.payload
         };
         
   
      default:
         return state;
   }
};