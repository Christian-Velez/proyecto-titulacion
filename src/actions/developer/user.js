import axios from 'axios';
import { finishLoading, startLoading } from 'actions/ui';
import { toastSuccess, toastError } from 'helpers/ToastAlert';
import { types } from 'types/types';
import { getAxiosConfig } from 'utils/getAxiosConfig';

const API_URL = process.env.REACT_APP_API_URL;

// GET
export const startSettingDevInfo = () => {
   return async(dispatch, getState) => {

      try {
         const { id } = getState().auth;

         const URL = `${API_URL}/api/developer/${id}`;
         const { data } = await axios.get(URL);
         const { devInfo } = data;
   
         dispatch(setDevInfo(devInfo));
      }catch(err){
         return toastError('Ocurrio un error al tratar de cargar tu información :(');
      }
   };
};

export const setDevInfo = (data) => {
   return {
      type: types.setDevInfo,
      payload: data
   };
};


// UPDATE
export const startUpdatingDevInfo = ( newDevInfo, navigate ) => {
   return async (dispatch, getState) => {
      try {
         dispatch(startLoading());


         const { id } = getState().auth;
         
         // Header de autorizacion
         const config = getAxiosConfig();

         const URL = `${API_URL}/api/developer/${id}`;
         const { data } = await axios.put(URL, newDevInfo, config);


         dispatch(updateDevInfo(data.newUser));
         navigate('/dev/profile');
         toastSuccess('Perfil actualizado');
      }
      catch(err){
         console.log(err);
         toastError('Ocurrio un error al tratar de actualizar tu perfil');

      } finally {
         dispatch(finishLoading());
      }
   };
};

export const updateDevInfo = (data) => {
   return {
      type: types.setDevInfo,
      payload: data
   };
};


export const startAddingNewTechToDevStack = (newTech, yearsOfExperience) => {
   return async(dispatch, getState) => {
      try {
         const { id } = getState().auth;

         const techToDb = {
            id,
            technology: newTech.id,
            yearsOfExperience: parseInt(yearsOfExperience)
         };
   
         // Header de autorizacion
         const config = getAxiosConfig();
         const URL = `${API_URL}/api/developer/addTech`;
         await axios.put(URL, techToDb, config);


         const auxTech = {
            _id: Date.now(),
            technology: newTech,
            yearsOfExperience: parseInt(yearsOfExperience)
         };
         dispatch(addNewTechToDevStack(auxTech));
         toastSuccess('Tecnología añadida a tu stack');


      } catch(err) {
         console.log(err.message);
      }
   };
};


export const addNewTechToDevStack = (newTech) => {
   return {
      type: types.addNewTechToDevStack,
      payload: newTech
   };
};