import { ROLE } from "../types/roles";
import { types } from "../types/types";


const initialState = {
   username: 'imbecil',
   password: 'idioto',
   role: ROLE.Admin,   
   isAuthenticated: false,
}

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.login:
         return {
            ...state,
            isAuthenticated: true,  // esto lo cambiare a lo que me regrese el api
         }

      case types.logout:
         return {
            ...state,
            isAuthenticated: false,
         }
            
      default:
         return state
   }

}