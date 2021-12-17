import axios from 'axios';
import { types } from 'types/types';
import { imgUpload } from 'helpers/imgUpload';
import Swal from 'sweetalert2';

export const startLoadingTechnologies = () => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(
            'http://localhost:3006/api/technology'
         );
         dispatch(setTechnologies(data));
      } catch (err) {
         console.log(err);
      }
   };
};

export const setTechnologies = (technologies) => {
   return {
      type: types.setTechnologies,
      payload: technologies,
   };
};

export const startSubmittingTechnology = (
   name,
   description,
   img,
   type,
   categories,
   relatedTechs,
   navigate
) => {
   return async (dispatch, getState) => {
      try {
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
         const categoriesToDB = categories.map(
            (cat) => {
               const { label } = cat;
               return label;
            }
         );

         const relatedTechsToDB =
            relatedTechs.map((tech) => {
               const { value: id } = tech;
               return id;
            });

         const techToDB = {
            name,
            img: imgURL,
            description,
            type,
            categories: categoriesToDB,
            relatedTechs: relatedTechsToDB,
         };

         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.post(
            'http://localhost:3006/api/technology',
            techToDB,
            config
         );
         dispatch(addNewTech(data));

         navigate('/admin/technologies');
         Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: 'Tecnología añadida',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      } catch (err) {
         console.log(err);
         Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ocurrio un error al tratar de agregar la tecnología',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }
   };
};

export const addNewTech = (newTech) => {
   return {
      type: types.addNewTech,
      payload: newTech,
   };
};

export const startUpdatingTech = (
   id,
   name,
   description,
   img,
   type,
   categories,
   relatedTechs,
   navigate
) => {
   return async (dispatch, getState) => {
      try {
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
         const categoriesToDB = categories.map(
            (cat) => {
               const { label } = cat;
               return label;
            }
         );

         const relatedTechsToDB =
            relatedTechs.map((tech) => {
               const { value: id } = tech;
               return id;
            });

         const techToDB = {
            name,
            img: imgURL,
            description,
            type,
            categories: categoriesToDB,
            relatedTechs: relatedTechsToDB,
         };

         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await axios.put(
            `http://localhost:3006/api/technology/${id}`,
            techToDB,
            config
         );

         dispatch(editTech(id, data));
         
         navigate('/admin/technologies');
         Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: 'Tecnología editada',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });



      } catch (err) {
         console.log(err);
         Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ocurrio un error al tratar de agregar la tecnología',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }
   };
};


export const editTech = (id, data) => {
   return {
      type: types.editTech,
      payload: {
         id,
         data
      }
   };
};