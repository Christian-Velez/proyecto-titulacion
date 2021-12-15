

import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'





const PrivateRoutes = ({ children, requiredRoles }) => {
   const { 
      isAuthenticated, 
      role,
      redirect,
   } = useSelector(state => state.auth)
   const userHasRequiredRole = requiredRoles.includes(role);


   // Si no esta autenticado lo saca de una
   if(!isAuthenticated) {
      return <Navigate to='/login'/>
   }

   // Si la ruta requiere un rol
   if(requiredRoles && !userHasRequiredRole){
      return <Navigate to={redirect} />
   }

   // Si paso los dos filtros le regreso el children
   return children
}


PrivateRoutes.propTypes = {
   children: PropTypes.element.isRequired,
   requiredRoles: PropTypes.array,
}


export default PrivateRoutes
