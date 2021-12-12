import { types } from "../types/types";


const initialState = {
   username: 'imbecil',
   password: 'idioto',
   autenticado: false,
}

export const authReducer = (state = initialState, action) => {
   switch(action.type) {

   }

   switch (action.type) {
      case types.login:
         
         break;
   
      default:
         return state
   }

}