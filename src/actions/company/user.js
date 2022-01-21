import { finishLoading, startLoading } from 'actions/ui';
import axios from 'axios';
import { imgUpload } from 'helpers/imgUpload';
import { errorAlert, successAlert } from 'helpers/SwalAlerts';
import { types } from 'types/types';
import { getAxiosConfig } from 'utils/getAxiosConfig';

const API_URL = process.env.REACT_APP_API_URL;

// GET
export const startSettingCompanyInfo = (
 
) => {
   return async (dispatch, getState) => {
      try {
         const { id } = getState().auth;
         const URL = `${API_URL}/api/company/${id}`;

         const { data } = await axios.get(URL);
         const { companyInfo } = data;

         dispatch(setCompanyInfo(companyInfo));

      } catch (err) {
         return errorAlert({ 
            message: 'Ocurrio un error al tratar de cargar tu información :('
         });  
      }
   };
};

export const setCompanyInfo = (data) => {
   return {
      type: types.setCompanyInfo,
      payload: data,
   };
};


// UPDATE
export const startUpdatingCompanyInfo = (allCompanyInfo, navigate ) => {
   return async (dispatch, getState) => {
      try {

         dispatch(startLoading());

         const { id } = getState().auth;


         // Si elige una pp nueva, la sube a cloudinary
         const { profilePhoto } = allCompanyInfo;
         const imgUrl = typeof profilePhoto === 'string'
            ? profilePhoto
            : await imgUpload(profilePhoto);
            
         const updatedCompanyToDB = {
            ...allCompanyInfo,
            img: imgUrl
         };
    
         // Header de autorizacion
         const { token } = getState().auth;
         const config = getAxiosConfig(token);

         

         const URL = `${API_URL}/api/company/${id}`;
         
         const { data } = await axios.put(URL, updatedCompanyToDB, config);
         dispatch(updateCompanyInfo(data.newUser));
         navigate('/co/profile');
         successAlert({ message: 'Perfil actualizado'});

      } catch (err) {
         console.log(err);
         errorAlert({ message: 'Ocurrio un error al tratar de actualizar tu perfil' });
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const updateCompanyInfo = (data) => {
   return {
      type: types.setCompanyInfo,
      payload: data
   };
};