import axios from 'axios';
import { getAxiosConfig } from 'utils/getAxiosConfig';

const API_URL = process.env.REACT_APP_API_URL;


export const searchCompanies = async (params) => {
   try {
      const URL = `${API_URL}/api/search/companies`;
      const config = getAxiosConfig();
      const { data } = await axios.post(URL, params, config);
      const { companies } = data;

      return companies;
   } catch(err) {
      console.log(err);
      return [];
   }
};