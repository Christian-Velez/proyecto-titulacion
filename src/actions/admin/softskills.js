import axios from 'axios';
import { types } from 'types/types';



export const startLoadingSoftSkills = () => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(
            'http://localhost:3006/api/softskill'
         );
         dispatch(setSoftSkills(data));
      } catch (err) {
         console.log(err);
      }
   };
};


export const setSoftSkills = (softskills) => {
   return {
      type: types.setSoftSkills,
      payload: softskills,
   };
};