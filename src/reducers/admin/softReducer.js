import { types } from 'types/types';

const initialState = {
   softskills: [],
};



export const softSkillReducer = (state = initialState, action) => {

   switch (action.type) {
      case types.setSoftSkills:
         return {
            ...state,
            softskills: action.payload
         };

      case types.addNewSoft:
         return {
            ...state,
            softskills: [
               ...state.softskills,
               action.payload
            ]
         };

      case types.editSoft: 
         return {
            ...state,
            softskills: state.softskills.map(soft => (
               soft.id === action.payload.id
               ? (action.payload.data) // Sobreescribe la soft-skill que coincida
               : soft
            ))
            };         
   
      default:
         return state;
   }
};