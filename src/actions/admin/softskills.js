import axios from 'axios';
import { imgUpload } from 'helpers/imgUpload';
import { errorAlert } from 'helpers/SwalAlerts';
import Swal from 'sweetalert2';
import { types } from 'types/types';

const API_URL = process.env.REACT_APP_API_URL;


export const startLoadingSoftSkills = () => {
   return async (dispatch) => {
      try {
         const URL = `${API_URL}/api/softskill`;
         const { data } = await axios.get(URL);
         dispatch(setSoftSkills(data));
         
      } catch (err) {
         Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ocurrio un error al cargar los datos',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }
   };
};

export const setSoftSkills = (softskills) => {
   return {
      type: types.setSoftSkills,
      payload: softskills,
   };
};

export const startSubmittingSoftSkill = ({ name, img }) => {
   return async (dispatch, getState) => {
      try {
         const imgURL = await imgUpload(img);
         if (!imgURL) {
            return errorAlert({ message: 'Ocurrio un error con la subida de la imagen'});
         }

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

         const URL = `${API_URL}/api/softskill`;
         const { data } = await axios.post(URL, softSkillToDB, config);
         dispatch(addNewSoft(data));
      } catch (err) {
         throw new Error(err.message);
      }
   };
};

export const addNewSoft = (softskill) => {
   return {
      type: types.addNewSoft,
      payload: softskill,
   };
};

export const startUpdatingSoft = ({ id, name, img }) => {
   return async (dispatch, getState) => {
      try {

         let imgURL;
         if (typeof img === 'string') {
            imgURL = img;
         } else {
            // Se sube la nueva imagen a cloudinary
            imgURL = await imgUpload(img);
            if (!imgURL) {
               return errorAlert({ message: 'Ocurrio un error con la subida de la imagen'});
            }
         }

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

         const URL = `${API_URL}/api/softskill/${id}`;
         const { data } = await axios.put(URL, softToDB, config);

         dispatch(editSoft(id, data));
      } catch (err) {
         throw new Error(err.message);
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