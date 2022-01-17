import axios from 'axios';
import { types } from 'types/types';
import { formatTechnologyToDB } from 'helpers/admin/formatTechnologyToDB';


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

export const startSubmittingTechnology = ({ techInfo }) => {
   return async (dispatch, getState) => {
      try {
         
         const techToDB = await formatTechnologyToDB(techInfo);

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


      } catch (err) {
         throw new Error(err.message);
      }
   };
};

export const addNewTech = (newTech) => {
   return {
      type: types.addNewTech,
      payload: newTech,
   };
};

export const startUpdatingTech = ({ techInfo }) => {
   return async (dispatch, getState) => {
      try {
         const techToDB = await formatTechnologyToDB(techInfo);
         const { id } = techToDB;

         // Header de autorizacion
         const { token } = getState().auth;
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         };


         const URL = `${API_URL}/api/technology/${id}`;
         const { data } = await axios.put(URL, techToDB, config);
         dispatch(editTech(id, data));
      } catch (err) {
         throw new Error(err.message);
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