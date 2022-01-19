
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

// Utilizado en la pantalla de inicio para obtener los ultimos trabajos
export const getLastJobs = async () => {
   const { data } = await axios.get(`${API_URL}/api/jobs/last`);
   return data;
};