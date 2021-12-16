import axios from 'axios';
import Swal from 'sweetalert2';
import { types } from 'types/types';


export const startLogging = (
   username,
   password
) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.post(
            'http://localhost:3006/api/login',
            {
               username,
               password,
            }
         );

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

         localStorage.setItem(
            'auth',
            JSON.stringify({
               token: data.token,
               role: data.kind,
               redirect,
            })
         );

         dispatch(
            setAuth(
               data.token,
               data.kind,
               redirect
            )
         );
      } catch (err) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Nombre de usuario o contraseña incorrectos',
            confirmButtonColor: 'var(--chakra-colors-brand-500)'
         });
      }
   };
};

export const setAuth = (
   token,
   role,
   redirect
) => {
   return {
      type: types.login,
      payload: { token, role, redirect },
   };
};

export const startCheckingIsTokenValid = ({ token, role, redirect }) => {
   return async (dispatch) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.post(
            'http://localhost:3006/api/login/verify',
            {},
            config
         );
         const { isValid } = data;

         if(isValid){
            dispatch(setAuth(token, role, redirect));
         }
      } catch (err) {
         dispatch(logout());
      } finally {
         dispatch(setIsChecking(false));
      }
   };
};

export const logout = () => {
   localStorage.removeItem('auth');
   return {
      type: types.logout
   };
};


export const setIsChecking = ( state ) => {
   return {
      type: types.setChecking,
      payload: state,
   };
};