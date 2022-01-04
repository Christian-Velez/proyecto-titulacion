import axios from 'axios';
import { imgUpload } from 'helpers/imgUpload';
import Swal from 'sweetalert2';
import { types } from 'types/types';

const API_URL = process.env.REACT_APP_API_URL;


export const startLoadingSoftSkills = () => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(
            `${API_URL}/api/softskill`
         );
         dispatch(setSoftSkills(data));
      } catch (err) {
         console.log(err);
      }
   };
};

export const setSoftSkills = (softskills) => {
   return {
      type: types.setSoftSkills,
      payload: softskills,
   };
};

export const startSubmittingSoftSkill = (
   name,
   img,
   navigate,
   setIsLoading
) => {
   return async (dispatch, getState) => {
      try {
         setIsLoading(true);
         const imgURL = await imgUpload(img);
         if (!imgURL) {
            return Swal.fire({
               icon: 'error',
               title: 'Error...',
               text: 'Ocurrio un error con la subida de la imagen',
               confirmButtonColor:
                  'var(--chakra-colors-brand-500)',
            });
         }

         // Si la imagen esta correcta...

         const softSkillToDB = {
            name,
            img: imgURL,
         };

         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.post(
            `${API_URL}/api/softskill`,
            softSkillToDB,
            config
         );

         setIsLoading(false);
         dispatch(addNewSoft(data));

         navigate('/admin/soft-skills');
         Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: 'Soft skill añadida',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      } catch (err) {
         console.log(err);
         Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ocurrio un error al tratar de agregar la soft skill',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });

         setIsLoading(false);

      }
   };
};

export const addNewSoft = (softskill) => {
   return {
      type: types.addNewSoft,
      payload: softskill,
   };
};

export const startUpdatingSoft = (
   id,
   name,
   img,
   navigate,
   setIsLoading
) => {
   return async (dispatch, getState) => {
      try {
         setIsLoading(true);

         let imgURL;
         if (typeof img === 'string') {
            imgURL = img;
         } else {
            // Se sube la nueva imagen a cloudinary
            imgURL = await imgUpload(img);

            if (!imgURL) {
               return Swal.fire({
                  icon: 'error',
                  title: 'Error...',
                  text: 'Ocurrio un error con la subida de la imagen',
                  confirmButtonColor:
                     'var(--chakra-colors-brand-500)',
               });
            }
         }

         // Si la imagen esta correcta...
         const softToDB = {
            name,
            img: imgURL
         };

         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.put(
            `${API_URL}/api/softskill/${id}`,
            softToDB,
            config
         );

         setIsLoading(false);
         dispatch(editSoft(id, data));

         navigate('/admin/soft-skills');
         Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: 'Soft skill editada',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });



      } catch (err) {
         console.log(err);
         Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ocurrio un error al tratar de editar la soft skill',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });

         setIsLoading(false);
      }
   };
};


export const editSoft = (id, data) => {
   return {
      type: types.editSoft,
      payload: {
         id,
         data
      }
   };
};