

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PublicRoutes = ({ children }) => {
   const { autenticado } = useSelector(state => state.auth);

   console.log('Public routes');


   return autenticado
   ? <Navigate to='/' />
   : children
}

export default PublicRoutes
