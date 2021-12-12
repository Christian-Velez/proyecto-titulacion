

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'



const PrivateRoutes = ({ children }) => {

   const { autenticado } = useSelector(state => state.auth)
   console.log(autenticado)

   return autenticado
      ? children
      : <Navigate to='/auth/login'/>
   
}

export default PrivateRoutes
