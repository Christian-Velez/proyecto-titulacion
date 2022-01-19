

import axios from 'axios';
import { errorAlert } from 'helpers/SwalAlerts';
import { types } from 'types/types';


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
export const startUpdatingDevInfo = ( newDevInfo ) => {
   return async (dispatch, getState) => {
      try {

         const { id } = getState().auth;
         
         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const URL = `${API_URL}/api/developer/${id}`;
         const { data } = await axios.put(URL, newDevInfo, config);
         dispatch(updateDevInfo(data.newUser));
      }
      catch(err){
         throw new Error(err.message);
      }
   };
};

export const updateDevInfo = (data) => {
   return {
      type: types.setDevInfo,
      payload: data
   };
};