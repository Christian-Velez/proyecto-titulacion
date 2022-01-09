import axios from 'axios';
import { imgUpload } from 'helpers/imgUpload';
import Swal from 'sweetalert2';
import { types } from 'types/types';

const API_URL = process.env.REACT_APP_API_URL;

export const startSettingCompanyInfo = (
 
) => {
   return async (dispatch, getState) => {
      try {
         const { id } = getState().auth;
         const { data } = await axios.get(
            `${API_URL}/api/company/${id}`
         );
         const { companyInfo } = data;

         dispatch(setCompanyInfo(companyInfo));



         
      } catch (err) {
         return Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ocurrio un error al tratar de cargar tu información :(',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }
   };
};

export const setCompanyInfo = (data) => {
   return {
      type: types.setCompanyInfo,
      payload: data,
   };
};

export const startUpdatingCompanyInfo = (
   allCompanyInfo,
   navigate,
   setIsUpdating
) => {
   return async (dispatch, getState) => {
      try {
         setIsUpdating(true);
         const { id } = getState().auth;


         // Si elige una pp nueva, la sube a cloudinary
         const { profilePhoto } = allCompanyInfo;
         let imgUrl = '';
         if (typeof profilePhoto === 'string') {
            imgUrl = profilePhoto;
         }
         else {
            imgUrl = await imgUpload(profilePhoto);
         }

         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };


         const updatedCompanyToDB = {
            ...allCompanyInfo,
            img: imgUrl
         };


         const { data } = await axios.put(`${API_URL}/api/company/${id}`, updatedCompanyToDB, config);
         dispatch(updateCompanyInfo(data.newUser));

         setIsUpdating(false);
         navigate('/co/profile');

         Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: 'Perfil actualizado',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });


      } catch (err) {
         console.log(err);
         Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ocurrio un error al tratar de actualizar tu perfil',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });

         setIsUpdating(false);
      }
   };
};


export const updateCompanyInfo = (data) => {
   return {
      type: types.setCompanyInfo,
      payload: data
   };
};