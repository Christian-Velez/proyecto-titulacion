

import axios from 'axios';
import { processDevInfo } from 'helpers/processDevInfo';
import Swal from 'sweetalert2';
import { types } from 'types/types';


const API_URL = process.env.REACT_APP_API_URL;

export const startSettingDevInfo = (setIsLoading) => {
   return async(dispatch, getState) => {

      try {
         const { id } = getState().auth;
         const { data } = await axios.get(`${API_URL}/api/developer/${id}`);
         const { devInfo } = data;
   
         dispatch(setDevInfo(devInfo));

         setIsLoading(false);

      }catch(err){
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

export const setDevInfo = (data) => {
   return {
      type: types.setDevInfo,
      payload: data
   };
};


/* eslint-disable */

export const startUpdatingDevInfo = (allDevInfo, navigate, setIsUpdating) => {
   return async (dispatch, getState) => {
      try {
         setIsUpdating(true);
         const { id } = getState().auth;


         const {
            profilePhoto,
            name,
            location,
            description,
            technologies,
            projects,
            education,
            certifications,
            selectedSofts,
         } = await processDevInfo(allDevInfo);

         // Datos a actualizar
         const updatedDevToDB = {
            location,
            technologies,
            softskills: selectedSofts,
            projects,
            education,
            certifications,
            name,
            description,
            img: profilePhoto
         };


         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.put(`${API_URL}/api/developer/${id}`, updatedDevToDB, config);
         dispatch(updateDevInfo(data.newUser));
         
         setIsUpdating(false);

         navigate('/dev/profile');


         Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: 'Perfil actualizado',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }
      catch(err){
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

export const updateDevInfo = (data) => {
   return {
      type: types.setDevInfo,
      payload: data
   };
};