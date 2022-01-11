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

      case types.updateJobInfo:
         return {
            ...state,
            allJobs: state.allJobs.map(job => (
               job.id === action.payload.id
               ? (action.payload.data) // Sobreescribe el job que coincida
               : job
            ))
         };
         
   
      default:
         return state;
   }
};