import { types } from "../types/types";


const initialState = {
   role: null,   
   isAuthenticated: false,
   token: null,
   redirect: null,
}

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.login:
         const { token, role, redirect } = action.payload
         return {
            ...state,
            isAuthenticated: true,
            token,
            role,
            redirect,
         }

      case types.logout:
         return {
            ...state,
            ...initialState,
         }
            
      default:
         return state
   }

}