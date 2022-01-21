

import { finishLoading, startLoading } from 'actions/ui';
import axios from 'axios';
import { errorAlert, successAlert } from 'helpers/SwalAlerts';
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
         return errorAlert({
            message: 'Ocurrio un error al tratar de cargar tu información :('
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
         successAlert({ message: 'Perfil actualizado '});
      }
      catch(err){
         console.log(err);
         errorAlert({ message: 'Ocurrio un error al tratar de actualizar tu perfil' });

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