import { types } from "../types/types";


const initialState = {
   accountType: null,
}

export const registerReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.setAccountType:
         return {
            ...state,
            accountType: action.payload,
         }

      case types.cleanRegisterState: 
            return {
               initialState
            }
   
      default:
         return {
            ...state,
         }
   }



}