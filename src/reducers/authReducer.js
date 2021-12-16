import { types } from '../types/types';

const initialState = {
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
   const { token, role, redirect } = action.payload || {};
   
   switch (action.type) {
      case types.login:
         return {
            ...state,
            isAuthenticated: true,
            token,
            role,
            redirect,
         };

      case types.logout:
         return {
            ...state,
            ...initialState,
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
