import { types } from 'types/types';

const initialState = {
   technologies: [],
};

export const techReducer = (state = initialState, action) => {

   switch (action.type) {
      case types.setTechnologies:
         return {
            ...state,
            technologies: action.payload
         };

      case types.addNewTech:
         return {
            ...state,
            technologies: [
               ...state.technologies,
               action.payload
            ]
         };
   
      default:
         return state;
   }
};