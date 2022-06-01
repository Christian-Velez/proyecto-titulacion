
import axios from 'axios';
import { getAxiosConfig } from 'utils/getAxiosConfig';
const API_URL = process.env.REACT_APP_API_URL;

// Utilizado en la pantalla de inicio para obtener los ultimos trabajos
export const getLastJobs = async () => {
   const { data } = await axios.get(`${API_URL}/api/jobs/last`);
   return data;
};


export const getRejectedJobs = async(devId) => {

   const config = getAxiosConfig();
   const { data } = await axios.get(`${API_URL}/api/developer/getRejectedJobs/${devId}`, config);
   const { rejectedJobs } = data;
   return rejectedJobs;
}
