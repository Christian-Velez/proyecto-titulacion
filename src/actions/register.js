import axios from 'axios';
import { types } from 'types/types';
import { startLogging } from './auth';


const API_URL = process.env.REACT_APP_API_URL;


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


export const startRegisterNewAccount = (userInfo) => {
   return async(dispatch, getState) => {

      const { accountType } = getState().register;
      const dateOfBirth = new Date(userInfo.age);
      delete userInfo.age;
      const default_img = `https://avatars.dicebear.com/api/initials/${userInfo.name.replace(/\s/g, '%20')}.svg`;

      const newUserToDB = {
         kind: accountType,
         dateOfBirth,
         img: default_img,
         ...userInfo
      };

      try {
         const { data } = await axios.post(`${API_URL}/api/register`, newUserToDB);
         const user = {
            username: data.username,
            password: userInfo.password
         };

         dispatch(startLogging(user));
      }
      catch(err) {
         const message = err.response.data.message?.includes('E11000')
         ? 'Utiliza un nombre de usuario distinto'
         : 'Ocurrio un error inesperado al tratar de crear tu cuenta';

         throw new Error(message);
      }
   };
};
