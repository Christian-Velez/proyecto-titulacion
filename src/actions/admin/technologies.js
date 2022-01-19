import axios from 'axios';
import { types } from 'types/types';
import { finishLoading, startLoading } from 'actions/ui';
import { errorAlert, successAlert } from 'helpers/SwalAlerts';


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
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const URL = `${API_URL}/api/technology`;
         const { data } = await axios.post(URL, techToDB, config);


         dispatch(addNewTech(data));
         navigate('/admin/technologies');
         successAlert({ message: 'Tecnología agregada'});

      } catch (err) {
         console.log(err);
         errorAlert({ message: 'Ocurrio un error al tratar de agregar la tecnología'});
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
   return async (dispatch, getState) => {
      try {
         dispatch(startLoading());


         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const { id } = techInfo;
         const URL = `${API_URL}/api/technology/${id}`;
         const { data } = await axios.put(URL, techInfo, config);

         dispatch(editTech(id, data));
         navigate('/admin/technologies');
         successAlert({ message: 'Tecnología editada' });
      } catch (err) {
         errorAlert({ message: 'Ocurrio un error al tratar de editar la tecnología' });
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