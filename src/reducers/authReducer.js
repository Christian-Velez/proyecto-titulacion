import { types } from '../types/types';

const initialState = {
   id: null,
   role: null,
   isAuthenticated: false,
   token: null,
   redirect: null,
   isChecking: true,
};

export const authReducer = (
   state = initialState,
   action
) => {
   
   switch (action.type) {
      case types.login:
         return {
            ...state,
            ...action.payload,
            isAuthenticated: true
         };

      case types.setChecking:
         return {
            ...state,
            isChecking: action.payload
         };
         
      default:
         return state;
   }
};
