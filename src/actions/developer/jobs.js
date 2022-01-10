

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
import { types } from 'types/types';

export const startLoadingJobs = () => {
   return async(dispatch) => {
      try {
         const { data } = await axios.get(`${API_URL}/api/jobs`);
         dispatch(setAllJobs(data));
      }
      catch(err) {
         console.log(err);
      }
   };
};

export const setAllJobs = (allJobs) => {
   return {
      type: types.setAllJobs,
      payload: allJobs
   };
};