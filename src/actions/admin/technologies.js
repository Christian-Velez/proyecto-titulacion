


import axios from 'axios';
import { types } from 'types/types';

export const startLoadingTechnologies = () => {
   return async (dispatch) => {

      try {
         const { data } = await axios.get('http://localhost:3006/api/technology');
         dispatch(setTechnologies(data));
      }
      catch(err){
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
