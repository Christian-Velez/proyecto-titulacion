import { finishLoading, startLoading } from 'actions/ui';
import axios from 'axios';
import { imgUpload } from 'helpers/imgUpload';
import { toastError, toastSuccess } from 'helpers/ToastAlert';
import { types } from 'types/types';
import { getAxiosConfig } from 'utils/getAxiosConfig';

const API_URL = process.env.REACT_APP_API_URL;


// GET
export const startLoadingSoftSkills = () => {
   return async (dispatch) => {
      try {
         const URL = `${API_URL}/api/softskill`;
         const { data } = await axios.get(URL);
         dispatch(setSoftSkills(data));

      } catch (err) {
         toastError('Ocurrio un error al cargar los datos')
      }
   };
};

export const setSoftSkills = (softskills) => {
   return {
      type: types.setSoftSkills,
      payload: softskills,
   };
};


// POST
export const startSubmittingSoftSkill = ({ name, img }, navigate) => {
   return async (dispatch) => {
      try {

         dispatch(startLoading());
         
         const imgURL = await imgUpload(img);
         if (!imgURL) {
            return toastError('Ocurrio un error con la subida de la imagen');
         }

         const softSkillToDB = {
            name,
            img: imgURL,
         };

         // Header de autorizacion
         const config = getAxiosConfig();

         const URL = `${API_URL}/api/softskill`;
         const { data } = await axios.post(URL, softSkillToDB, config);
         
         dispatch(addNewSoft(data));
         navigate('/admin/soft-skills');
         toastSuccess('Soft skill añadida');

      } catch (err) {
         console.log(err);
         toastError('Ocurrio un error al tratar de agregar la soft skill');
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const addNewSoft = (softskill) => {
   return {
      type: types.addNewSoft,
      payload: softskill,
   };
};


// UPDATE
export const startUpdatingSoft = ({ id, name, img }, navigate) => {
   return async (dispatch) => {
      try {
         dispatch(startLoading());


         const imgURL = (typeof img === 'string') ? img : await imgUpload(img);
   
         if (!imgURL) {
            return toastError('Ocurrio un error con la subida de la imagen');
         }

         const softToDB = {
            name,
            img: imgURL
         };

         // Header de autorizacion
         const config = getAxiosConfig();
         
         const URL = `${API_URL}/api/softskill/${id}`;
         const { data } = await axios.put(URL, softToDB, config);

         dispatch(editSoft(id, data));
         navigate('/admin/soft-skills');
         toastSuccess('Soft skill editada');

      } catch (err) {
         console.log(err);
         toastError('Ocurrio un error al tratar de editar la soft skill');
      } finally {
         dispatch(finishLoading());
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