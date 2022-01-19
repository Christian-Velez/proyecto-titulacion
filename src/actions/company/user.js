import axios from 'axios';
import { imgUpload } from 'helpers/imgUpload';
import { errorAlert } from 'helpers/SwalAlerts';
import { types } from 'types/types';

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
export const startUpdatingCompanyInfo = (allCompanyInfo) => {
   return async (dispatch, getState) => {
      try {

         const { id } = getState().auth;


         // Si elige una pp nueva, la sube a cloudinary
         const { profilePhoto } = allCompanyInfo;
         const imgUrl = typeof profilePhoto === 'string'
            ? profilePhoto
            : await imgUpload(profilePhoto);

    
         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };

         const updatedCompanyToDB = {
            ...allCompanyInfo,
            img: imgUrl
         };

         const URL = `${API_URL}/api/company/${id}`;
         const { data } = await axios.put(URL, updatedCompanyToDB, config);
         dispatch(updateCompanyInfo(data.newUser));
         
      } catch (err) {
         throw new Error(err.message);
      }
   };
};

export const updateCompanyInfo = (data) => {
   return {
      type: types.setCompanyInfo,
      payload: data
   };
};