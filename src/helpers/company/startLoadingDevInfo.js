import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;



// Esta funcion no afecta el store de Redux
export const startLoadingDevInfo = async(id) => {

   const URL = `${API_URL}/api/developer/${id}`;
   const { data } = await axios.get(URL);
   const { devInfo } = data;

   return devInfo;
};