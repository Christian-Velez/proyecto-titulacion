import axios from 'axios';
import { types } from 'types/types';


const API_URL = process.env.REACT_APP_API_URL;


export const startLogging = (user) => {
   return async (dispatch) => {
      try {

         const URL = `${API_URL}/api/login`;
         const { data } = await axios.post(URL, user);

         let redirect;
         if (data.kind === 'Admin') {
            redirect = '/admin';
         }
         if (data.kind === 'Developer') {
            redirect = '/dev';
         }
         if (data.kind === 'Company') {
            redirect = '/co';
         }

         const userToSave = {
            id: data.id,
            token: data.token,
            role: data.kind,
            redirect,
         };

         localStorage.setItem('auth', JSON.stringify(userToSave));
         dispatch(setAuth(userToSave));
         
      } catch (err) {
         throw new Error(err.message);
      }
   };
};

export const setAuth = (userInfo) => {
   return {
      type: types.login,
      payload: userInfo,
   };
};



// Para guardar la sesion en el usuario -> recibe el auth guardado en localStorage
export const startCheckingIsTokenValid = (auth) => {
   return async (dispatch) => {
      try {

         const { token } = auth;


         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };


         // cambiarlo a un get
         const URL = `${API_URL}/api/login/verify`;
         const { data } = await axios.post(URL, {}, config);
         const { isValid } = data;


         if(isValid){
            dispatch(setAuth(auth));
         }
      } catch (err) {
         dispatch(generalLogout());
      } finally {
         dispatch(setIsChecking(false));
      }
   };
};

export const generalLogout = () => {
   localStorage.removeItem('auth');
   return {
      type: types.generalLogout
   };
};

export const setIsChecking = ( state ) => {
   return {
      type: types.setChecking,
      payload: state,
   };
};