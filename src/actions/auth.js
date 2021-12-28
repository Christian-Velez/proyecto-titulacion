import axios from 'axios';
import Swal from 'sweetalert2';
import { types } from 'types/types';


const API_URL = process.env.REACT_APP_API_URL;


export const startLogging = (
   username,
   password,
   setIsLoading = ()=>{}
) => {
   return async (dispatch) => {
      try {
         setIsLoading(true);
         const { data } = await axios.post(
            `${API_URL}/api/login`,
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
               id: data.id,
               token: data.token,
               role: data.kind,
               redirect,
            })
         );
         setIsLoading(false);


         dispatch(
            setAuth(
               data.id,
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
         setIsLoading(false);

         
      }
   };
};

export const setAuth = (
   id,
   token,
   role,
   redirect
) => {

   return {
      type: types.login,
      payload: { id, token, role, redirect },
   };
};



// Para guardar la sesion en el usuario
export const startCheckingIsTokenValid = ({ id, token, role, redirect }) => {
   return async (dispatch) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.post(
            `${API_URL}/api/login/verify`,
            {},
            config
         );


         const { isValid } = data;

         if(isValid){
            dispatch(setAuth(id, token, role, redirect));
         }
      } catch (err) {
         console.log('Error al determinar si el token era valido');
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