import axios from "axios"




const fetchToken = async (token) => {

   const { data } = axios.post('http://localhost:3006/api/validatetoken')


}