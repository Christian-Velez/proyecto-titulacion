import { finishLoading, startLoading } from 'actions/ui';
import axios from 'axios';
import { fileUpload } from 'helpers/fileUpload';
import { errorAlert } from 'helpers/SwalAlerts';
import { toastError, toastSuccess } from 'helpers/ToastAlert';
import { types } from 'types/types';
import { getAxiosConfig } from 'utils/getAxiosConfig';

const API_URL = process.env.REACT_APP_API_URL;

// GET
export const startSettingCompanyInfo = (
 
) => {
   return async (dispatch, getState) => {
      try {
         dispatch(startLoading());
         const { id } = getState().auth;
         const URL = `${API_URL}/api/company/${id}`;

         const { data } = await axios.get(URL);
         const { companyInfo } = data;
         console.log(companyInfo)
         dispatch(setCompanyInfo(companyInfo));

      } catch (err) {
         return errorAlert({ 
            message: 'Ocurrió un error al tratar de cargar tu información :('
         });  
      } finally {
         dispatch(finishLoading());
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
            : await fileUpload(profilePhoto);
            
         const updatedCompanyToDB = {
            ...allCompanyInfo,
            img: imgUrl
         };
    
         // Header de autorizacion
         const config = getAxiosConfig();

         

         const URL = `${API_URL}/api/company/${id}`;
         
         await axios.put(URL, updatedCompanyToDB, config);
         dispatch(startSettingCompanyInfo());
         navigate('/co/profile');

         toastSuccess('Perfil actualizado');

      } catch (err) {
         console.log(err);
         toastError('Ocurrió un error al tratar de actualizar tu perfil');
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


// Descartar a programador de "por contratar"
export const startDiscartingApplicant = (relationId, devId, jobId) => {
   return async(dispatch) => {
      try {
         dispatch(startLoading());

         const body = {
            relationId,
            devId,
            jobId
         };
         
         const config = getAxiosConfig();
         const URL = `${API_URL}/api/company/discardDeveloper`;
         await axios.post(URL, body, config);
         dispatch(discardDev(relationId));
         toastSuccess('Programador descartado');
      } catch(err) {
         toastError('Ocurrió un error al tratar de realizar la operación');
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const discardDev = (relationId) => {
   return {
      type:types.discardDeveloper,
      payload: relationId
   };
};


// Contratar a un programador
export const startHiringDeveloper = (relationId, devId, jobTitle, jobId) => {
   return async(dispatch) => {
      try {
         dispatch(startLoading());
   
         const body = {
            relationId,
            devId,
            jobTitle,
            jobId
         };

         const config = getAxiosConfig();
         const URL = `${API_URL}/api/company/hireDeveloper`;
   
         await axios.post(URL, body, config);

         dispatch(startSettingCompanyInfo());
         toastSuccess('Programador contratado');
      } catch(err) {
         toastError('Ocurrió un error al tratar de realizar la operación');
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const hireDev = (relationId) => {
   return {
      type: types.hireDeveloper,
      payload: relationId
   };
};

// Despedir a un programador
export const startFiringDeveloper = (relationId, devId, jobId) => {
   return async(dispatch) => {
      try {
         dispatch(startLoading());

         const body = {
            relationId,
            devId,
            jobId
         };
         
         const config = getAxiosConfig();
         const URL = `${API_URL}/api/company/fireDeveloper`;
         await axios.post(URL, body, config);
         dispatch(fireDev(relationId));
         toastSuccess('Programador despedido');
      } catch(err) {
         toastError('Ocurrió un error al tratar de realizar la operación');
      } finally {
         dispatch(finishLoading());
      }
   };
};

export const fireDev = (relationId) => {
   return {
      type: types.fireDeveloper,
      payload: relationId
   };
};



export const startRatingDev = (ratings, devId) => {
   return async(dispatch, getState) => {
      try {
         dispatch(startLoading());

         const { id } = getState().companyInfo;
         const body = {
            user: devId,
            ratings,
            ratedBy: id
         };

         const config = getAxiosConfig();
         const URL = `${API_URL}/api/rate`;
         await axios.post(URL, body, config);

      } catch(err) {
         toastError('Ocurrió un error al tratar de realizar la operación');

      } finally {
         dispatch(finishLoading());
      }
   };
};


export const startSavingDefaultMessages = (params) => {
   return async(dispatch, getState) => {
      try {
         dispatch(startLoading());
         const body = {
            defaultMessages: { ...params }
         }

         const { id } = getState().auth;
         const config = getAxiosConfig();
         const URL = `${API_URL}/api/company/defaultMessages/${id}`;

         await axios.post(URL, body, config);
         toastSuccess('Configuración guardada ⚙️');
         dispatch(startSettingCompanyInfo());


      } catch(err) {
         toastError('Ocurrió un error al tratar de realizar la operación');

      } finally {
         dispatch(finishLoading());
      }
   }
}