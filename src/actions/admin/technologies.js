import axios from 'axios';
import { types } from 'types/types';
import { finishLoading, startLoading } from 'actions/ui';
import { getAxiosConfig } from 'utils/getAxiosConfig';
import { toastError, toastSuccess } from 'helpers/ToastAlert';


const API_URL = process.env.REACT_APP_API_URL;

export const startLoadingTechnologies = () => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(`${API_URL}/api/technology`);
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

export const startSubmittingTechnology = (techToDB, navigate) => {
   return async (dispatch, getState) => {
      try {
         dispatch(startLoading());

         // Header de autorizacion
         const { token } = getState().auth;
         const config = getAxiosConfig(token);

         const URL = `${API_URL}/api/technology`;
         const { data } = await axios.post(URL, techToDB, config);


         dispatch(addNewTech(data));
         navigate('/admin/technologies');
         toastSuccess('Tecnología agregada');

      } catch (err) {
         console.log(err);
         toastError('Ocurrio un error al tratar de agregar la tecnología')
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const addNewTech = (newTech) => {
   return {
      type: types.addNewTech,
      payload: newTech,
   };
};

export const startUpdatingTech = ( techInfo, navigate) => {
   return async (dispatch) => {
      try {
         dispatch(startLoading());


         // Header de autorizacion
         const config = getAxiosConfig();

         const { id } = techInfo;
         const URL = `${API_URL}/api/technology/${id}`;
         const { data } = await axios.put(URL, techInfo, config);

         dispatch(editTech(id, data));
         navigate('/admin/technologies');
         toastSuccess('Tecnología editada');
      } catch (err) {
         toastError('Ocurrio un error al tratar de editar la tecnología');
      } finally {
         dispatch(finishLoading());
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


export const startDeletingTechnology = (id, navigate) => {
   return async (dispatch) => {
      try {
         dispatch(startLoading());

         // Header de autorizacion
         const config = getAxiosConfig();
     
         const URL = `${API_URL}/api/technology/${id}`;
         await axios.delete(URL, config);

         navigate('/admin/technologies');
         dispatch(deleteTech(id)); 
         toastSuccess('Tecnología eliminada');

      } catch (err) {
         console.log(err);
         toastError('Ocurrio un error al tratar de eliminar la tecnología');
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const deleteTech = (id) => {
   return {
      type: types.deleteTech,
      payload: id
   };
};