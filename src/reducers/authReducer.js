import { types } from "../types/types";


const initialState = {
   username: 'imbecil',
   password: 'idioto',
   autenticado: false,
}

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.login:
         return {
            ...state,
            autenticado: true,  // esto lo cambiare a lo que me regrese el api
         }

      case types.logout:
         return {
            ...state,
            autenticado: false,
         }
            
      default:
         return state
   }

}