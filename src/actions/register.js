import axios from 'axios';
import Swal from 'sweetalert2';
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
      //const today = new Date();
      //const age = today.getFullYear() - dateOfBirth.getFullYear();


      delete userInfo.age;



      const newUserToDB = {
         kind: accountType,
         dateOfBirth,
         //age,
         img: `https://avatars.dicebear.com/api/initials/${userInfo.name.replace(/\s/g, '%20')}.svg`,
         ...userInfo
      };

      try {
         const { data } = await axios.post(`${API_URL}/api/register`, newUserToDB);
         dispatch(startLogging(data.username, userInfo.password));
      }
      catch(err){

         if(err.response.data.message.includes('E11000')){
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Utiliza un nombre de usuario distinto',
               confirmButtonColor: 'var(--chakra-colors-brand-500)'
            });
         }

         else {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Ocurrio un error inesperado al tratar de crear tu cuenta',
               confirmButtonColor: 'var(--chakra-colors-brand-500)'
            });
         }
      }
   };
};
