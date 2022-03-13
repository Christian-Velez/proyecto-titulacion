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

   case types.editTech: 
      return {
         ...state,
         technologies: state.technologies.map(tech => (
            tech.id === action.payload.id
               ? (action.payload.data) // Sobreescribe la tecnologia que coincida
               : tech
         ))
      };      
      
   case types.deleteTech:
      return {
         ...state,
         technologies: state.technologies.filter(tech => tech.id !== action.payload)
      };

   default:
      return state;
   }
};