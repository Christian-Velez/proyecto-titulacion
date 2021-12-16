import { types } from 'types/types';

// Register screen

export const setAccountType = (typeAccount) => {
   return {
      type: types.setAccountType,
      payload: typeAccount,
   };
};

export const cleanRegisterState = () => {
   return {
      type: types.cleanRegisterState,
   };
};
