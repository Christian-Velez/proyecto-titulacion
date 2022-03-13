import axios from 'axios';
import { getAxiosConfig } from 'utils/getAxiosConfig';

const API_URL = process.env.REACT_APP_API_URL;


export const searchDevelopers = async (params) => {
   try {
      const URL = `${API_URL}/api/search/developers`;
      const config = getAxiosConfig();
      const { data } = await axios.post(URL, params, config);
      const { developers } = data;

      return developers;
   } catch(err) {
      console.log(err);
      return [];
   }
};