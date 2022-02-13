import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;



// Estas funciones no afectan el store de Redux



export const startLoadingDevInfo = async(id) => {
   const URL = `${API_URL}/api/developer/${id}`;
   const { data } = await axios.get(URL);
   const { devInfo } = data;

   return devInfo;
};


export const startLoadingCoInfo = async(id) => {
   // Auxiliar
   // Cambiar a una nueva ruta para que las personas que buscan 
   // una empresa no reciban toda su informacion,
   // ejem: contratados y por contratar

   const URL = `${API_URL}/api/company/${id}`;
   const { data } = await axios.get(URL);
   const { companyInfo } = data;

   return companyInfo;
};